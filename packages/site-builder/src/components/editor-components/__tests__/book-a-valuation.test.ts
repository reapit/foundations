import { initializeBookAValuationComponent } from '../book-a-valuation'
import { initializeEditor } from '@/core/editor'

jest.mock('@/core/editor')

describe('initializeBookAValuationComponent', () => {
  it('should call editor add component type', async () => {
    const editor = (await initializeEditor({ identifier: 'some-string' })) as any

    initializeBookAValuationComponent(editor)

    expect(editor.DomComponents.addType).toHaveBeenCalled()
  })
})
