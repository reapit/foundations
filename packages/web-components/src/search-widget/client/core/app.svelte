<script>
  import SearchWidget from '../components/search-widget.svelte'
  import PropertyDetail from '../components/property-detail.svelte'
  import { Router, Route } from 'svelte-routing'

  export let theme
  export let apiKey
  export let customerId
  export let parentSelector
</script>

<div>
  <Router url="">
    <Route path="/">
      <SearchWidget {theme} {apiKey} {customerId} {parentSelector} />
    </Route>
    <Route path=":id" let:params let:location>
      <PropertyDetail x={location} propertyId={params.id} {theme} {apiKey} {customerId} {parentSelector} />
    </Route>
  </Router>
</div>
