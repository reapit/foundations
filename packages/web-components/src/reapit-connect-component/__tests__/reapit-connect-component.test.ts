import ReapitConnectComponent from '../reapit-connect-component.svelte'
import { render } from '@testing-library/svelte'
import { mockBrowserSession } from '../../../../connect-session/src/__mocks__/session'

describe('ReapitConnectComponent', () => {
  it('it matches a snapshot', () => {
    const props = {
      reapitConnectBrowserSession: mockBrowserSession,
      connectHasSessionCallback: () => mockBrowserSession,
    }

    const wrapper = render(ReapitConnectComponent, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
