import { QueueNamesEnum } from '../constants'
import { AppTypeEnum } from '../pipeline/pipeline-dto'
import { PipelineProvider } from '../pipeline'
import { AbstractWorkflow, EventDispatcher, SqsProvider, Workflow } from '../events'
import { MarketplaceProvider } from '../marketplace'

type AppEventType = {
  AppId: string
  Type: 'updated' | 'deleted' | 'created'
  TimeStamp: string
  ApplicationName: string
  AuthFlow: string
  DeveloperId: string
}

@Workflow(QueueNamesEnum.APP_EVENTS)
export class AppEventWorkflow extends AbstractWorkflow<AppEventType> {
  constructor(
    private readonly eventDispatcher: EventDispatcher,
    private readonly pipelineProvider: PipelineProvider,
    private readonly marketplaceProvider: MarketplaceProvider,
    sqsProvider: SqsProvider,
  ) {
    super(sqsProvider)
  }

  async execute(payload: AppEventType): Promise<void> {
    switch (payload.Type) {
      case 'created': {
        await this.pipelineProvider.create({
          buildStatus: 'PRE_PROVISIONED',
          appId: payload.AppId,
          id: payload.AppId,
          name: payload.ApplicationName,
          appType: payload.AuthFlow === 'authorisationCode' ? AppTypeEnum.REACT : AppTypeEnum.NODE,
          developerId: payload.DeveloperId,
        })

        const pipeline = await this.pipelineProvider.findById(payload.AppId)

        if (!pipeline) throw new Error('Will never get here')

        await this.marketplaceProvider.updateAppUrls(
          payload.AppId,
          `https://${pipeline.subDomain}${process.env.NODE_ENV === 'production' ? '' : '.dev'}.iaas.reapit.cloud`,
          payload.DeveloperId,
          payload.ApplicationName,
        )

        break
      }
      case 'deleted': {
        const pipelines = await this.pipelineProvider.findByAppId(payload.AppId)

        if (!pipelines || pipelines.length === 0) return
        await Promise.all(pipelines.map((pipeline) => this.eventDispatcher.triggerPipelineTearDownStart(pipeline)))
        await this.pipelineProvider.saveAll(
          pipelines.map((pipeline) => {
            pipeline.buildStatus = 'DELETION_REQUEST'

            return pipeline
          }),
        )
        break
      }
      default:
        console.log(`unsupported event type [${payload.Type}] for AppId [${payload.AppId}]`)
    }

    await this.deleteMessage()
  }
}
