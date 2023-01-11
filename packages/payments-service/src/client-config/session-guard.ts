import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { SessionModel } from '../session/model'

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly datamapper: DataMapper) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>()

    const session = request.headers['reapit-session'] as string
    const clientCode = request.headers['reapit-customer'] as string
    const paymentId = request.params['paymentId']

    const { sessionIsValid } = await this.datamapper.get(Object.assign(new SessionModel(), { id: session }))

    const validSession = sessionIsValid(clientCode, paymentId)

    if (!validSession) throw new BadRequestException('No valid session found for this payment')

    return validSession
  }
}
