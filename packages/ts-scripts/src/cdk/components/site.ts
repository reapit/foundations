import { createCloudfront } from './cloudfront'
import { createRoute } from './r53'
import {
  Stack,
  aws_route53 as route53,
  aws_route53_targets as targets,
  aws_s3 as s3,
  aws_s3_deployment as deploy,
  aws_cloudfront as cloudfront,
} from 'aws-cdk-lib'
import { Certificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront'
import { CanonicalUserPrincipal, PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { BlockPublicAccess, BucketAccessControl, BucketEncryption, ObjectOwnership } from 'aws-cdk-lib/aws-s3'
import { ACM } from 'aws-sdk'
import { InvalidateCloudfrontDistribution } from '../utils/cf-innvalidate'
import { createSecurityHeaders } from './security-headers'

export interface CreateSiteInterface {
  env?: 'dev' | 'prod'
  defaultRootObject?: string
  location: string
  viewerCertificateOverride?: cloudfront.ViewerCertificate
  priceClass?: cloudfront.PriceClass
}

const findCert = async (stack: Stack, domain: string): Promise<ICertificate> => {
  const acm = new ACM({
    region: 'us-east-1',
  })
  const certDomain = `*.${domain}`
  const result = await new Promise<ACM.ListCertificatesResponse>((resolve, reject) =>
    acm.listCertificates({}, (error, data) => {
      if (error) {
        console.error(error)
        reject(error)
      }

      return resolve(data)
    }),
  )

  const domainCertificate = result.CertificateSummaryList?.find((cert) => cert.DomainName === certDomain)

  if (!domainCertificate || !domainCertificate.CertificateArn) {
    throw new Error('Certificate not found')
  }

  return Certificate.fromCertificateArn(stack, 'cert', domainCertificate?.CertificateArn)
}

export const createSite = async (
  stack: Stack,
  {
    defaultRootObject = 'index.html',
    env = 'dev',
    location,
    viewerCertificateOverride,
    priceClass,
  }: CreateSiteInterface,
) => {
  const stackNamePieces = stack.stackName.split('-')
  stackNamePieces.pop()
  stackNamePieces.shift()
  const domain = `${env}.paas.reapit.cloud`
  const subDomain = `${stackNamePieces.join('-')}.${domain}`

  const certificate = await findCert(stack, domain)

  const hostedZone = route53.HostedZone.fromLookup(stack, 'hosted-zone', { domainName: domain })

  const bucket = new s3.Bucket(stack, 'bucket', {
    websiteIndexDocument: defaultRootObject,
    websiteErrorDocument: defaultRootObject,
    publicReadAccess: false,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    accessControl: BucketAccessControl.PRIVATE,
    objectOwnership: ObjectOwnership.BUCKET_OWNER_ENFORCED,
    encryption: BucketEncryption.S3_MANAGED,
  })

  const cloudfrontOAI = new OriginAccessIdentity(stack, 'CloudFrontOriginAccessIdentity')

  bucket.addToResourcePolicy(
    new PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [bucket.arnForObjects('*')],
      principals: [new CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
    }),
  )

  const deploymentBucket = new deploy.BucketDeployment(stack, 'deployment', {
    sources: [deploy.Source.asset(location)],
    destinationBucket: bucket,
  })

  console.log('deployment', deploymentBucket.deployedBucket.bucketDomainName)

  const distribution = createCloudfront(stack, 'front-distro', {
    originConfigs: [
      {
        s3OriginSource: {
          s3BucketSource: bucket,
          originAccessIdentity: cloudfrontOAI,
        },
        behaviors: [{ isDefaultBehavior: true }],
      },
    ],
    defaultRootObject,
    priceClass,
    viewerCertificate:
      viewerCertificateOverride ||
      cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: [subDomain],
      }),
    errorConfigurations: [
      {
        errorCode: 404,
        responseCode: 200,
        responsePagePath: '/index.html',
      },
      {
        errorCode: 403,
        responseCode: 200,
        responsePagePath: '/index.html',
      },
      {
        errorCode: 400,
        responseCode: 200,
        responsePagePath: '/index.html',
      },
    ],
  })

  createSecurityHeaders(stack, 'SecurityHeaders', distribution)

  createRoute(stack, 'route', {
    target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    zone: hostedZone,
    recordName: subDomain,
    deleteExisting: true,
  })

  new InvalidateCloudfrontDistribution(stack, 'invalidation', {
    distribution,
    items: ['/index.html'],
  })

  return {
    distribution,
  }
}
