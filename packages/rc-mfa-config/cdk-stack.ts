import { Stack, createBaseStack, createSite, getAccountId } from '@reapit/ts-scripts/src/cdk'
import { join } from 'path'
import {
  aws_route53 as route53,
  aws_route53_targets as targets,
  // aws_cloudfront as cloudfront,
  // aws_certificatemanager as acm,
} from 'aws-cdk-lib'

const getAnzSubdomain = (stack: Stack, env: string) => {
  const stackNamePieces = stack.stackName.split('-')
  stackNamePieces.pop()
  stackNamePieces.shift()
  return `${stackNamePieces.join('-')}.au.${env}.rc.reapit.cloud`
}

const createStack = async () => {
  const accountId = await getAccountId()
  const appName = 'reapit-mfa-config'
  const stack = createBaseStack({
    namespace: 'cloud',
    appName,
    component: 'site',
    accountId,
    region: 'eu-west-2',
  })
  const env = process.env.APP_STAGE === 'production' ? 'prod' : 'dev'

  const auSubDomain = getAnzSubdomain(stack, env)
  const auZone = new route53.HostedZone(stack, 'au-zone', {
    zoneName: auSubDomain,
  })

  // const hostedZone = route53.HostedZone.fromLookup(stack, 'hosted-zone', { domainName: domain })

  // const cert = new acm.Certificate(stack, 'multi-domain-cert', {
  //   domainName: subDomain,
  //   subjectAlternativeNames: [subDomain, auSubDomain],
  //   validation: acm.CertificateValidation.fromDnsMultiZone({
  //     [subDomain]: hostedZone,
  //     [auSubDomain]: auZone,
  //   }),
  // })

  // const viewerCertificateOverride = cloudfront.ViewerCertificate.fromAcmCertificate(cert, {
  //   aliases: [subDomain, auSubDomain],
  // })

  const { distribution } = await createSite(stack, {
    location: join(__dirname, 'build'),
    // viewerCertificateOverride,
    env,
  })

  new route53.ARecord(stack, 'au-arecord', {
    zone: auZone,
    target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
  })
}

const bootstrap = async () => {
  await createStack()
}

bootstrap().catch((err) => {
  console.error('Build error: ', err)
  process.exit(1)
})
