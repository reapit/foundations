import { AWSError, STS } from 'aws-sdk'
const sts = new STS()

export const getAccountId = async () => {
  return new Promise<string>((resolve, reject) => {
    sts.getCallerIdentity(async (err: AWSError, data: STS.Types.GetCallerIdentityResponse) => {
      if (err || !data.Account) reject(err)

      resolve(data.Account as string)
    })
  })
}
