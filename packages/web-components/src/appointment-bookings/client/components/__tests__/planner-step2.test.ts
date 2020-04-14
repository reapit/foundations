import AppointmentBooking from '../planner-step2.svelte'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'
import MockDate from 'mockdate'

MockDate.set('Mon Apr 13')

describe('appointment bookings', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(AppointmentBooking, { themeClasses: { svgNavigation: 'class1' } })
    const { container } = wrapper
    expect(container).toMatchSnapshot()
  })
})
