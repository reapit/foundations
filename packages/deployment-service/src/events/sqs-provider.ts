import { QueueNamesEnum } from '../constants'
import {Injectable} from '@nestjs/common'
import { SQS } from 'aws-sdk'

@Injectable()
export class SqsProvider {
  constructor(
    private readonly sqs: SQS,
  ) {}

  send<T>(QueueUrl: QueueNamesEnum, message: T): Promise<void> {
    return new Promise((resolve, reject) => this.sqs.sendMessage({
      QueueUrl,
      MessageBody: JSON.stringify(message),
    }, (error) => {
      if (error) reject(error)
      resolve()
    }))
  }

  deleteMessage(ReceiptHandle: string, QueueUrl: string): Promise<void> {
    return new Promise((resolve, reject) => this.sqs.deleteMessage({
      ReceiptHandle,
      QueueUrl,
    }, (error) => {
      if (error) reject(error)
      resolve()
    }))
  }
}
