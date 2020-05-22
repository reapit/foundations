import { LoginWithReapitComponent } from '../index'

describe('LoginWithReapitComponent', () => {
  it('should match a snapshot', () => {
    expect(
      LoginWithReapitComponent({
        clientId: 'clientId',
        redirectUri: 'redirectUri',
        containerId: '#containerId',
      }),
    ).toMatchSnapshot()
  })
})
