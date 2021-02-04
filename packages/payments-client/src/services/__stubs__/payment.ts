import { UpdateStatusBody, UpdateStatusParams } from '../../types/payment'

export const body: UpdateStatusBody = { status: 'posted', externalReference: 'SOME_POSTED_REF' }
export const params: UpdateStatusParams = {
  _eTag: 'etag',
  paymentId: 'MKT20000010',
  session: 'session-token',
  clientCode: 'client-code',
}
