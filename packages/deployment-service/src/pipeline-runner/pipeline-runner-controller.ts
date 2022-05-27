import { CredGuard, Creds, CredsType, OwnershipProvider } from '../auth'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  UnprocessableEntityException,
  BadRequestException,
  Body,
  Query,
  Inject,
  forwardRef,
  UseGuards,
  Put,
} from '@nestjs/common'
import { PipelineRunnerProvider } from './pipeline-runner-provider'
import { PipelineProvider } from '../pipeline'
import { Pagination } from 'nestjs-typeorm-paginate'
import { EventDispatcher } from '../events'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions/deployment-schema'
import { S3Provider } from '../s3'
import { DeployProvider } from '../deployment'

@UseGuards(CredGuard)
@Controller('pipeline/:pipelineId/pipeline-runner')
export class PipelineRunnerController {
  constructor(
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
    private readonly ownershipProvider: OwnershipProvider,
    @Inject(forwardRef(() => PipelineProvider)) private readonly pipelineProvider: PipelineProvider,
    private readonly eventDispatcher: EventDispatcher,
    private readonly s3Provider: S3Provider,
    private readonly deployProvider: DeployProvider,
  ) {}

  @Get()
  async paginate(
    @Param('pipelineId') pipelineId: string,
    @Creds() creds: CredsType,
    @Query('page') page: number = 1,
  ): Promise<Pagination<PipelineRunnerEntity>> {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw new NotFoundException()

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    return this.pipelineRunnerProvider.paginate(pipeline, page)
  }

  @Get(':pipelineRunnerId')
  async index(
    @Param('pipelineRunnerId') pipelineRunnerId: string,
    @Creds() creds: CredsType,
  ): Promise<PipelineRunnerEntity> {
    const pipelineRunner = await this.pipelineRunnerProvider.findById(pipelineRunnerId)

    if (!pipelineRunner) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipelineRunner.pipeline as PipelineEntity, creds.developerId as string)

    // TODO hydrate tasks - potentially not hydrated by typeorm as previous code suggests
    return pipelineRunner
  }

  @Post()
  async create(@Param('pipelineId') pipelineId: string, @Creds() creds: CredsType): Promise<PipelineRunnerEntity> {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    if (
      pipeline.isPipelineDeploymentDisabled ||
      (await this.pipelineRunnerProvider.pipelineRunnerCountRunning(pipeline)) >= 1 ||
      pipeline.buildStatus === 'PRE_PROVISIONED'
    ) {
      throw new UnprocessableEntityException('Cannot create deployment in current state')
    }

    const pipelineRunner = await this.pipelineRunnerProvider.create({
      pipeline,
    })

    if (!pipelineRunner) {
      throw new BadRequestException('Invalid pipeline runner payload')
    }

    await this.eventDispatcher.triggerCodebuildExecutor(pipelineRunner)

    return pipelineRunner
  }

  @Put(':pipelineRunnerId')
  async update(
    @Param('pipelineRunnerId') pipelineRunnerId: string,
    @Body() dto: any,
    @Creds() creds: CredsType,
  ): Promise<PipelineRunnerEntity> {
    const pipelineRunner = await this.pipelineRunnerProvider.findById(pipelineRunnerId)

    if (!pipelineRunner || typeof pipelineRunner.pipeline === 'undefined') {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipelineRunner.pipeline, creds.developerId as string)

    if (pipelineRunner.buildStatus !== 'IN_PROGRESS') {
      return pipelineRunner
    }

    return this.pipelineRunnerProvider.update(pipelineRunner, dto)
  }

  @Post('release/:version')
  async release(
    @Param('pipelineId') pipelineId: string,
    @Param('version') version: string,
    @Creds() creds: CredsType,
    @Body() body,
  ) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    if (pipeline.buildStatus !== 'PRE_PROVISIONED') {
      throw new UnprocessableEntityException('Cannot deploy pipeline in PRE_PROVISONED state')
    }

    const file = Buffer.from(body.file, 'base64')

    if (!file) {
      throw new BadRequestException('File not provided')
    }

    const pipelineRunner = await this.pipelineRunnerProvider.create({
      pipeline,
      type: PipelineRunnerType.RELEASE,
      buildVersion: version,
    })

    await this.s3Provider.upload({
      Body: file,
      Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
      Key: `pipeline/${pipelineRunner.S3Location}`,
    })

    try {
      await Promise.all([
        this.deployProvider.deployFromStore({
          pipeline: pipelineRunner.pipeline as PipelineEntity,
          pipelineRunner,
        }),
        this.pipelineRunnerProvider.resetCurrentlyDeployed(pipelineRunner.pipeline as PipelineEntity),
      ])

      pipelineRunner.currentlyDeployed = true
      pipelineRunner.buildStatus = 'COMPLETED'

      return this.pipelineRunnerProvider.save(pipelineRunner)
    } catch (e) {
      pipelineRunner.buildStatus = 'FAILED'

      return this.pipelineRunnerProvider.save(pipelineRunner)
    }
  }

  @Post(':pipelineRunnerId/deploy')
  async deploy(@Param('pipelineRunnerId') pipelineRunnerId: string, @Creds() creds: CredsType) {
    const pipelineRunner = await this.pipelineRunnerProvider.findById(pipelineRunnerId, {
      relations: ['pipeline'],
    })

    if (!pipelineRunner) {
      throw new NotFoundException(`version [${pipelineRunnerId}] did not previously exist`)
    }

    this.ownershipProvider.check(pipelineRunner.pipeline as PipelineEntity, creds.developerId as string)

    await Promise.all([
      this.deployProvider.deployFromStore({
        pipeline: pipelineRunner.pipeline as PipelineEntity,
        pipelineRunner,
      }),
      this.pipelineRunnerProvider.resetCurrentlyDeployed(pipelineRunner.pipeline as PipelineEntity),
    ])

    pipelineRunner.currentlyDeployed = true

    return this.pipelineRunnerProvider.save(pipelineRunner)
  }
}
