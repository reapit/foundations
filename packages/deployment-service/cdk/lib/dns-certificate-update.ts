import {
  aws_ec2,
  aws_events,
  aws_events_targets,
  aws_iam,
  aws_lambda,
  Duration,
  PhysicalName,
  Stack,
} from 'aws-cdk-lib'
import { Construct } from 'constructs'

interface DnsCertificateUpdateOptionsInterface {
  usercodeStack: Stack
  vpc: aws_ec2.Vpc
}

export class DnsCertificateUpdate extends Construct {
  constructor(scope: Stack, id: string, { usercodeStack, vpc }: DnsCertificateUpdateOptionsInterface) {
    super(scope, id)

    // lambda lives within same stack/account as database for connection
    const certificateUpdateLambda = new aws_lambda.Function(scope, `${id}-certificate-trigger-lambda`, {
      functionName: PhysicalName.GENERATE_IF_NEEDED,
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      timeout: Duration.seconds(30),
      handler: 'dns.eventbridge.handler',
      vpc,
      memorySize: 512,
      code: aws_lambda.Code.fromAsset('bundle/dns-eventbridge.zip'),
    })

    const paasEventBridge = new aws_events.EventBus(scope, `${id}-paas-default-bus`, {
      eventBusName: PhysicalName.GENERATE_IF_NEEDED,
    })
    const iaasEventBridge = aws_events.EventBus.fromEventBusName(
      usercodeStack,
      `${id}-lookup-default-event-bus`,
      'default',
    )

    console.log('accountids', [usercodeStack.account, scope.account])

    const paasEventRole = new aws_iam.Role(scope, `${id}-paas-event-role`, {
      assumedBy: new aws_iam.CompositePrincipal(
        new aws_iam.AccountPrincipal(scope.account),
        new aws_iam.AccountPrincipal(usercodeStack.account),
      ),
    })

    const iaasEventRole = new aws_iam.Role(usercodeStack, `${id}-iaas-event-rule`, {
      assumedBy: new aws_iam.CompositePrincipal(
        new aws_iam.AccountPrincipal(scope.account),
        new aws_iam.AccountPrincipal(usercodeStack.account),
      ),
    })

    const crossAccountIaasToPaasRule = new aws_events.Rule(usercodeStack, `${id}-cross-account-rule`, {
      ruleName: 'cross-account-rule',
      eventPattern: {
        source: ['aws.amc'],
        detailType: ['*'],
      },
      targets: [new aws_events_targets.EventBus(paasEventBridge)],
    })
    
    // eventbridge rule lives within same account as certificate + eventbridge event
    const paasCertificateActionRule = new aws_events.Rule(scope, `${id}-amc-eventbridge-certificate-lambda-rule`, {
      ruleName: 'amc-certificate-eventbridge-rule',
      eventPattern: {
        source: ['aws.amc'],
        detailType: ['*'],
      },
      targets: [new aws_events_targets.LambdaFunction(certificateUpdateLambda)],
    })
  }
}
