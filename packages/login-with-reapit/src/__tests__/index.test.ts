import { reapitConnectComponent } from '../index'

describe('reapitConnectComponent', () => {
  it('should match a snapshot', () => {
    expect(
      reapitConnectComponent({
        connectClientId: 'clientId',
        connectUserPoolId: 'userpoolId',
        connectOAuthUrl: 'https://some-url.com',
        connectLoginRedirectPath: '/some-path',
        connectLogoutRedirectPath: '/some-logout-path',
        connectContainerId: '#containerId',
        connectHasSessionCallback: () => true,
      }),
    ).toMatchSnapshot()
  })
})
