import { sendEmail } from '../ses-client'

jest.mock('aws-sdk', () => ({
  SES: jest.fn(() => ({
    sendEmail: () => ({
      promise: () => {
        return {
          MessageId: 'SOME_ID',
        }
      },
    }),
  })),
}))

describe('sendEmail', () => {
  const to = 'email@example.com'
  const subject = 'Some Subject'
  const template = 'Some Body'
  const from = 'email@example.com'

  it('should correctly send an email', async () => {
    const messageId = await sendEmail(to, subject, template, from)
    expect(messageId).toEqual('SOME_ID')
  })
})
