import { ReapitConnectComponent } from '../index'

describe('ReapitConnectComponent', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitConnectComponent({
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
