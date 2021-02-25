import SignInButton from '../sign-in-button.svelte'
import { render } from '@testing-library/svelte'

describe('SignInButton', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(SignInButton)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
