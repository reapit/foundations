import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Query,
  Post,
  Body,
  BadRequestException,
  Delete,
  UnprocessableEntityException,
  UseGuards,
  Put,
} from '@nestjs/common'
import { PipelineProvider } from './pipeline-provider'
import { PipelineDto } from './pipeline-dto'
import { PipelineEntity } from '../entities/pipeline.entity'
import { Pagination } from 'nestjs-typeorm-paginate'
import { EventDispatcher, PusherProvider } from '../events'
import { IdTokenGuard, Creds, isReadonlyAdmin, OwnershipProvider } from '@reapit/utils-nest'
import type { CredsType } from '@reapit/utils-nest'
import { RepositoryProvider } from './repository.provider'

@UseGuards(IdTokenGuard)
@Controller('pipeline')
export class PipelineController {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly pusherProvider: PusherProvider,
    private readonly eventDispatcher: EventDispatcher,
    private readonly repositoryProvider: RepositoryProvider,
  ) {}

  @Get('/:id')
  async index(@Param('id') id: string, @Creds() creds: CredsType) {
    const pipeline = await this.pipelineProvider.findById(id)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    console.log('pipeline', pipeline)

    return pipeline
  }

  @Get()
  async paginate(
    @Creds() creds: CredsType,
    @Query('developerId') developerId?: string,
    @Query('page') page: number = 1,
  ): Promise<Pagination<PipelineEntity>> {
    if (isReadonlyAdmin(creds)) {
      if (developerId) {
        return this.pipelineProvider.paginate(page, developerId)
      }
      return this.pipelineProvider.paginate(page)
    }

    return this.pipelineProvider.paginate(page, creds.developerId as string)
  }

  @Post()
  async create(@Body() dto: PipelineDto, @Creds() creds: CredsType): Promise<PipelineEntity> {
    const previousPipeline = await this.pipelineProvider.findById(dto.appId as string)

    const repository = dto.repository?.repositoryUrl
      ? await this.repositoryProvider.findOrCreate(dto.repository, creds.developerId as string)
      : undefined

    const pipeline = await this.pipelineProvider.create({
      ...previousPipeline,
      ...dto,
      developerId: creds.developerId as string,
      // required for current DB but currently we don't need this value
      clientId: creds.type === 'jwt' ? (creds.clientId as string) : '',
      buildStatus: previousPipeline ? 'READY_FOR_DEPLOYMENT' : undefined,
      // Temp plug, singular appId/clientId for pipeline - later requires multiple pipelines
      id: dto.appId,
      repository,
    })

    if (!pipeline) {
      throw new BadRequestException('Invalid pipeline properties')
    }

    if (
      !previousPipeline ||
      (previousPipeline.buildStatus && ['PRE_PROVISIONED', 'CREATED'].includes(previousPipeline.buildStatus))
    ) {
      await this.eventDispatcher.triggerPipelineSetup(pipeline)
    } else {
      await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
        ...pipeline,
        message: 'Pipeline successfully created',
      })
    }

    return pipeline
  }

  @Put('/:id')
  async edit(
    @Param('id') id: string,
    @Creds() creds: CredsType,
    @Body() dto: PipelineDto,
  ): Promise<PipelineEntity | never> {
    let setupInfra = false

    const pipeline = await this.pipelineProvider.findById(id)

    if (!pipeline || !id) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    if (
      ['PRE_PROVISIONED', 'FAILED_TO_PROVISION'].includes(pipeline.buildStatus as string) &&
      dto.buildStatus === 'PROVISION_REQUEST'
    ) {
      setupInfra = true
    }

    console.log('dto repository', dto.repository)

    const repository = dto.repository?.repositoryUrl
      ? await this.repositoryProvider.findOrCreate(
          {
            ...dto.repository,
          },
          creds.developerId as string,
        )
      : undefined

    console.log('repository', repository)

    const updatedPipeline = await this.pipelineProvider.update(pipeline, {
      ...dto,
      repository,
    })

    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
      message: 'updating pipeline',
      ...updatedPipeline,
    })

    if (setupInfra) {
      await this.eventDispatcher.triggerPipelineSetup(updatedPipeline)
    }

    return updatedPipeline
  }

  @Delete('/:id')
  async deletePipeline(@Param('id') id: string, @Creds() creds: CredsType): Promise<PipelineEntity> {
    const pipeline = await this.pipelineProvider.findById(id)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    if (!pipeline.isPipelineDeletable) {
      throw new UnprocessableEntityException('Cannot delete pipeline in current build status')
    }

    const updatedPipeline = await this.pipelineProvider.update(pipeline, {
      buildStatus: 'DELETION_REQUEST',
    })

    await Promise.all([
      this.pusherProvider.trigger(`private-${pipeline?.developerId}`, 'pipeline-update', updatedPipeline),
      this.eventDispatcher.triggerPipelineTearDownStart(pipeline),
    ])

    return updatedPipeline
  }
}
