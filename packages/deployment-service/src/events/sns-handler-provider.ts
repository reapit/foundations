import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { MODULE_METADATA } from '@nestjs/common/constants'
import { ModuleRef, ModulesContainer } from '@nestjs/core'
import { AbstractSnsHandler } from './abstract-sns'
import { SNS_HANDLER } from './sns-decorator'
import { SNSEventRecord } from 'aws-lambda'

@Injectable()
export class SnsHandlerProvider implements OnModuleInit {
  handlers: AbstractSnsHandler[] = []

  constructor(
    private readonly moduleContainer: ModulesContainer,
    private readonly moduleRef: ModuleRef,
  ) {}

  findHandler(topicArn: string) {
    return this.handlers.find((handler) => handler.topicArn === topicArn)
  }

  async handle(record: SNSEventRecord): Promise<void> {
    const topicArn = record.Sns.TopicArn
    const handler = this.findHandler(topicArn)

    if (!handler) {
      console.log('sns record', record)
      throw new Error('Unable to process, no handler found for sns event')
    }

    await handler.handle(record)
  }

  async handleMultiple(records: SNSEventRecord[]) {
    await Promise.all(records.map((record) => this.handle(record)))
  }

  onModuleInit() {
    ;[...this.moduleContainer.values()].forEach(({ metatype }) => {
      const metadata = Reflect.getMetadata(MODULE_METADATA.PROVIDERS, metatype)

      if (!metadata) {
        return
      }

      const providers = [...metadata.filter((metatype: any) => typeof metatype === 'function')]

      providers.forEach((provider) => {
        if (Reflect.hasOwnMetadata(SNS_HANDLER, provider)) {
          const injectable = this.moduleRef.get(provider, { strict: false })
          if (!this.handlers.find((handler) => handler.constructor.name === injectable.constructor.name)) {
            Logger.log(`Synced [${injectable.constructor.name}] to SNS workflows`, 'SnsHandlerProvider')
            this.handlers.push(injectable)
          }
        }
      })
    })
  }
}
