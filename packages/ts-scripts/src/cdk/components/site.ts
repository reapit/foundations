import { createCloudfront } from './cloudfront'
import { createRoute } from './r53'
import {
  Stack,
  aws_route53 as route53,
  aws_cloudfront as cloudfront,
  aws_route53_targets as targets,
  aws_s3 as s3,
  aws_s3_deployment as deploy,
} from 'aws-cdk-lib'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'

interface CreateSiteInterface {
  domain: string
  hostedZoneId: string
  zoneName?: string
  defaultRootObject?: string
  location: string
  sslCertArn: string
}

export const createSite = async (
  stack: Stack,
  {
    domain,
    hostedZoneId,
    defaultRootObject = 'index.html',
    zoneName = 'dev.paas.reapit.cloud',
    sslCertArn,
    location,
  }: CreateSiteInterface,
) => {
  const hostedZone = route53.HostedZone.fromHostedZoneAttributes(stack, 'hosted-zone', { hostedZoneId, zoneName })

  const bucket = new s3.Bucket(stack, 'bucket', {
    websiteIndexDocument: defaultRootObject,
    websiteErrorDocument: defaultRootObject,
    publicReadAccess: true,
  })

  new deploy.BucketDeployment(stack, 'deployment', {
    sources: [deploy.Source.asset(location)],
    destinationBucket: bucket,
  })

  const distro = createCloudfront(stack, 'front-distro', {
    originConfigs: [
      {
        customOriginSource: {
          domainName: bucket.bucketWebsiteDomainName,
          originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
        },
        behaviors: [{ isDefaultBehavior: true }],
      },
    ],
    defaultRootObject,
    viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
      Certificate.fromCertificateArn(stack, 'cert', sslCertArn),
      {
        aliases: [domain],
      },
    ),
  })

  const r53 = createRoute(stack, 'route', {
    target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distro)),
    zone: hostedZone,
    recordName: domain,
  })

  return r53.domainName
}
