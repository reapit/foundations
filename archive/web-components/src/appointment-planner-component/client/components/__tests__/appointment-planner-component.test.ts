import AppointmentPlanner from '../appointment-planner-component.svelte'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/svelte'
import MockDate from 'mockdate'

MockDate.set('Mon Apr 13')

describe('appointment bookings', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(AppointmentPlanner, { themeClasses: { svgNavigation: 'class1' } })
    const { container } = wrapper
    expect(container).toMatchSnapshot()
  })
})
