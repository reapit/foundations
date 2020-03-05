import SearchWidget from '../search-widget.svelte'
import { render, fireEvent } from '@testing-library/svelte'

describe('search-widget', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(SearchWidget, {
      theme: {},
      apiKey: '',
    })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it triggers a store update', async () => {
    const wrapper = render(SearchWidget, {
      theme: {},
      apiKey: '',
    })
    const { getByTestId } = wrapper

    const count = getByTestId('count')
    const button = getByTestId('button')

    await fireEvent.click(button)

    expect(count.textContent).toEqual('Count is 1')
  })
})
