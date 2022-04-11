import { SqsProvider } from './sqs-provider'
import { SQSRecord } from 'aws-lambda'
import { WORKFLOW_INJECTABLE, WORKFLOW_TYPE } from './workflow-decorator'
import { plainToClass } from 'class-transformer'

export abstract class AbstractWorkflow<T extends any> {
  protected record: SQSRecord

  get queue(): string {
    // TODO check `this` is child abstraction and not parent
    return Reflect.getMetadata(WORKFLOW_INJECTABLE, this)
  }

  constructor(private readonly sqsProvider: SqsProvider) {}

  abstract execute(payload: T): Promise<void | never>

  protected deserialisePayload(payload: string) {
    if (Reflect.hasMetadata(WORKFLOW_TYPE, this)) {
      return plainToClass(Reflect.getMetadata(WORKFLOW_TYPE, this), payload)
    }

    return JSON.parse(payload)
  }

  async run(record: SQSRecord) {
    this.record = record
    await this.execute(this.deserialisePayload(record.body))
  }

  protected async deleteMessage() {
    this.sqsProvider.deleteMessage(this.record.receiptHandle, this.queue)
  }
}
