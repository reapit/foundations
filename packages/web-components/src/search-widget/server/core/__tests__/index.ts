import { searchWidgetHandler } from '../index'

describe('searchWidgetHandler', () => {
  it('should launch without crashing', async () => {
    try {
      await searchWidgetHandler({} as any, {} as any)
    } catch (err) {
      expect(err).toBeUndefined()
    }
  })
})
