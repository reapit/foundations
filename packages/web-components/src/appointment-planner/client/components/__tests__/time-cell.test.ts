import TimeCell from '../time-cell.svelte'
import { render } from '@testing-library/svelte'
import dayjs from 'dayjs'

describe('DateTimePicker', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(TimeCell, { date: dayjs() })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
