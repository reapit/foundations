import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator'
import {
  BillingAddress,
  CreateTransactionModel,
  EntryMethodType,
  PaymentMethod,
  ThreeDSecureType,
  TransactionType,
} from '../types/opayo'

export class TransactionDto implements CreateTransactionModel {
  @IsEnum(TransactionType)
  @IsNotEmpty()
  transactionType: TransactionType

  @IsObject()
  @IsNotEmpty()
  paymentMethod: PaymentMethod

  @IsString()
  @IsNotEmpty()
  vendorTxCode: string

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsString()
  @IsNotEmpty()
  currency: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  customerFirstName: string

  @IsString()
  @IsNotEmpty()
  customerLastName: string

  @IsObject()
  @IsNotEmpty()
  billingAddress: BillingAddress

  @IsEnum(EntryMethodType)
  @IsNotEmpty()
  entryMethod: EntryMethodType

  @IsEnum(ThreeDSecureType)
  @IsNotEmpty()
  apply3DSecure: ThreeDSecureType
}

export class OpayoPrivateHeaders {
  @IsString()
  @IsNotEmpty()
  'reapit-customer': string
}

export class OpayoPublicHeaders {
  @IsString()
  @IsNotEmpty()
  'reapit-customer': string

  @IsString()
  @IsNotEmpty()
  'reapit-session': string
}
