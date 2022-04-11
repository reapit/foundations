import { Injectable } from '@nestjs/common'
import { AbstractWorkflow } from './abstract-workflow'
import { WORKFLOW_INJECTABLE } from './workflow-decorator'

@Injectable()
export class WorkflowHandlerProvider {
  private readonly workflows: AbstractWorkflow[]

  findQueueWorkflows(queue): AbstractWorkflow[] {
    return this.workflows.filter((workflow) => Reflect.getMetadata(WORKFLOW_INJECTABLE, workflow) === queue)
  }

  async run(queue: string, payload: string): Promise<void> {
    const workflows = this.findQueueWorkflows(queue)

    if (workflows.length === 0) {
      // TODO delete?
    }

    // TODO auto handle deletes?
    await Promise.all(workflows.map((workflow) => workflow.execute(JSON.parse(payload))))
  }
}
