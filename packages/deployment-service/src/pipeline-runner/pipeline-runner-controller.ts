import { AuthenticatedRequest, OwnershipProvider } from '../auth'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import {
  Controller,
  Get,
  Param,
  Req,
  NotFoundException,
  Post,
  UnprocessableEntityException,
  BadRequestException,
  Body,
  Query,
  Inject,
  forwardRef,
} from '@nestjs/common'
import { PipelineRunnerProvider } from './pipeline-runner-provider'
import { PipelineProvider } from '../pipeline'
import { Pagination } from 'nestjs-typeorm-paginate'
import { EventDispatcher } from '../events'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions/deployment-schema'
import { S3Provider } from '../s3'
import { DeployProvider } from '../deployment'

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
    @Req() request: AuthenticatedRequest,
    @Query('page') page: number = 1,
  ): Promise<Pagination<PipelineRunnerEntity>> {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw new NotFoundException()

    this.ownershipProvider.check(pipeline, request.user.developerId as string)

    return this.pipelineRunnerProvider.paginate(pipeline, page)
  }

  @Get(':pipelineRunnerId')
  async index(
    @Param('pipelineRunnerId') pipelineRunnerId: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<PipelineRunnerEntity> {
    const pipelineRunner = await this.pipelineRunnerProvider.findById(pipelineRunnerId)

    if (!pipelineRunner) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipelineRunner.pipeline as PipelineEntity, request.user.developerId as string)

    return pipelineRunner
  }

  @Post()
  async create(
    @Param('pipelineId') pipelineId: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<PipelineRunnerEntity> {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, request.user.developerId as string)

    if (
      pipeline.isPipelineDeploymentDisabled ||
      (await this.pipelineRunnerProvider.pipelineRunnerCountRunning(pipeline)) >= 1
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

  @Post(':pipelineRunnerId')
  async update(
    @Param('pipelineRunnerId') pipelineRunnerId: string,
    @Body() dto: any,
    @Req() request: AuthenticatedRequest,
  ): Promise<PipelineRunnerEntity> {
    const pipelineRunner = await this.pipelineRunnerProvider.findById(pipelineRunnerId)

    if (!pipelineRunner || typeof pipelineRunner.pipeline === 'undefined') {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipelineRunner.pipeline, request.user.developerId as string)

    if (pipelineRunner.buildStatus !== 'IN_PROGRESS') {
      return pipelineRunner
    }

    return this.pipelineRunnerProvider.update(pipelineRunner, dto)
  }

  // TODO path changed from: release/{pipelineId}/{version}
  @Post('release/:version')
  async release(
    @Param('pipelineId') pipelineId: string,
    @Param('version') version: string,
    @Req() request: AuthenticatedRequest,
    @Body() body,
  ) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, request.user.developerId as string)

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

  // TODO changed url from: api/release/{pipelineId}/{version}
  @Post(':pipelineRunnerId/deploy')
  async deploy(@Param('pipelineRunnerId') pipelineRunnerId: string, @Req() request: AuthenticatedRequest) {
    const pipelineRunner = await this.pipelineRunnerProvider.findById(pipelineRunnerId, {
      relations: ['pipeline'],
    })

    if (!pipelineRunner) {
      throw new NotFoundException(`version [${pipelineRunnerId}] did not previously exist`)
    }

    this.ownershipProvider.check(pipelineRunner.pipeline as PipelineEntity, request.user.developerId as string)

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
