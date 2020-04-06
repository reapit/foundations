import DataCell from '../date-cell.svelte'
import { render } from '@testing-library/svelte'
import dayjs from 'dayjs'

describe('data-cell', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(DataCell, { date: dayjs() })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
