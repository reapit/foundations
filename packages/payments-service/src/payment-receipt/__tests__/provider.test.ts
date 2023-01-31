import { Test, TestingModule } from '@nestjs/testing'
import { PaymentReceiptProvider } from '../provider'
import { mockConfigModel } from '../../tests/__mocks__/config'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { mockPaymentReceipt } from '../../tests/__mocks__/receipt'
import { sendEmail } from '../../core/ses-client'

jest.mock('../../core/ses-client')

const mockDataMapper = {
  get: jest.fn(),
}

const mockEmailClient = sendEmail as jest.Mock

describe('PaymentReceiptProvider', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [PaymentReceiptProvider, { provide: DataMapper, useValue: mockDataMapper }],
    }).compile()
  })

  it('should send an email with the correct template', async () => {
    const provider = app.get<PaymentReceiptProvider>(PaymentReceiptProvider)

    mockDataMapper.get.mockImplementationOnce(() => {
      return mockConfigModel
    })

    await provider.createReceipt({ 'reapit-customer': 'SBOX' }, mockPaymentReceipt)

    expect(mockEmailClient.mock.calls[0][0]).toEqual(mockPaymentReceipt.receipientEmail)
    expect(mockEmailClient.mock.calls[0][1]).toEqual(`Payment Receipt from ${mockConfigModel.companyName}`)
    expect(mockEmailClient.mock.calls[0][2]).toMatchSnapshot()
  })
})
