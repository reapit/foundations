import { ReapitSearchWidgetComponent } from '../index'
import { stubTheme } from '../../utils/__stubs__/theme'

describe('ReapitSearchWidgetComponent', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitSearchWidgetComponent({
        parentSelector: '#search-widget',
        apiKey: 'SOME_KEY',
        customerId: 'DEMO',
        theme: stubTheme,
      }),
    ).toMatchSnapshot()
  })
})
