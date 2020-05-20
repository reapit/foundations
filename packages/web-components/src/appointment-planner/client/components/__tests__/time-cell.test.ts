import TimeCell from '../time-cell.svelte'
import { render } from '@testing-library/svelte'
import dayjs from 'dayjs'
import MockDate from 'mockdate'

beforeEach(() => {
  MockDate.set(1570747191389)
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
