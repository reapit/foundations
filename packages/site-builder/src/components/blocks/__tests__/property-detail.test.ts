import { initializePropertyDetailBlock, propertyDetailConfig } from '../property-detail'
import { initializeEditor } from '@/core/editor'
import { ComponentTypes } from '@/constants/component-types'

jest.mock('@/core/editor')

describe('initializePropertyDetailBlock', () => {
  it('should call editor add component type', async () => {
    const editor = (await initializeEditor({ identifier: 'some-string' })) as any

    initializePropertyDetailBlock(editor)

    expect(editor.BlockManager.add).toHaveBeenCalledWith(ComponentTypes.PROPERTY_DETAIL, propertyDetailConfig)
  })
})
