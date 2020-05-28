import { ReapitPropertyDetailWidget } from '../index'
import { stubTheme } from '../../../../search-widget/client/utils/__stubs__/theme'

describe('ReapitPropertyDetailWidget', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitPropertyDetailWidget({
        parentSelector: '#property-detail-widget',
        apiKey: 'SOME_KEY',
        customerId: 'DEMO',
        theme: stubTheme,
      }),
    ).toMatchSnapshot()
  })
})
