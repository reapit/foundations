import { getNewUser } from '../../utils/cognito'
import { ConfirmRegistrationParams } from '../../core/types'
import errorStrings from '../../constants/error-strings'

export const confirmRegistrationService = async ({
  verificationCode,
  userName,
}: ConfirmRegistrationParams): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getNewUser(userName)

    cognitoUser.confirmRegistration(verificationCode, true, err => {
      if (err) {
        reject(`${errorStrings.CONFIRM_REGISTRATION_SERVICE_ERROR} ${JSON.stringify(err)}`)
      }
      resolve('SUCCESS')
    })
  })
}
