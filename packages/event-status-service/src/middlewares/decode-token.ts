import { NextFunction, Response } from 'express'
import { AppRequest } from '../types/request'
import jwt_decode, { JwtPayload } from 'jwt-decode'

// NB. This function DOES NOT validate that tokens are valid for this API.
// It merely decodes the supplied token to get information about the user.
// The process to validate the token happens in the authorizer, as defined
// in serverless.yml, which runs before this lambda starts. It is assumed
// therefore that tokens received at this point are valid.
export default (req: AppRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  try {
    const decoded = jwt_decode<JwtPayload>(token)

    req.user = {
      sub: decoded.sub,
      clientCode: decoded['custom:reapit:clientCode'],
      userCode: decoded['custom:reapit:userCode'],
      name: decoded['name'],
      email: decoded['email'],
    }

    next()
  } catch (error) {
    return res.status(401).send()
  }
}
