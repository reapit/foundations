import { initializeSearchWidgetBlock } from '@/components/blocks/search-widget'
import { initializeSearchWidgetComponent } from '@/components/editor-components/search-widget'
import { initializePropertyDetailComponent } from '@/components/editor-components/property-detail'
import { initializePropertyDetailBlock } from '@/components/blocks/property-detail'
import { initializeBookAValuationComponent } from '@/components/editor-components/book-a-valuation'
import { initializeBookAValuationBlock } from '@/components/blocks/book-a-valuation'
import { initializeBlocks, initializeComponents } from '../initialize-components'
import { initializeEditor } from '../__mocks__/editor'

jest.mock('@/components/blocks/search-widget')
jest.mock('@/components/editor-components/search-widget')
jest.mock('@/components/editor-components/property-detail')
jest.mock('@/components/blocks/property-detail')
jest.mock('@/components/editor-components/book-a-valuation')
jest.mock('@/components/blocks/book-a-valuation')

const mockEditor = initializeEditor()

describe('initializeComponents and initializeBlocks', () => {
  it('should correctly set up the components', () => {
    initializeComponents(mockEditor)

    expect(initializeSearchWidgetComponent).toHaveBeenCalledWith(mockEditor)
    expect(initializePropertyDetailComponent).toHaveBeenCalledWith(mockEditor)
    expect(initializeBookAValuationComponent).toHaveBeenCalledWith(mockEditor)
  })

  it('should correctly set up the blocks', () => {
    initializeBlocks(mockEditor)

    expect(initializeSearchWidgetBlock).toHaveBeenCalledWith(mockEditor)
    expect(initializePropertyDetailBlock).toHaveBeenCalledWith(mockEditor)
    expect(initializeBookAValuationBlock).toHaveBeenCalledWith(mockEditor)
  })
})
