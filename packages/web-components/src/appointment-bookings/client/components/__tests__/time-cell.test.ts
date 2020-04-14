import TimeCell from '../time-cell.svelte'
import { render } from '@testing-library/svelte'
import dayjs from 'dayjs'
import MockDate from 'mockdate'

beforeEach(() => {
  MockDate.set(new Date(2020, 4, 1))
})
afterEach(() => {
  MockDate.reset()
})

describe('DateTimePicker', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(TimeCell, { startTime: dayjs() })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
