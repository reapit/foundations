import { initializeSearchWidgetBlock } from '../components/blocks/search-widget'
import { initializeSearchWidgetComponent } from '../components/editor-components/search-widget'

export const initializeComponents = editor => {
  initializeSearchWidgetComponent(editor)
}

export const initializeBlocks = editor => {
  initializeSearchWidgetBlock(editor)
}
