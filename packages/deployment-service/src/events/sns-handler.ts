import { Injectable } from '@nestjs/common'
import { SNSEvent, SNSEventRecord } from 'aws-lambda'

export interface SnsHandlerInterface {
  handle: (record: SNSEventRecord) => Promise<void>
}

@Injectable()
export class SnsHandlerProvider {
  handlers: SnsHandlerInterface[]

  async handle(snsEvent: SNSEvent): Promise<void> {
    const handler = this.handlers[0]

    await Promise.all(snsEvent.Records.map((record) => handler.handle(record)))
  }
}
