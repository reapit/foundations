// import 'core-js/features/promise'
// import 'core/js'
import SearchWidget from './components/search-widget.svelte'

export default searchWidget

const searchWidget = new SearchWidget({
  target: document.body,
  props: {
    name: 'world',
  },
})
