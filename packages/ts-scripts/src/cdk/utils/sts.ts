import { STS } from 'aws-sdk'
const sts = new STS()

export const getAccountId = async () => {
  return new Promise<string>((resolve, reject) => {
    sts.getCallerIdentity(async (err, account) => {
      if (err) reject(err)

      resolve(account.Account)
    })
  })
}
