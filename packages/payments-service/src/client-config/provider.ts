import { DataMapper } from '@aws/dynamodb-data-mapper'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { createConfig, deleteConfig, updateConfig } from './config'
import { ClientConfigDto } from './dto'
import { ClientConfigModel } from './model'

@Injectable()
export class ClientConfigProvider {
  constructor(private readonly datamapper: DataMapper) {}

  async get(clientCode: string): Promise<ClientConfigModel> {
    try {
      return await this.datamapper.get(Object.assign(new ClientConfigModel(), { clientCode }))
    } catch (err) {
      throw new NotFoundException(`No config item found for this client code: ${err.message}`)
    }
  }

  async create(clientCode: string, configDto: ClientConfigDto): Promise<ClientConfigModel> {
    try {
      const { companyName, logoUri, isLive } = configDto
      const configId = await createConfig(configDto)
      const configIdModel = configId ? { configId } : {}
      const configModel = {
        clientCode,
        companyName,
        logoUri,
        isLive,
        isConfigured: Boolean(configId && companyName && logoUri),
      }
      return await this.datamapper.put(Object.assign(new ClientConfigModel(), { ...configModel, ...configIdModel }))
    } catch (err) {
      throw new BadRequestException(`Config item failed to create: ${err.message}`)
    }
  }

  async update(clientCode: string, configDto: ClientConfigDto): Promise<ClientConfigModel> {
    try {
      const { companyName, logoUri, isLive } = configDto
      const configId = configDto.configId ? await updateConfig(configDto) : await createConfig(configDto)
      const configIdModel = configId ? { configId } : {}
      const configModel = {
        clientCode,
        companyName,
        logoUri,
        isLive,
        isConfigured: Boolean(configId && companyName && logoUri),
      }
      return await this.datamapper.update(Object.assign(new ClientConfigModel(), { ...configModel, ...configIdModel }))
    } catch (err) {
      throw new BadRequestException(`Config item failed to update: ${err.message}`)
    }
  }

  async delete(clientCode: string, configId?: string) {
    try {
      await deleteConfig(clientCode, configId)
      return await this.datamapper.delete(Object.assign(new ClientConfigModel(), { clientCode }))
    } catch (err) {
      throw new BadRequestException(`Config item failed to delete: ${err.message}`)
    }
  }
}
