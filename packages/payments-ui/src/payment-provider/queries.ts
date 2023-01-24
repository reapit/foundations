import { logger } from '@reapit/utils-react'
import { ClientConfigModel } from '../types/config'
import { CreateTransactionModel, MerchantKey, Transaction } from '../types/opayo'
import { genPaymentsHeaders } from './utils'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSnack } from '@reapit/elements'
import axios, { AxiosError } from 'axios'

export const OPAYO_API_URL = 'https://pi-test.sagepay.com/api/v1'

export const OPAYO_URLS = {
  TRANSACTIONS: '/transactions',
  MERCHANT_KEY_API: '/merchant-session-keys',
}

export const useTransaction = (config: ClientConfigModel | null) => {
  const { error } = useSnack()

  const url = `${OPAYO_API_URL}${OPAYO_URLS.TRANSACTIONS}`

  const { mutateAsync } = useMutation([url, config], {
    mutationFn: async (transaction: CreateTransactionModel) => {
      if (!config) throw new Error('No client config available')

      const res = await axios.post<Transaction>(url, transaction, {
        headers: genPaymentsHeaders(config),
      })

      return res.data
    },
    onError: (err: AxiosError<any>) => {
      logger(err)
      error(err.message)
    },
  })

  const transactionSubmit = async (transaction: CreateTransactionModel) => await mutateAsync(transaction)

  return {
    transactionSubmit,
  }
}

export const useMerchantKey = (config: ClientConfigModel | null) => {
  const { error } = useSnack()

  const url = `${OPAYO_API_URL}${OPAYO_URLS.MERCHANT_KEY_API}`

  const vendorName = config?.vendorName

  const { data, isLoading } = useQuery([url, config], {
    queryFn: async () => {
      if (!config) throw new Error('No client config available')

      const res = await axios.post<MerchantKey>(url, { vendorName }, { headers: genPaymentsHeaders(config) })

      return res.data
    },
    onError: (err: AxiosError<any>) => {
      logger(err)
      error(err.message)
    },
    enabled: Boolean(config && vendorName),
  })

  return {
    merchantKey: data ?? null,
    merchantKeyLoading: isLoading,
  }
}
