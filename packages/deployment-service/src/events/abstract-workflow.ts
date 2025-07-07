import { SqsProvider } from './sqs-provider'
import { SQSRecord } from 'aws-lambda'
import { WORKFLOW_INJECTABLE, WORKFLOW_TYPE } from './workflow-decorator'
import { plainToInstance } from 'class-transformer'

export abstract class AbstractWorkflow<T extends any> {
  protected record: SQSRecord

  get metadata(): {
    url: string
    arn: string
  } {
    return Reflect.getMetadata(WORKFLOW_INJECTABLE, this.constructor)
  }

  get url(): string {
    return this.metadata.url
  }

  get queueArn(): string {
    return this.metadata.arn
  }

  constructor(private readonly sqsProvider: SqsProvider) {}

  abstract execute(payload: T): Promise<void | never>

  protected deserialisePayload(payload: string): T {
    if (Reflect.hasMetadata(WORKFLOW_TYPE, this.constructor)) {
      return plainToInstance<T, T>(Reflect.getMetadata(WORKFLOW_TYPE, this.constructor), JSON.parse(payload), {
        ignoreDecorators: true,
      }) as T
    }

    return JSON.parse(payload)
  }

  async run(record: SQSRecord) {
    this.record = record
    await this.execute(this.deserialisePayload(record.body))
  }

  protected async deleteMessage() {
    await this.sqsProvider.deleteMessage(this.record.receiptHandle, this.url)
  }
}
