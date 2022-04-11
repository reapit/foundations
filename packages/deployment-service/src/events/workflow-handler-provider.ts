import { Injectable } from '@nestjs/common'
import { AbstractWorkflow } from './abstract-workflow'
import { WORKFLOW_INJECTABLE } from './workflow-decorator'
import { SQSRecord } from 'aws-lambda'

@Injectable()
export class WorkflowHandlerProvider {
  private readonly workflows: AbstractWorkflow<any>[]

  findQueueWorkflows(queue): AbstractWorkflow<any>[] {
    return this.workflows.filter((workflow) => Reflect.getMetadata(WORKFLOW_INJECTABLE, workflow) === queue)
  }

  async handleMultiple(queue: string, records: SQSRecord[]): Promise<void[]> {
    return Promise.all(records.map((record) => this.handle(queue, record)))
  }

  async handle(queue: string, record: SQSRecord): Promise<void> {
    record.attributes.SenderId
    const workflows = this.findQueueWorkflows(queue)

    if (workflows.length === 0) {
      // TODO delete?
      console.log(`No configured workflows available for queue [${queue}]`)
    }

    // TODO auto handle deletes?
    // TODO try catch each?
    await Promise.all(workflows.map((workflow) => workflow.run(record)))
  }
}
