import { initializeSearchWidgetBlock, searchWidgetConfig } from '../search-widget'
import { initializeEditor } from '@/core/editor'
import { ComponentTypes } from '@/constants/component-types'

jest.mock('@/core/editor')

describe('initializeSearchWidgetBlock', () => {
  it('should call editor add component type', async () => {
    const editor = (await initializeEditor({ identifier: 'some-string' })) as any

    initializeSearchWidgetBlock(editor)

    expect(editor.BlockManager.add).toHaveBeenCalledWith(ComponentTypes.SEARCH_WIDGET, searchWidgetConfig)
  })
})
