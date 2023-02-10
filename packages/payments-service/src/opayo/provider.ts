import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import { OpayoPrivateHeaders, TransactionDto } from './dto'
import { MerchantKey, OpayoCreds, Transaction } from '../types/opayo'
import { getConfig } from '../client-config/config'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { ClientConfigModel } from '../client-config/model'

export const OPAYO_URLS = {
  TRANSACTIONS: '/transactions',
  MERCHANT_KEY_API: '/merchant-session-keys',
}

export const OPAYO_API_URLS = {
  TEST: 'https://pi-test.sagepay.com/api/v1',
  LIVE: 'https://pi-live.sagepay.com/api/v1',
}

@Injectable()
export class OpayoProvider {
  constructor(private readonly datamapper: DataMapper) {}

  async getOpayoCreds(clientCode: string) {
    const clientConfig = await this.datamapper.get(Object.assign(new ClientConfigModel(), { clientCode }))
    const { configId } = clientConfig

    if (!configId) throw new BadRequestException('No opayo config id found for this client')

    const opayoConfig = await getConfig(clientCode, configId)

    if (!opayoConfig) throw new BadRequestException('No opayo config found for this client')
    if (!clientConfig) throw new BadRequestException('No client config found for this client')

    const { isLive } = clientConfig
    const { vendorName, integrationKey, passKey } = JSON.parse(opayoConfig.SecretString) as OpayoCreds
    const keys = `${integrationKey}:${passKey}`
    const encodedKeys = Buffer.from(keys).toString('base64')
    const opayoUrl = isLive ? OPAYO_API_URLS.LIVE : OPAYO_API_URLS.TEST

    return {
      vendorName,
      encodedKeys,
      opayoUrl,
    }
  }

  async createTransaction(opayoHeaders: OpayoPrivateHeaders, transaction: TransactionDto): Promise<Transaction> {
    const clientCode = opayoHeaders['reapit-customer']

    if (!clientCode) throw new BadRequestException('No client code supplied')

    const { encodedKeys, opayoUrl } = await this.getOpayoCreds(clientCode)

    try {
      const res = await axios.post<Transaction>(`${opayoUrl}${OPAYO_URLS.TRANSACTIONS}`, transaction, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${encodedKeys}`,
        },
      })

      return res.data
    } catch (e) {
      throw new BadRequestException(`Failed to create transaction ${e}`)
    }
  }

  async createMerchantKeys(opayoHeaders: OpayoPrivateHeaders): Promise<MerchantKey> {
    const clientCode = opayoHeaders['reapit-customer']

    if (!clientCode) throw new BadRequestException('No client code supplied')

    const { vendorName, encodedKeys, opayoUrl } = await this.getOpayoCreds(clientCode)

    try {
      const res = await axios.post<MerchantKey>(
        `${opayoUrl}${OPAYO_URLS.MERCHANT_KEY_API}`,
        { vendorName },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedKeys}`,
          },
        },
      )

      return res.data
    } catch (e) {
      throw new BadRequestException(`Failed to fetch merchant keys ${e}`)
    }
  }
}
