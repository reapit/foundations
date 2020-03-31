import { ReapitAppointmentPlannerComponent } from '../index'

describe('ReapitAppointmentPlannerComponent', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitAppointmentPlannerComponent({
        target: document.body,
        apiKey: 'SOME_KEY',
        theme: { hoverBackgroundColor: 'red' },
      }),
    ).toMatchSnapshot()
  })
})
