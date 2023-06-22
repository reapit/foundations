import { Stack } from '../index'
import { CreateSiteInterface, createSite } from './site'
import {
  aws_route53 as route53,
  aws_route53_targets as targets,
  aws_cloudfront as cloudfront,
  aws_certificatemanager as acm,
} from 'aws-cdk-lib'
import * as cdk from 'aws-cdk-lib'

const getStackAppName = (stack: Stack) => {
  const stackNamePieces = stack.stackName.split('-')
  stackNamePieces.pop()
  stackNamePieces.shift()
  return stackNamePieces.join('-')
}

const getAnzSubdomain = (stack: Stack, env: 'dev' | 'prod') => {
  const appName = getStackAppName(stack)
  return `${appName}.au.${env}.rc.reapit.cloud`
}

interface MultiRegionSiteInterface extends Omit<CreateSiteInterface, 'viewerCertificateOverride'> {
  onlyZone?: boolean
}

export const createMultiRegionSite = async (stack: cdk.Stack, props: MultiRegionSiteInterface) => {
  const { onlyZone, env = 'dev' } = props
  if (!stack._crossRegionReferences) {
    throw new Error('Multi region site requires input stack to have crossRegionReferences set to true')
  }
  const auSubDomain = getAnzSubdomain(stack, env)
  const domain = `${env}.paas.reapit.cloud`
  const appName = getStackAppName(stack)
  const subDomain = `${appName}.${domain}`

  const certStack = new cdk.Stack(stack, 'cert-stack', {
    env: {
      region: 'us-east-1',
      account: stack.account,
    },
    crossRegionReferences: true,
  })
  const auZone = new route53.HostedZone(certStack, 'au-zone', {
    zoneName: auSubDomain,
  })

  const viewerCertificateOverride = onlyZone
    ? undefined
    : cloudfront.ViewerCertificate.fromAcmCertificate(
        new acm.Certificate(certStack, 'multi-domain-cert', {
          domainName: subDomain,
          subjectAlternativeNames: [subDomain, auSubDomain],
          validation: acm.CertificateValidation.fromDnsMultiZone({
            [subDomain]: route53.HostedZone.fromLookup(certStack, 'hosted-zone-2', { domainName: domain }),
            [auSubDomain]: auZone,
          }),
        }),
        {
          aliases: [subDomain, auSubDomain],
        },
      )

  const { distribution } = await createSite(stack, {
    ...props,
    viewerCertificateOverride,
  })

  const auArecordStack = new cdk.Stack(certStack, 'arecord', {
    crossRegionReferences: true,
    env: {
      region: 'us-east-1',
      account: stack.account,
    },
  })
  new route53.ARecord(auArecordStack, 'au-arecord', {
    zone: auZone,
    target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
  })
}
