import { CredGuard, OwnershipProvider, Creds, CredsType } from '../auth'
import { PipelineProvider } from '../pipeline'
import { Controller, Get, UseGuards, Param, NotFoundException, Put, Body } from '@nestjs/common'
import { ParameterDto } from '../dto'
import { ParameterProvider } from './parameter-provider'

@Controller('/pipeline/:pipelineId/parameter')
@UseGuards(CredGuard)
export class ParameterController {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly paramProvider: ParameterProvider,
  ) {}

  @Get()
  async parameterKeys(@Param('pipelineId') pipelineId: string, @Creds() creds: CredsType) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    const parameters = await this.paramProvider.obtainParameters(pipeline.id as string)

    return Object.keys(parameters)
  }

  @Put()
  async upsert(
    @Body() parameterDto: ParameterDto,
    @Creds() creds: CredsType,
    @Param('pipelineId') pipelineId: string,
  ): Promise<void> {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    const parameters = await this.paramProvider.obtainParameters(pipeline.id as string)

    parameters[parameterDto.key] = parameterDto.value

    await this.paramProvider.saveParameters(pipeline.id as string, parameters)
  }
}
