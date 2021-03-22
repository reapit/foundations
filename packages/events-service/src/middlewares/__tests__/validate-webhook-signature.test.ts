import validateWebhookSignature from '../validate-webhook-signature'

jest.mock('../../core/constants', () => ({
  ALLOWED_WEBHOOK_SIGNATURES: ['allowedSig1', 'allowedSig2'],
}))

describe('validateWebhookSignature middleware', () => {
  it('should throw an error if the header doesnt match', () => {
    const req: any = {
      headers: {
        'reapit-webhook-signature': 'nomatch',
      },
    }
    const res: any = {
      status: jest.fn(),
      json: jest.fn(),
    }
    const next = jest.fn()

    validateWebhookSignature(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ status: 401, error: 'Invalid `reapit-webhook-signature` header supplied' })
    expect(next).toHaveBeenCalledTimes(0)
  })

  it('should call next if the header does match', () => {
    const req: any = {
      headers: {
        'reapit-webhook-signature': 'allowedSig2',
      },
    }
    const res: any = {
      status: jest.fn(),
      json: jest.fn(),
    }
    const next = jest.fn()

    validateWebhookSignature(req, res, next)

    expect(res.status).toHaveBeenCalledTimes(0)
    expect(res.json).toHaveBeenCalledTimes(0)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
