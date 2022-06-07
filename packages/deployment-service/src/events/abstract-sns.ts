import { SNS_HANDLER } from './sns-decorator'
import { SNSEventRecord } from 'aws-lambda'

export abstract class AbstractSnsHandler {
  abstract handle(record: SNSEventRecord): Promise<void>

  get metadata(): {
    arn: string
  } {
    return Reflect.getMetadata(SNS_HANDLER, this.constructor)
  }

  get topicArn(): string {
    return this.metadata.arn
  }
}
