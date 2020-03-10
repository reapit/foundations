import { ReapitSearchWidgetComponent } from '../index'

describe('ReapitSearchWidgetComponent', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitSearchWidgetComponent({
        target: document.body,
        apiKey: 'SOME_KEY',
        theme: { baseBackgroundColor: 'white' },
      }),
    ).toMatchSnapshot()
  })
})
