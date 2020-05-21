import LoginButton from '../login-with-reapit.svelte'
import { render } from '@testing-library/svelte'

describe('LoginWithReapit', () => {
  it('it matches a snapshot', () => {
    const props = {
      clientId: 'clientId',
      redirectUri: 'redirectUri',
    }

    const wrapper = render(LoginButton, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
