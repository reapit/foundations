import { ReapitSearchWidget } from '../index'
import { stubTheme } from '../../utils/__stubs__/theme'

describe('ReapitSearchWidget', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitSearchWidget({
        parentSelector: '#search-widget',
        apiKey: 'SOME_KEY',
        customerId: 'DEMO',
        theme: stubTheme,
        detailPageUrl: '/detail.html',
      }),
    ).toMatchSnapshot()
  })
})
