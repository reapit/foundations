import { DataMapper } from '@aws/dynamodb-data-mapper'
import { BadRequestException, Injectable } from '@nestjs/common'
import { SessionModel } from './model'

@Injectable()
export class SessionProvider {
  constructor(private readonly datamapper: DataMapper) {}

  async create(session: Partial<SessionModel>): Promise<SessionModel> {
    try {
      return await this.datamapper.put(Object.assign(new SessionModel(), { ...session }))
    } catch (err) {
      throw new BadRequestException('Session item failed to create')
    }
  }
}
