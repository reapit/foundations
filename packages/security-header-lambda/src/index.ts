import { CloudFrontResponseEvent, Context, CloudFrontResponseCallback } from 'aws-lambda'
import config from '../config.json'

const {
  defaultContentSecurityPolicy,
  imageContentSecurityPolicy,
  scriptContentSecurityPolicy,
  styleContentSecurityPolicy,
  objectContentSecurityPolicy,
  fontContentSecurityPolicy,
  frameContentSecurityPolicy,
} = config

export const securityHeaderLambda = (
  event: CloudFrontResponseEvent,
  context: Context,
  callback: CloudFrontResponseCallback,
) => {
  const response = event.Records[0].cf.response
  const headers = response.headers
  const paymentsClients = [config.paymentsCfDistId, config.paymentsPortalCfDistId]
  const cfDistId = event.Records[0].cf.config.distributionId
  const isPayments = paymentsClients.includes(cfDistId)
  const isPaymentsPortal = paymentsClients.includes(config.paymentsPortalCfDistId)
  // Support for cross origin iframes to allow for 3D Secure where we don't know the orginating bank
  const iframePolicy = isPayments ? "frame-src 'self' https://*" : frameContentSecurityPolicy
  const imagePolicy = isPaymentsPortal ? "img-src 'self' data: https://*" : imageContentSecurityPolicy

  headers['strict-transport-security'] = [
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubdomains; preload' },
  ]
  headers['content-security-policy'] = [
    {
      key: 'Content-Security-Policy',
      value: `${defaultContentSecurityPolicy}; ${imagePolicy}; ${scriptContentSecurityPolicy}; ${styleContentSecurityPolicy}; ${objectContentSecurityPolicy}; ${fontContentSecurityPolicy}; ${iframePolicy}`,
    },
  ]
  headers['x-content-type-options'] = [{ key: 'X-Content-Type-Options', value: 'nosniff' }]
  headers['x-frame-options'] = [{ key: 'X-Frame-Options', value: 'DENY' }]
  headers['x-xss-protection'] = [{ key: 'X-XSS-Protection', value: '1; mode=block' }]
  headers['referrer-policy'] = [{ key: 'Referrer-Policy', value: 'same-origin' }]

  callback(null, response)
}
