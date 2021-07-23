import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as lambda from '@aws-cdk/aws-lambda'
import * as path from 'path'
import * as api from '@aws-cdk/aws-apigatewayv2'
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations'
import { Bucket } from '@aws-cdk/aws-s3'
import * as rds from '@aws-cdk/aws-rds'
import { Peer, Port, SecurityGroup, CfnNatGateway, CfnEIP } from '@aws-cdk/aws-ec2'

const maxAzs = 2

export class DeploymentStack extends cdk.Stack {
  constructor(app: cdk.App, name: string, stage: 'production' | 'staging') {
    super(app, `${name}_deployment-service-${stage}`)

    const vpc = new ec2.Vpc(this, 'VPC', {
      cidr: '10.0.0.0/16',
		  maxAzs,
    })

    // TODO add vpc ingress stuffs and subnets
    const ingressSecurityGroup = new SecurityGroup(this, 'ingress-security-group', {
      vpc,
      allowAllOutbound: false,
      securityGroupName: `${name}-IngressSecurityGroup`,
    })
    ingressSecurityGroup.addIngressRule(Peer.ipv4('0.0.0.0/0'), Port.tcp(80))
    ingressSecurityGroup.addIngressRule(Peer.ipv4('0.0.0.0/0'), Port.tcp(443))

    const allocationIds: { [s: string]: string } = Array.from(Array(maxAzs)).reduce((eips, int) => {
      const eip = new CfnEIP(this, `VPCPublicSubnet${int+1}NATGatewayEIP${int}`, {
        domain: 'vpc',
        tags: [
          {
            key: 'Name',
            value: `MyApp/VPC/PublicSubnet${int+1}`,
          },
        ]
      })	    
      // Do whatever you need with your EIPs here, ie. store their ref for later use
    
      // Add a dependency on the VPC to encure allocation happens before the VPC is created
      vpc.node.addDependency(eip)

      return {
        ...eips,
        [eip.ref]: eip.attrAllocationId,
      }
    }, {})

    vpc.publicSubnets.forEach((subnet, index) => {
      // Find the NAT Gateway
      const natGateway = subnet.node.children.find(child => child.node.id == 'NATGateway') as CfnNatGateway
      // Delete the default EIP created by CDK
      subnet.node.tryRemoveChild('EIP')
      // Override the allocationId on the NATGateway
      natGateway.allocationId = Object.values(allocationIds)[index]
    })

    Object.keys(allocationIds).forEach((ref, index) => {
      new cdk.CfnOutput(this, `vpc-eip-${index}`, { value: ref })
    })

    new rds.DatabaseInstance(this, `${name}-dev`, {
      vpc,
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_25,
      }),
      vpcSubnets: {
				subnetType: ec2.SubnetType.PRIVATE,
			},
    })

    const deployReleaseS3Bucket = new Bucket(this, `${name}-deploy-release`)

    const httpApi = new api.HttpApi(this, `${name}-http-api`)

    new api.HttpStage(this, 'Stage', {
      httpApi,
      stageName: 'dev',
    });

    const lith = new lambda.DockerImageFunction(this, `${name}-lith`, {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../')),
      vpc,
    })
    const lithProxy = new LambdaProxyIntegration({
      handler: lith,
    })

    // TODO resolve the values in string
    const authorizer = api.HttpAuthorizer.fromHttpAuthorizerAttributes(this, '', {
      authorizerId: 'arn:aws:cognito-idp:${self:provider.region}:${self:custom.env.AWS_ACCOUNT_ID}:userpool/${self:custom.env.CONNECT_USER_POOL}',
      authorizerType: 'cognito',
    })

    httpApi.addRoutes({
      path: '/*',
      methods: [api.HttpMethod.ANY],
      integration: lithProxy,
      authorizer,
    })

    // api authorization for api-service interaction
    httpApi.addRoutes({
      path: '/api/*',
      methods: [api.HttpMethod.ANY],
      integration: lithProxy,
    })

    // TODO add aurora to vpc?

    // TODO grant access to created resources
    deployReleaseS3Bucket.grantReadWrite(lith)
  }
}
