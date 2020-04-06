import AppointmentBooking from '../appointment-bookings.svelte'
import { render } from '@testing-library/svelte'

describe('appointment-bookings', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(AppointmentBooking, { theme: { hoverBackgroundColor: 'red' } })
    const { container } = wrapper
    expect(container).toMatchSnapshot()
  })
})
