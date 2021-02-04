jest.mock('@reapit/elements')
import { fetcher } from '@reapit/elements'
import { CreateTransactionModel } from '../../types/opayo'
import { opayoCreateTransactionService, opayoMerchantKeyService } from '../opayo'

const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock
;(window as any).reapit.config = {
  opayo: {
    SBOX: {
      vendorName: 'SOME_NAME',
    },
  },
}

describe('opayoCreateTransactionService  ', () => {
  const transaction = {
    transactionType: 'Payment',
    paymentMethod: {
      card: {},
    },
  } as CreateTransactionModel

  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await opayoCreateTransactionService('SBOX', transaction)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await opayoCreateTransactionService('SBOX', transaction)
    expect(errorSpy).toHaveBeenLastCalledWith('No transaction processed')
  })
})

describe('opayoMerchantKeyService  ', () => {
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await opayoMerchantKeyService('SBOX')).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await opayoMerchantKeyService('SBOX')
    expect(errorSpy).toHaveBeenLastCalledWith('No merchant key returned')
  })
})
