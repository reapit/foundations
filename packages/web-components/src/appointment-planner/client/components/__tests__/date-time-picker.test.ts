import DateTimePicker from '../date-time-picker.svelte'
import { render } from '@testing-library/svelte'
import MockDate from 'mockdate'

beforeEach(() => {
  MockDate.set(1570747191389)
})
afterEach(() => {
  MockDate.reset()
})

describe('DateTimePicker', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(DateTimePicker)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
