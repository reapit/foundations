import ReapitConnectComponent from '../reapit-connect-component.svelte'
import { render } from '@testing-library/svelte'

describe('ReapitConnectComponent', () => {
  it('it matches a snapshot', () => {
    const props = {
      clientId: 'clientId',
      redirectUri: 'redirectUri',
    }

    const wrapper = render(ReapitConnectComponent, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
