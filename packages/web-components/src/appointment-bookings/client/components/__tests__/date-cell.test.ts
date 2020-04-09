import DataCell from '../date-cell.svelte'
import { render } from '@testing-library/svelte'
import dayjs from 'dayjs'
import MockDate from 'mockdate'

beforeEach(() => {
  MockDate.set(new Date(2020, 3, 1))
})
afterEach(() => {
  MockDate.reset()
})

describe('data-cell', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(DataCell, { date: dayjs() })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
