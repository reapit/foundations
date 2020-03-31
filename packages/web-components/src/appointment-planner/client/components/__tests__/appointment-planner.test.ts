import AppointmentPlanner from '../appointment-planner.svelte'
import { render } from '@testing-library/svelte'

describe('appointment-planner', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(AppointmentPlanner, { theme: { hoverBackgroundColor: 'red' } })
    const { container } = wrapper
    expect(container).toMatchSnapshot()
  })
})
