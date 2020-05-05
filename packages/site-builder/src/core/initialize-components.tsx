import { blockSearchWidget } from '../components/blocks/block-search-widget'
import { blockTest } from '../components/blocks/block-test'

export const initializeComponents = editor => {
  editor.BlockManager.add('search-widget', blockSearchWidget)
  editor.BlockManager.add('test-block', blockTest)
}
