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
import { OwnershipProvider } from '../auth'
import { PipelineProvider } from './pipeline-provider'
import { PipelineDto } from './pipeline-dto'
import { PipelineEntity } from '../entities/pipeline.entity'
import { Pagination } from 'nestjs-typeorm-paginate'
import { EventDispatcher, PusherProvider } from '../events'
import { CredGuard, Creds, CredsType } from '../auth'

@UseGuards(CredGuard)
@Controller('pipeline')
export class PipelineController {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly pusherProvider: PusherProvider,
    private readonly eventDispatcher: EventDispatcher,
  ) {}

  @Get('/:id')
  async index(@Param('id') id: string, @Creds() creds: CredsType) {
    const pipeline = await this.pipelineProvider.findById(id)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    return pipeline
  }

  @Get()
  async paginate(@Query('page') page: number = 1, @Creds() creds: CredsType): Promise<Pagination<PipelineEntity>> {
    return this.pipelineProvider.paginate(page, creds.developerId as string)
  }

  @Post()
  async create(@Body() dto: PipelineDto): Promise<PipelineEntity> {
    const previousPipeline = await this.pipelineProvider.findById(dto.appId as string)

    const pipeline = await this.pipelineProvider.create({
      ...dto,
      ...previousPipeline,
      buildStatus: previousPipeline ? 'READY_FOR_DEPLOYMENT' : undefined,
      // Temp plug, singular appId/clientId for pipeline - later requires multiple pipelines
      id: dto.appId,
    })

    if (!pipeline) {
      throw new BadRequestException('Invalid pipeline properties')
    }

    if (!previousPipeline) {
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

    const updatedPipeline = await this.pipelineProvider.update(pipeline, dto)

    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
      message: 'updating pipeline',
      updatedPipeline,
      pipeline,
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
      buildStatus: 'DELETING',
    })

    await Promise.all([
      this.pusherProvider.trigger(`private-${pipeline?.developerId}`, 'pipeline-delete', updatedPipeline),
      this.eventDispatcher.triggerPipelineTearDownStart(pipeline),
    ])

    return updatedPipeline
  }
}
