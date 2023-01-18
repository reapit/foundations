// import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
// import React, { FC, createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
// import { ReceiptAction } from '../payment-provider'
// import { ClientConfigModel } from '../types/config'
// import { MerchantKey, Transaction } from '../types/opayo'

// export interface PaymentState {
//   config: ClientConfigModel
//   payment: PaymentModel
//   property: PropertyModel | null
//   merchantKey: MerchantKey
//   receiptAction: ReceiptAction
//   transactionSubmit: (transaction: Transaction) => Promise<Transaction>
//   refreshPayment: () => void
// }

// export interface PaymentsFilters {
//   createdFrom?: string
//   createdTo?: string
//   description?: string
//   status?: string
// }

// export interface PaymentStateHook extends PaymentState {
//   setPaymentState: Dispatch<SetStateAction<PaymentState | null>>
// }

// export const PaymentsStateContext = createContext<PaymentStateHook>({} as PaymentStateHook)

// const { Provider } = PaymentsStateContext

// export const PaymentsProvider: FC = ({ children }) => {
//   const [paymentState, setPaymentState] = useState<PaymentState | null>(null)

//   return <Provider value={{ ...paymentState, setPaymentState }}>{children}</Provider>
// }

// export const usePaymentsState = (): PaymentsStateHook => {
//   return useContext(PaymentsStateContext)
// }
