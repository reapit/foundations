import { Injectable, OnModuleInit } from '@nestjs/common'
import { MODULE_METADATA } from '@nestjs/common/constants'
import { ModuleRef, ModulesContainer } from '@nestjs/core'
import { SNSEvent, SNSEventRecord } from 'aws-lambda'

export interface SnsHandlerInterface {
  handle: (record: SNSEventRecord) => Promise<void>
}

const SNS_PROVIDER = 'SNS_PROVIDER'

export const SnsEvent = (topic: string) => (target) => Reflect.defineMetadata(SNS_PROVIDER, topic, target)

@Injectable()
export class SnsHandlerProvider implements OnModuleInit {
  handlers: SnsHandlerInterface[]

  constructor(
    private readonly moduleContainer: ModulesContainer,
    private readonly moduleRef: ModuleRef,
  ) {}

  async handle(snsEvent: SNSEvent): Promise<void> {
    const handler = this.handlers[0]

    await Promise.all(snsEvent.Records.map((record) => handler.handle(record)))
  }

  onModuleInit() {
    [...this.moduleContainer.values()].forEach(({ metatype }) => {
      const metadata = Reflect.getMetadata(MODULE_METADATA.PROVIDERS, metatype);

      if (!metadata) {
        return;
      }

      const providers = [
        ...metadata.filter((metatype: any) => typeof metatype === 'function'),
      ];

      providers.map(provider => {
        if (Reflect.hasOwnMetadata(SNS_PROVIDER, provider)) {
          this.handlers.push(this.moduleRef.get(provider, { strict: false }))
        }
      })
    })
  }
}
