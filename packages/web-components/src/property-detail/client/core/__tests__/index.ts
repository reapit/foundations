import { ReapitPropertyDetailComponent } from '../index'
import { stubTheme } from '../../../../search-widget/client/utils/__stubs__/theme'

describe('ReapitPropertyDetailComponent', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitPropertyDetailComponent({
        parentSelector: '#property-detail-widget',
        apiKey: 'SOME_KEY',
        customerId: 'DEMO',
        theme: stubTheme,
      }),
    ).toMatchSnapshot()
  })
})
