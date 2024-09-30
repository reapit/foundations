import { logger } from '@reapit/utils-react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSnack } from '@reapit/elements'
import axios, { AxiosError } from 'axios'
import {
  ClientConfigModel,
  CreateTransactionModel,
  MerchantKey,
  PaymentEmailReceipt,
  PaymentWithPropertyModel,
  ThreeDSecureResponse,
  UpdateStatusBody,
} from '@reapit/payments-ui'
import { Payments } from '@reapit/foundations-ts-definitions'

export const useClientConfig = (session: string | null, clientCode: string | null, paymentId?: string) => {
  const url = `${process.env.paymentsApiUrl}/config/public/${paymentId}`

  const { data, error: configError } = useQuery([url, clientCode, session], {
    queryFn: async () => {
      const res = await axios.get<ClientConfigModel>(url, {
        headers: {
          'reapit-session': session as string,
          'reapit-customer': clientCode as string,
          'reapit-app-id': process.env.appId,
          'X-Api-Key': process.env.apiKey,
        },
      })

      return res.data
    },
    refetchOnWindowFocus: false,
    onError: (err: AxiosError<any>) => {
      logger(err)
    },
    enabled: Boolean(clientCode && session),
  })

  return {
    config: data ?? null,
    configError,
  }
}

export const usePayment = (session: string | null, clientCode: string | null, paymentId?: string) => {
  const url = `${process.env.paymentsApiUrl}/payments/${paymentId}`

  const { data, isLoading, refetch } = useQuery([url, clientCode, session, paymentId], {
    queryFn: async () => {
      const res = await axios.get<PaymentWithPropertyModel>(url, {
        headers: {
          'reapit-session': session as string,
          'reapit-customer': clientCode as string,
          'reapit-app-id': process.env.appId,
          'api-version': 'latest',
          'X-Api-Key': process.env.apiKey,
        },
      })

      return res.data
    },
    refetchOnWindowFocus: false,
    onError: (err: AxiosError<any>) => {
      logger(err)
    },
    enabled: Boolean(clientCode && session && paymentId),
  })

  return {
    payment: data ?? null,
    paymentLoading: isLoading,
    refreshPayment: refetch,
  }
}

export const useReceipt = (session: string | null, clientCode: string | null, paymentId?: string) => {
  const { error, success } = useSnack()

  const url = `${process.env.paymentsApiUrl}/receipt/public/${paymentId}`

  const { mutateAsync, isLoading } = useMutation([url, clientCode, session, paymentId], {
    mutationFn: async (receipt: PaymentEmailReceipt) => {
      if (!clientCode || !session || !paymentId) throw new Error('No client config available')

      const res = await axios.post<PaymentEmailReceipt>(url, receipt, {
        headers: {
          'reapit-session': session as string,
          'reapit-customer': clientCode as string,
          'reapit-app-id': process.env.appId,
          'X-Api-Key': process.env.apiKey,
        },
      })

      return Boolean(res.data)
    },
    onSuccess: () => {
      success('Successfully sent receipt')
    },
    onError: (err: AxiosError<any>) => {
      logger(err)
      error(err?.response?.data?.message ?? err?.message)
    },
  })

  const receiptSubmit = async (receipt: PaymentEmailReceipt) => await mutateAsync(receipt)

  return {
    receiptLoading: isLoading,
    receiptSubmit,
  }
}

export const useStatusUpdate = (
  session: string | null,
  clientCode: string | null,
  payment: Payments.PaymentModel | null,
) => {
  const { error } = useSnack()

  const paymentId = payment?.id
  const eTag = payment?._eTag

  const url = `${process.env.paymentsApiUrl}/payments/${paymentId}`

  const { mutateAsync, isLoading } = useMutation([url, clientCode, session, payment], {
    mutationFn: async (receipt: UpdateStatusBody) => {
      if (!clientCode || !session || !paymentId) throw new Error('No client config available')

      const res = await axios.patch<UpdateStatusBody>(url, receipt, {
        headers: {
          'reapit-session': session as string,
          'reapit-customer': clientCode as string,
          'reapit-app-id': process.env.appId,
          'If-Match': eTag as string,
          'api-version': 'latest',
          'X-Api-Key': process.env.apiKey,
        },
      })

      return Boolean(res.data)
    },
    onError: (err: AxiosError<any>) => {
      logger(err)
      error(err?.response?.data?.message ?? err?.message)
    },
  })

  const statusSubmit = async (status: UpdateStatusBody) => await mutateAsync(status)

  return {
    statusLoading: isLoading,
    statusSubmit,
  }
}

export const useTransaction = (session: string | null, clientCode: string | null, paymentId?: string | null) => {
  const url = `${process.env.paymentsApiUrl}/opayo/public/transactions/${paymentId}`

  const { mutateAsync } = useMutation([url, clientCode, session, paymentId], {
    mutationFn: async (transaction: CreateTransactionModel) => {
      const res = await axios.post<ThreeDSecureResponse>(url, transaction, {
        headers: {
          'reapit-session': session as string,
          'reapit-customer': clientCode as string,
          'reapit-app-id': process.env.appId,
          'X-Api-Key': process.env.apiKey,
        },
      })

      return res.data
    },
    onError: (err: AxiosError<any>) => {
      logger(err)
    },
  })

  const transactionSubmit = async (transaction: CreateTransactionModel) => await mutateAsync(transaction)

  return {
    transactionSubmit,
  }
}

export const useMerchantKey = (session: string | null, config: ClientConfigModel | null, paymentId?: string | null) => {
  const url = `${process.env.paymentsApiUrl}/opayo/public/merchant-session-keys/${paymentId}`
  const { clientCode, isConfigured } = config ?? {}

  const { data, isLoading, refetch } = useQuery([url, clientCode, session, paymentId], {
    queryFn: async () => {
      const res = await axios.post<MerchantKey>(url, undefined, {
        headers: {
          'reapit-session': session as string,
          'reapit-customer': clientCode as string,
          'reapit-app-id': process.env.appId,
          'X-Api-Key': process.env.apiKey,
        },
      })

      return res.data
    },
    refetchOnWindowFocus: false,
    onError: (err: AxiosError<any>) => {
      logger(err)
    },
    enabled: Boolean(session && clientCode && paymentId && isConfigured),
  })

  return {
    merchantKey: data ?? null,
    merchantKeyLoading: isLoading,
    getMerchantKey: refetch,
  }
}
