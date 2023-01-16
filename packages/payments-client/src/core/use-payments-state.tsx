import { PaymentModel } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { PaymentProvider } from '../../../payments-ui/src/types/providers'
import { PaymentWithPropertyModel } from '@reapit/payments-ui'

export interface PaymentParams {
  session?: string | null
  clientId?: string | null
  paymentId?: string | null
}

export interface PaymentsDataState {
  selectedPayment: PaymentModel | null
  setSelectedPayment: Dispatch<SetStateAction<PaymentModel | null>>
  paymentParams: PaymentParams
  setPaymentParams: Dispatch<SetStateAction<PaymentParams>>
  paymentWithProperty: PaymentWithPropertyModel | null
  setPaymentWithProperty: Dispatch<SetStateAction<PaymentWithPropertyModel | null>>
  paymentProvider: PaymentProvider | null
  setPaymentProvider: Dispatch<SetStateAction<PaymentProvider | null>>
}

export interface PaymentsFilters {
  createdFrom?: string
  createdTo?: string
  description?: string
  status?: string
}

export interface PaymentsFilterState {
  paymentsFilters: PaymentsFilters
  setPaymentsFilters: Dispatch<SetStateAction<PaymentsFilters>>
}

export interface PaymentsStateHook {
  paymentsDataState: PaymentsDataState
  paymentsFilterState: PaymentsFilterState
}

export const PaymentsStateContext = createContext<PaymentsStateHook>({} as PaymentsStateHook)

const { Provider } = PaymentsStateContext

export const PaymentsProvider: FC = ({ children }) => {
  const [selectedPayment, setSelectedPayment] = useState<PaymentModel | null>(null)
  const [paymentParams, setPaymentParams] = useState<PaymentParams>({})
  const [paymentWithProperty, setPaymentWithProperty] = useState<PaymentWithPropertyModel | null>(null)
  const [paymentProvider, setPaymentProvider] = useState<PaymentProvider | null>(null)
  const [paymentsFilters, setPaymentsFilters] = useState<PaymentsFilters>({})

  const paymentsDataState: PaymentsDataState = {
    selectedPayment,
    setSelectedPayment,
    paymentParams,
    setPaymentParams,
    paymentWithProperty,
    setPaymentWithProperty,
    paymentProvider,
    setPaymentProvider,
  }

  const paymentsFilterState: PaymentsFilterState = {
    paymentsFilters,
    setPaymentsFilters,
  }

  return (
    <Provider
      value={{
        paymentsDataState,
        paymentsFilterState,
      }}
    >
      {children}
    </Provider>
  )
}

export const usePaymentsState = (): PaymentsStateHook => {
  return useContext(PaymentsStateContext)
}
