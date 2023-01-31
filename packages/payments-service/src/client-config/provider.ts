import { DataMapper } from '@aws/dynamodb-data-mapper'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
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

  async create(clientCode: string, configModel: Partial<ClientConfigModel>): Promise<ClientConfigModel> {
    try {
      return await this.datamapper.put(Object.assign(new ClientConfigModel(), { ...configModel, clientCode }))
    } catch (err) {
      throw new BadRequestException(`Config item failed to create: ${err.message}`)
    }
  }

  async update(clientCode: string, configModel: Partial<ClientConfigModel>): Promise<ClientConfigModel> {
    try {
      return await this.datamapper.update(Object.assign(new ClientConfigModel(), { ...configModel, clientCode }))
    } catch (err) {
      throw new BadRequestException(`Config item failed to update: ${err.message}`)
    }
  }

  async delete(clientCode: string) {
    try {
      return await this.datamapper.delete(Object.assign(new ClientConfigModel(), { clientCode }))
    } catch (err) {
      throw new BadRequestException(`Config item failed to delete: ${err.message}`)
    }
  }
}
