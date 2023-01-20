import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { ClientConfigModel } from '../types/config'
import { CreateTransactionModel, MerchantKey, Transaction } from '../types/opayo'
import { PaymentEmailReceipt, UpdateStatusBody } from '../types/payment'

export interface ReceiptAction {
  receiptLoading: boolean
  receiptSubmit: (transaction: PaymentEmailReceipt) => Promise<boolean>
}

export interface StatusAction {
  statusLoading: boolean
  statusSubmit: (transaction: UpdateStatusBody) => Promise<boolean>
}

export class PaymentProvider {
  config: ClientConfigModel
  payment: PaymentModel
  property: PropertyModel | null
  merchantKey: MerchantKey
  receiptAction: ReceiptAction
  statusAction: StatusAction
  transactionSubmit: (transaction: CreateTransactionModel) => Promise<Transaction>
  refreshPayment: () => void
  isPortal: boolean = false

  constructor(
    config: ClientConfigModel,
    payment: PaymentModel,
    property: PropertyModel | null,
    merchantKey: MerchantKey,
    receiptAction: ReceiptAction,
    statusAction: StatusAction,
    transactionSubmit: (transaction: CreateTransactionModel) => Promise<Transaction>,
    refreshPayment: () => void,
  ) {
    this.config = config
    this.payment = payment
    this.property = property
    this.merchantKey = merchantKey
    this.receiptAction = receiptAction
    this.statusAction = statusAction
    this.transactionSubmit = transactionSubmit
    this.refreshPayment = refreshPayment
  }
}
