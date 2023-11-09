import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator'
import {
  BillingAddress,
  CreateTransactionModel,
  EntryMethodType,
  PaymentMethod,
  StrongCustomerAuthentication,
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

  @IsObject()
  @IsNotEmpty()
  strongCustomerAuthentication: StrongCustomerAuthentication
}

export class OpayoPrivateHeaders {
  @IsString()
  @IsNotEmpty()
  'reapit-customer': string

  @IsString()
  @IsNotEmpty()
  'x-forwarded-for': string
}

export class OpayoPublicHeaders {
  @IsString()
  @IsNotEmpty()
  'reapit-customer': string

  @IsString()
  @IsNotEmpty()
  'reapit-session': string

  @IsString()
  @IsNotEmpty()
  'x-forwarded-for': string
}

export class Opayo3DSecureDto {
  @IsString()
  @IsOptional()
  cres: string

  @IsString()
  @IsOptional()
  threeDSSessionData: string
}
