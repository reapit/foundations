import jwt from 'jsonwebtoken'

export const decodeToken = (
  token: string,
):
  | {
      ['custom:reapit:orgId']: string
      ['custom:reapit:developerId']: string
    }
  | any => jwt.decode(token)
