import Loader from '../loader.svelte'
import { render } from '@testing-library/svelte'

describe('Loader', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(Loader)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
