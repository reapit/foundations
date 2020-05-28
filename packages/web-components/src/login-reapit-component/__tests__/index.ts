import { LoginReapitComponent } from '../index'

describe('LoginReapitComponent', () => {
  it('should match a snapshot', () => {
    expect(
      LoginReapitComponent({
        clientId: 'clientId',
        redirectUri: 'redirectUri',
        containerId: '#containerId',
      }),
    ).toMatchSnapshot()
  })
})
