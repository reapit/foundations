import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Req,
  Query,
  Post,
  Body,
  BadRequestException,
  Delete,
  UnprocessableEntityException,
} from '@nestjs/common'
import { OwnershipProvider, AuthenticatedRequest } from '../auth'
import { PipelineProvider } from './pipeline-provider'
import { PipelineDto } from '../dto'
import { PipelineEntity } from '../entities/pipeline.entity'
import { Pagination } from 'nestjs-typeorm-paginate'
import { PusherProvider } from '../events'

@Controller('pipeline')
export class PipelineController {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly pusherProvider: PusherProvider,
  ) {}

  @Get('/:id')
  async index(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    const pipeline = await this.pipelineProvider.findById(id)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, request.user.developerId as string)

    return pipeline
  }

  @Get()
  async paginate(
    @Query('page') page: number = 1,
    @Req() request: AuthenticatedRequest,
  ): Promise<Pagination<PipelineEntity>> {
    return this.pipelineProvider.paginate(page, request.user.developerId as string)
  }

  // TODO implement valdation pipe globally
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
      await this.pipelineProvider.triggerPipelineSetup(pipeline)
    } else {
      await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
        ...pipeline,
        message: 'Pipeline successfully created',
      })
    }

    return pipeline
  }

  // TODO requires validation pipe
  @Post(':id')
  async edit(
    id: string,
    @Req() request: AuthenticatedRequest,
    @Body() dto: PipelineDto,
  ): Promise<PipelineEntity | never> {
    let setupInfra = false

    const pipeline = await this.pipelineProvider.findById(id)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, request.user.developerId as string)

    if (
      ['PRE_PROVISIONED', 'FAILED_TO_PROVISION'].includes(pipeline.buildStatus as string) &&
      dto.buildStatus === 'PROVISION_REQUEST'
    ) {
      setupInfra = true
    }

    const updatedPipeline = await this.pipelineProvider.update(pipeline, dto)

    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', updatedPipeline)

    if (setupInfra) {
      await this.pipelineProvider.triggerPipelineSetup(updatedPipeline)
    }

    return updatedPipeline
  }

  @Delete(':id')
  async deletePipeline(id: string, @Req() request: AuthenticatedRequest): Promise<PipelineEntity> {
    const pipeline = await this.pipelineProvider.findById(id)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, request.user.developerId as string)

    if (!pipeline.isPipelineDeletable) {
      throw new UnprocessableEntityException('Cannot delete pipeline in current build status')
    }

    const updatedPipeline = await this.pipelineProvider.update(pipeline, {
      buildStatus: 'DELETING',
    })

    await Promise.all([
      this.pusherProvider.trigger(`private-${pipeline?.developerId}`, 'pipeline-delete', updatedPipeline),
      this.pipelineProvider.triggerPipelineTearDown(pipeline),
    ])

    return updatedPipeline
  }
}
