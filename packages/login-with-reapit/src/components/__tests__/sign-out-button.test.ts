import SignOutButton from '../sign-out-button.svelte'
import { render } from '@testing-library/svelte'

describe('SignOutButton', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(SignOutButton)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
