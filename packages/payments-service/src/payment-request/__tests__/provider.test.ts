import { Test, TestingModule } from '@nestjs/testing'
import { PaymentRequestProvider } from '../provider'
import { mockConfigModel } from '../../tests/__mocks__/config'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { mockPaymentReceipt } from '../../tests/__mocks__/receipt'
import { sendEmail } from '../../core/ses-client'
import { mockPaymentRequest } from '../../tests/__mocks__/request'

jest.mock('../../core/ses-client')

const mockDataMapper = {
  get: jest.fn(),
}

const mockEmailClient = sendEmail as jest.Mock

describe('PaymentRequestProvider', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [PaymentRequestProvider, { provide: DataMapper, useValue: mockDataMapper }],
    }).compile()
  })

  it('should send an email with the correct template', async () => {
    const provider = app.get<PaymentRequestProvider>(PaymentRequestProvider)

    mockDataMapper.get.mockImplementationOnce(() => {
      return mockConfigModel
    })

    await provider.create(
      { 'reapit-customer': 'SBOX', 'reapit-session': 'MOCK_SESSION' },
      mockPaymentRequest,
      'MOCK_PAYMENT_ID',
    )

    expect(mockEmailClient.mock.calls[0][0]).toEqual(mockPaymentReceipt.receipientEmail)
    expect(mockEmailClient.mock.calls[0][1]).toEqual(`Payment Request from ${mockConfigModel.companyName}`)
    expect(mockEmailClient.mock.calls[0][2]).toMatchSnapshot()
  })
})
