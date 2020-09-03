import { WebComponentConfigResult } from '../apis'

export const configStub: WebComponentConfigResult = {
  customerId: 'SBOX',
  appId: '021af94d-411b-421a-bcbd-8c3edadc5421',
  appointmentLength: 1,
  appointmentTimeGap: 5,
  appointmentTypes: [
    {
      M: {
        value: {
          S: 'value1',
        },
        id: {
          S: 'id1',
        },
      },
    },
  ],
  negotiatorIds: ['ASDS'],
  daysOfWeek: [1],
}
