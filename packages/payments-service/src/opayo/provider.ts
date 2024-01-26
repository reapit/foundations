/* istanbul ignore file */
import { BadRequestException, Injectable } from '@nestjs/common'
import axios from 'axios'
import { Opayo3DSecureDto, OpayoPrivateHeaders, TransactionDto } from './dto'
import { MerchantKey, OpayoCreds, Transaction } from '../types/opayo'
import { getConfig } from '../client-config/config'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { ClientConfigModel } from '../client-config/model'

export const OPAYO_URLS = {
  TRANSACTIONS: '/transactions',
  MERCHANT_KEY_API: '/merchant-session-keys',
}

export const OPAYO_API_URLS = {
  TEST: 'https://sandbox.opayo.eu.elavon.com/api/v1',
  LIVE: 'https://live.opayo.eu.elavon.com/api/v1',
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

  async createTransaction(
    opayoHeaders: OpayoPrivateHeaders,
    transaction: TransactionDto,
    ip: string,
  ): Promise<Transaction> {
    const clientCode = opayoHeaders['reapit-customer']

    if (!clientCode) throw new BadRequestException('No client code supplied')

    const { encodedKeys, opayoUrl } = await this.getOpayoCreds(clientCode)

    const body = {
      ...transaction,
      strongCustomerAuthentication: {
        ...transaction.strongCustomerAuthentication,
        browserIP: String(ip),
      },
    }

    try {
      const res = await axios.post<Transaction>(`${opayoUrl}${OPAYO_URLS.TRANSACTIONS}`, body, {
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

  async transactionNotify(notification: Opayo3DSecureDto): Promise<string> {
    const { cres, threeDSSessionData } = notification
    const [clientCode, transactionId] = Buffer.from(threeDSSessionData, 'base64').toString().split(':')

    try {
      if (!clientCode) throw new BadRequestException('No client code supplied')
      if (!transactionId) throw new BadRequestException('No transaction id supplied')
      if (!cres) throw new BadRequestException('No cres supplied')

      const { encodedKeys, opayoUrl } = await this.getOpayoCreds(clientCode)

      const body = {
        cRes: cres,
      }

      const res = await axios.post<Transaction>(
        `${opayoUrl}${OPAYO_URLS.TRANSACTIONS}/${transactionId}/3d-secure-challenge`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedKeys}`,
          },
        },
      )

      const message = res.data.status === 'Ok' ? 'success' : 'failure'

      return `<script>window.top.postMessage('${message}', '*')</script>`
    } catch (e) {
      return "<script>window.top.postMessage('failure', '*')</script>"
    }
  }
}
