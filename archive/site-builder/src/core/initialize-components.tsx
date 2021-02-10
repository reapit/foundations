import { initializeSearchWidgetBlock } from '../components/blocks/search-widget'
import { initializeSearchWidgetComponent } from '../components/editor-components/search-widget'
import { initializePropertyDetailComponent } from '../components/editor-components/property-detail'
import { initializePropertyDetailBlock } from '../components/blocks/property-detail'
import { initializeBookAValuationComponent } from '../components/editor-components/book-a-valuation'
import { initializeBookAValuationBlock } from '../components/blocks/book-a-valuation'

export const initializeComponents = editor => {
  initializeSearchWidgetComponent(editor)
  initializePropertyDetailComponent(editor)
  initializeBookAValuationComponent(editor)
}

export const initializeBlocks = editor => {
  initializeSearchWidgetBlock(editor)
  initializePropertyDetailBlock(editor)
  initializeBookAValuationBlock(editor)
}
