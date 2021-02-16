import { initializeSearchWidgetComponent } from '../search-widget'
import { initializeEditor } from '@/core/editor'

jest.mock('@/core/editor')

describe('initialiSearchWidgetComponent', () => {
  it('should call editor add component type', async () => {
    const editor = (await initializeEditor({ identifier: 'some-string' })) as any

    initializeSearchWidgetComponent(editor)

    expect(editor.DomComponents.addType).toHaveBeenCalled()
  })
})
