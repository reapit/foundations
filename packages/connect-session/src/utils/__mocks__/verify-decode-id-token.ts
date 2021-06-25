import { mockLoginIdentity } from '../../__mocks__/session'

export const connectSessionVerifyDecodeIdToken = () => new Promise((resolve) => resolve(mockLoginIdentity))

export const connectSessionVerifyDecodeIdTokenWithPublicKeys = () =>
  new Promise((resolve) => resolve(mockLoginIdentity))
