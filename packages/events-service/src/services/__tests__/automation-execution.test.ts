import { AutomationExecution } from '../automation-execution'

jest.mock('../../core/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
}))
jest.mock('twilio')

const mockEvent = {
  id: '1234',
  eventType: 'enquiry',
  createdAt: '2020-12-12T10:00:00',
  clientCode: '2020-12-12T10:00:00',
  contact: {
    telephoneNumber: '_BLANK_',
  },
}

describe('AutomationExecution', () => {
  it('should run the sms function if the messageChannel is sms', async () => {
    const mockSms = (AutomationExecution.prototype.sms = jest.fn())

    await new AutomationExecution(
      mockEvent,
      {
        triggerOnEventType: 'enquiry',
        messageChannel: 'sms',
        messageBody: 'sms body',
        clientCode: 'SBOX',
        createdAt: '2020-12-12T10:00:00',
        updatedAt: '2020-12-12T10:00:00',
        id: '1234',
      },
      '1234',
    ).execute()

    expect(mockSms).toHaveBeenCalledTimes(1)
  })

  it('should log an error if the messageChannel is not supported', async () => {
    const mockErrorLog = (AutomationExecution.prototype.logError = jest.fn())

    await new AutomationExecution(
      mockEvent,
      {
        triggerOnEventType: 'enquiry',
        // @ts-ignore - messageChannel is only allowed to be "sms" by TS - test the
        // logic for this test in case that's not the case
        messageChannel: 'whatsapp',
        messageBody: 'message body',
        clientCode: 'SBOX',
        createdAt: '2020-12-12T10:00:00',
        updatedAt: '2020-12-12T10:00:00',
        id: '1234',
      },
      '1234',
    ).execute()

    expect(mockErrorLog).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
