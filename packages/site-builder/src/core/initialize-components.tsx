import { initializeSearchWidgetBlock } from '../components/blocks/search-widget'
// import { blockTest } from '../components/blocks/block-test'
import { initializeSearchWidgetComponent } from '../components/editor-components/search-widget'

export const initializeComponents = editor => {
  // editor.BlockManager.add('search-widget', blockSearchWidget)
  // editor.BlockManager.add('test-block', blockTest)
  initializeSearchWidgetComponent(editor)
}

export const initializeBlocks = editor => {
  initializeSearchWidgetBlock(editor)
}
