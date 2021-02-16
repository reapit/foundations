import { initializeBookAValuationBlock, bookAValuationConfig } from '../book-a-valuation'
import { initializeEditor } from '@/core/editor'
import { ComponentTypes } from '@/constants/component-types'

jest.mock('@/core/editor')

describe('initializeBookAValuationBlock', () => {
  it('should call editor add component type', async () => {
    const editor = (await initializeEditor({ identifier: 'some-string' })) as any

    initializeBookAValuationBlock(editor)

    expect(editor.BlockManager.add).toHaveBeenCalledWith(ComponentTypes.BOOK_A_VALUATION, bookAValuationConfig)
  })
})
