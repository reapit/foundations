import { DataMapper } from '@aws/dynamodb-data-mapper'
import { Injectable } from '@nestjs/common'
import { SessionModel } from './model'

@Injectable()
export class SessionProvider {
  constructor(private readonly datamapper: DataMapper) {}

  async create(session: Partial<SessionModel>): Promise<SessionModel> {
    return this.datamapper.put(Object.assign(new SessionModel(), { ...session }))
  }
}
