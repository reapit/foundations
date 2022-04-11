import { SqsProvider } from './sqs-provider'
import { SQSRecord } from 'aws-lambda'
import { WORKFLOW_INJECTABLE } from './workflow-decorator'

export abstract class AbstractWorkflow {
  protected record: SQSRecord

  get queue(): string {
    // TODO check `this` is child abstraction and not parent
    return Reflect.getMetadata(WORKFLOW_INJECTABLE, this)
  }

  constructor(private readonly sqsProvider: SqsProvider) {}

  abstract execute(payload: any): Promise<void | never>

  private async run(record: SQSRecord) {
    this.record = record
    await this.execute(JSON.parse(record.body))
  }

  protected async deleteMessage() {
    this.sqsProvider.deleteMessage(this.record.receiptHandle, this.queue)
  }
}
