import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { AbstractWorkflow } from './abstract-workflow'
import { WORKFLOW_INJECTABLE } from './workflow-decorator'
import { SQSRecord } from 'aws-lambda'
import { MODULE_METADATA } from '@nestjs/common/constants'
import { ModuleRef, ModulesContainer } from '@nestjs/core'

@Injectable()
export class WorkflowHandlerProvider implements OnModuleInit {
  private readonly workflows: AbstractWorkflow<any>[] = []

  constructor(private readonly moduleContainer: ModulesContainer, private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    ;[...this.moduleContainer.values()].forEach(({ metatype }) => {
      const metadata = Reflect.getMetadata(MODULE_METADATA.PROVIDERS, metatype)

      if (!metadata) {
        return
      }

      const providers = [...metadata.filter((metatype: any) => typeof metatype === 'function')]

      providers.map((provider) => {
        if (Reflect.hasOwnMetadata(WORKFLOW_INJECTABLE, provider)) {
          const injectable = this.moduleRef.get(provider, { strict: false })
          if (!this.workflows.find((workflow) => workflow.constructor.name === injectable.constructor.name)) {
            this.workflows.push(injectable)
            Logger.log(`added [${injectable.constructor.name}] to SQS workflows`, 'WorkflowHandlerProvider')
          }
        }
      })
    })
  }

  findQueueWorkflows(queueArn: string): AbstractWorkflow<any>[] {
    Logger.log(queueArn.split(':').pop(), 'WorkflowHandlerProvider')
    return this.workflows.filter((workflow) => {
      return workflow.queueArn === queueArn
    })
  }

  async handleMultiple(records: SQSRecord[]): Promise<void[]> {
    return Promise.all(records.map((record) => this.handle(record)))
  }

  async handle(record: SQSRecord): Promise<void> {
    const queueArn = record.eventSourceARN

    const workflows = this.findQueueWorkflows(queueArn)

    if (workflows.length === 0) {
      // TODO delete from queue?
      Logger.error(`No configured workflows available for queue [${queueArn}]`, 'WorkflowHandlerProvider')
    }

    // TODO auto handle deletes?
    // TODO try catch each?
    await Promise.all(workflows.map((workflow) => workflow.run(record)))
  }
}
