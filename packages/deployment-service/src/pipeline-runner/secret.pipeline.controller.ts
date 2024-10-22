import { Controller, Get, Inject, NotFoundException, Param, Post, forwardRef } from '@nestjs/common'
import { PipelineProvider } from '../pipeline/pipeline-provider'
import { EventDispatcher } from '../events'
import { PipelineRunnerProvider } from './pipeline-runner-provider'

@Controller('secret')
export class SecretPipelineController {
  constructor(
    @Inject(forwardRef(() => PipelineProvider)) private readonly pipelineProvider: PipelineProvider,
    private readonly eventDispatcher: EventDispatcher,
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
  ) {}

  @Get('developerId/:developerId')
  async findByDeveloper(@Param('developerId') developerId: string) {
    const pipelines = await this.pipelineProvider.findByDeveloperId(developerId)

    return pipelines
  }

  @Get('subdomain/:subdomain')
  async findBySubdomain(@Param('subdomain') subdomain: string) {
    const pipeline = await this.pipelineProvider.findBySubDomain(subdomain)

    if (!pipeline) throw NotFoundException

    return pipeline
  }

  // app / pipelineid
  @Get(':pipelineId')
  async findById(@Param('pipelineId') pipelineId: string) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw NotFoundException

    return pipeline
  }

  @Post('provision/:pipelineId')
  async startProvisioning(@Param('pipelineId') pipelineId: string) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw new NotFoundException()

    const updatedPipeline = await this.pipelineProvider.update(pipeline, {
      buildStatus: 'PROVISION_REQUEST',
    })

    await this.eventDispatcher.triggerPipelineSetup(updatedPipeline)

    return updatedPipeline
  }

  @Post('deploy/:pipelineId')
  async startDeployment(@Param('pipelineId') pipelineId: string) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw new NotFoundException()

    const pipelineRunner = await this.pipelineRunnerProvider.create({
      pipeline,
    })

    await this.eventDispatcher.triggerCodebuildExecutor(pipelineRunner)

    return pipelineRunner
  }
}
