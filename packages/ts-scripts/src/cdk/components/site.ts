import { createCloudfront } from './cloudfront'
import { createRoute } from './r53'
import {
  Stack,
  aws_route53 as route53,
  aws_s3_assets as assets,
  aws_cloudfront_origins as origins,
  aws_route53_targets as targets,
} from 'aws-cdk-lib'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'

interface CreateSiteInterface {
  domain: string,
  hostedZoneId: string,
  zoneName?: string,
  defaultRootObject?: string,
  location: string,
  sslCertArn: string,
}

export const createSite = async (stack: Stack, {
  domain,
  hostedZoneId,
  defaultRootObject = 'index.html',
  zoneName = 'dev.paas.reapit.cloud',
  sslCertArn,
  location,
}: CreateSiteInterface) => {

  const hostedZone = route53.HostedZone.fromHostedZoneAttributes(stack, 'hosted-zone', { hostedZoneId, zoneName, })

  const asset = new assets.Asset(stack as any, 'assets', {
    path: location,
  })

  const cloudFront = createCloudfront(stack, 'front-distro', {
    defaultBehavior: { origin: new origins.S3Origin(asset.bucket) },
    defaultRootObject,
    domainNames: [ domain ],
    certificate: Certificate.fromCertificateArn(stack, 'cert', sslCertArn),
  })

  const r53 = createRoute(stack, 'route', {
    target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cloudFront)),
    zone: hostedZone,
    recordName: domain,
  })

  return r53.domainName
}
