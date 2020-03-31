import DateTimePicker from '../date-time-picker.svelte'
import { render } from '@testing-library/svelte'
import dayjs from 'dayjs'

describe('DateTimePicker', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(DateTimePicker, { date: dayjs() })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
