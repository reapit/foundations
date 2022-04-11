import { AuthenticatedRequest, OwnershipProvider } from '@/auth'
import { PipelineRunnerEntity } from '@/entities/pipeline-runner.entity'
import { PipelineEntity } from '@/entities/pipeline.entity'
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
} from '@nestjs/common'
import { PipelineRunnerProvider } from './pipeline-runner-provider'
import { PipelineProvider } from '../pipeline'
import { Pagination } from 'nestjs-typeorm-paginate'

@Controller('pipeline/:pipelineId/pipeline-runner')
export class PipelineRunnerController {
  constructor(
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly pipelineProvider: PipelineProvider,
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

    await this.pipelineRunnerProvider.triggerCodebuildExecutor(pipelineRunner)

    return pipelineRunner
  }

  // TODO implement global validationPipe
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
}
