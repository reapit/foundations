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
import { Certificate, ICertificate } from 'aws-cdk-lib/aws-certificatemanager'
import { ACM } from 'aws-sdk'

interface CreateSiteInterface {
  domain: string
  hostedDomainName?: string
  defaultRootObject?: string
  location: string
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
    domain,
    defaultRootObject = 'index.html',
    hostedDomainName = 'dev.paas.reapit.cloud',
    location,
  }: CreateSiteInterface,
) => {
  const hostedZone = route53.HostedZone.fromLookup(stack, 'hosted-zone', { domainName: hostedDomainName })
  const certificate = await findCert(stack, hostedDomainName)

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
    viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
      aliases: [domain],
    }),
  })

  const r53 = createRoute(stack, 'route', {
    target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distro)),
    zone: hostedZone,
    recordName: domain,
  })

  return r53.domainName
}
