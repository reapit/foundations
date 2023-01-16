import { fetcher } from '@reapit/utils-common'
import { CreateTransactionModel } from '../../types/opayo'
import { opayoCreateTransactionService, opayoMerchantKeyService } from '../opayo'

jest.mock('@reapit/utils-common')

const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock
;(window as any).reapit.config = {
  opayo: {
    SBOX: {
      vendorName: 'SOME_NAME',
    },
  },
}

const errorSnack = jest.fn()

describe('opayoCreateTransactionService  ', () => {
  const transaction = {
    transactionType: 'Payment',
    paymentMethod: {
      card: {},
    },
  } as CreateTransactionModel

  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await opayoCreateTransactionService('SBOX', transaction, errorSnack)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await opayoCreateTransactionService('SBOX', transaction, errorSnack)
    expect(errorSpy).toHaveBeenLastCalledWith('No transaction processed')
  })
})

describe('opayoMerchantKeyService  ', () => {
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await opayoMerchantKeyService('SBOX', errorSnack)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await opayoMerchantKeyService('SBOX', errorSnack)
    expect(errorSpy).toHaveBeenLastCalledWith('No merchant key returned')
  })
})
