import { IdTokenGuard, OwnershipProvider, Creds } from '@reapit/utils-nest'
import type { CredsType } from '@reapit/utils-nest'
import { PipelineProvider } from './pipeline-provider'
import { Controller, Get, UseGuards, Param, NotFoundException, Put, Body, Delete } from '@nestjs/common'
import { ParameterDto } from './parameter-dto'
import { ParameterProvider } from './parameter-provider'

@Controller('/pipeline/:pipelineId/parameter')
@UseGuards(IdTokenGuard)
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

  @Delete(':key')
  async delete(
    @Creds() creds: CredsType,
    @Param('pipelineId') pipelineId: string,
    @Param('key') key: string,
  ): Promise<void> {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw new NotFoundException()

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    const parameters = await this.paramProvider.obtainParameters(pipeline.id as string)

    delete parameters[key]

    await this.paramProvider.saveParameters(pipeline.id as string, parameters)
  }
}
