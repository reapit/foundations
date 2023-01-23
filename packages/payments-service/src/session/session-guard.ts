import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { SessionModel } from './model'

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly datamapper: DataMapper) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()

    const session = request.headers['reapit-session'] as string
    const clientCode = request.headers['reapit-customer'] as string
    const paymentId = request.params['paymentId']

    let isValidSession: boolean = false

    try {
      const sessionModel = await this.datamapper.get(Object.assign(new SessionModel(), { id: session }))
      isValidSession = sessionModel.sessionIsValid(clientCode, paymentId)
    } catch (err) {
      throw new BadRequestException('No valid session found for this payment')
    }

    if (!isValidSession) throw new BadRequestException('No valid session found for this payment')

    return isValidSession
  }
}
