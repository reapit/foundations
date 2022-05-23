import { CredGuard, OwnershipProvider, Creds, CredsType } from '../auth'
import { PipelineProvider } from '../pipeline'
import { Controller, Get, UseGuards, Param, NotFoundException, Post, Body } from '@nestjs/common'
import { SSM } from 'aws-sdk'
import { ParameterDto } from '../dto'

@Controller('/pipeline/:pipelineId/parameter')
@UseGuards(CredGuard)
export class KeyController {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly parameterStoreClient: SSM,
  ) {}

  @Get()
  async parameterKeys(@Param('pipelineId') pipelineId: string, @Creds() creds: CredsType) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    const parameters = await new Promise<Record<string, any>>((resolve, reject) =>
      this.parameterStoreClient.getParameter(
        {
          Name: `cloud-${pipeline.id}`,
          WithDecryption: true,
        },
        (err, data) => {
          if (err && err.code !== 'ParameterNotFound') reject(err)
          resolve(data && data.Parameter && data.Parameter.Value ? JSON.parse(data.Parameter.Value) : {})
        },
      ),
    )

    return Object.keys(parameters)
  }

  @Post()
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

    const parameters = await new Promise<Record<string, any>>((resolve, reject) =>
      this.parameterStoreClient.getParameter(
        {
          Name: `cloud-${pipeline.id}`,
          WithDecryption: true,
        },
        (err, data) => {
          if (err && err.code !== 'ParameterNotFound') reject(err)
          resolve(data && data.Parameter && data.Parameter.Value ? JSON.parse(data.Parameter.Value) : {})
        },
      ),
    )

    parameters[parameterDto.key] = parameterDto.value

    await new Promise<void>((resolve, reject) =>
      this.parameterStoreClient.putParameter(
        {
          Name: `cloud-${pipeline.id}`,
          Overwrite: true,
          Type: 'SecureString',
          Value: JSON.stringify(parameters),
        },
        (err) => {
          if (err) reject()
          resolve()
        },
      ),
    )
  }
}
