import SearchWidget from './components/search-widget.svelte'

const searchWidget = new SearchWidget({
  target: document.body,
  props: {
    name: 'world',
  },
})

export default searchWidget