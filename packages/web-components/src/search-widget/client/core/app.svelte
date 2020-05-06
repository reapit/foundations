<script>
  import SearchWidget from '../components/search-widget.svelte'
  import PropertyDetail from '../components/property-detail.svelte'
  import { Router, Route } from 'svelte-routing'

  export let theme
  export let apiKey
  export let parentSelector
</script>

<div>
  <Router url="">
    <Route path="/">
      <SearchWidget {theme} {apiKey} {parentSelector} />
    </Route>
    <Route path=":id" let:params let:location>
      <PropertyDetail x={location} propertyId={params.id} {theme} {apiKey} {parentSelector} />
    </Route>
  </Router>
</div>
