import { Duration, Stack } from 'aws-cdk-lib'
import {
  CfnDistribution,
  CloudFrontWebDistribution,
  Distribution,
  HeadersFrameOption,
  HeadersReferrerPolicy,
  ResponseHeadersPolicy,
} from 'aws-cdk-lib/aws-cloudfront'

const defaultContentSecurityPolicy =
  "default-src 'self' *.reapit.cloud *.chatlio.com *.pusher.com *.googleapis.com https://cognito-idp.eu-west-2.amazonaws.com https://cognito-idp.ap-southeast-2.amazonaws.com https://www.google-analytics.com *.sentry.io https://sentry.io *.visualstudio.com *.sagepay.com *.elavon.com https://reapit-marketplace-app-media-dev.s3.eu-west-2.amazonaws.com https://reapit-swagger-dev.s3.eu-west-2.amazonaws.com https://reapit-swagger-prod.s3.eu-west-2.amazonaws.com https://reapit-marketplace-app-media-prod.s3.eu-west-2.amazonaws.com blob: *.googleapis.com *.pusherapp.com wss://ws.pusherapp.com *.zdassets.com *.zendesk.com wss://widget-mediator.zopim.com wss://ws-eu.pusher.com *.mixpanel.com https://api.github.com/ *.chatbase.co"
const imageContentSecurityPolicy =
  "img-src 'self' data: *.reapit.cloud *.chatlio.com https://cdn.jsdelivr.net https://maps.gstatic.com https://maps.googleapis.com blob: https://reapit-marketplace-app-media-dev.s3.eu-west-2.amazonaws.com https://reapit-marketplace-app-media-prod.s3.eu-west-2.amazonaws.com https://*.githubusercontent.com *.chatbase.co"
const scriptContentSecurityPolicy =
  "script-src 'self' *.reapit.cloud *.chatlio.com https://cdn.jsdelivr.net https://unpkg.com *.sagepay.com *.elavon.com https://maps.googleapis.com https://www.google-analytics.com *.zdassets.com *.pusher.com *.zopim.com *.chatbase.co"
const styleContentSecurityPolicy =
  "style-src 'self' 'unsafe-inline' *.reapit.cloud *.chatlio.com https://cdn.jsdelivr.net https://fonts.googleapis.com"
const objectContentSecurityPolicy = "object-src 'self' *.reapit.cloud"
const fontContentSecurityPolicy = "font-src 'self' *.reapit.cloud https://fonts.gstatic.com"
const frameContentSecurityPolicy =
  "frame-src 'self' *.reapit.cloud https://foundations-documentation.reapit.cloud *.powerbi.com *.powerapps.com *.windows.net *.visualstudio.com https://www.youtube.com *.reapit.com https://player.vimeo.com https://explorer.embed.apollographql.com *.chatbase.co"

export const createSecurityHeaders = (stack: Stack, id: string, webDistribution: CloudFrontWebDistribution) => {
  const iframePolicy = stack.stackName.includes('payments') ? "frame-src 'self' https://*" : frameContentSecurityPolicy
  const contentSecurityPolicy = `${defaultContentSecurityPolicy}; ${imageContentSecurityPolicy}; ${scriptContentSecurityPolicy}; ${styleContentSecurityPolicy}; ${objectContentSecurityPolicy}; ${fontContentSecurityPolicy}; ${iframePolicy}`
  const myResponseHeadersPolicy = new ResponseHeadersPolicy(stack, id, {
    securityHeadersBehavior: {
      contentSecurityPolicy: { contentSecurityPolicy, override: true },
      contentTypeOptions: { override: true },
      frameOptions: { frameOption: HeadersFrameOption.DENY, override: true },
      referrerPolicy: { referrerPolicy: HeadersReferrerPolicy.NO_REFERRER, override: true },
      strictTransportSecurity: {
        accessControlMaxAge: Duration.seconds(63072000),
        preload: true,
        includeSubdomains: true,
        override: true,
      },
      xssProtection: {
        protection: true,
        modeBlock: true,
        override: true,
      },
    },
  })

  const cfnDistribution = webDistribution.node.defaultChild as CfnDistribution | undefined
  if (!cfnDistribution) {
    throw new Error('Could not find CloudFront Distribution')
  }
  cfnDistribution.addPropertyOverride(
    'DistributionConfig.DefaultCacheBehavior.ResponseHeadersPolicyId',
    myResponseHeadersPolicy.responseHeadersPolicyId,
  )
}
