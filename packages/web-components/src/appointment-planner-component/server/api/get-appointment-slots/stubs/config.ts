import { WebComponentConfigResult } from '../apis'

export const configDataStub: WebComponentConfigResult = {
  customerId: 'SBOX',
  appId: '021af94d-411b-421a-bcbd-8c3edadc5421',
  appointmentLength: 240,
  appointmentTimeGap: 240,
  appointmentTypes: [{ M: { value: { S: 'value1' }, id: { S: 'id1' } } }],
  negotiatorIds: ['ASDS', 'SSSS'],
  daysOfWeek: [1],
}
