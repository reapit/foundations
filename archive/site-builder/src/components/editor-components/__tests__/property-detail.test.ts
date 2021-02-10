import { initializePropertyDetailComponent } from '../property-detail'
import { initializeEditor } from '@/core/editor'

jest.mock('@/core/editor')

describe('initializePropertyDetailComponent', () => {
  it('should call editor add component type', async () => {
    const editor = (await initializeEditor({ identifier: 'some-string' })) as any

    initializePropertyDetailComponent(editor)

    expect(editor.DomComponents.addType).toHaveBeenCalled()
  })
})
