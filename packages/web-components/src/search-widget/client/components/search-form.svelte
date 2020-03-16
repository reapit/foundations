<script lang="typescript">
  import { onDestroy } from 'svelte'
  import { getProperties } from '../api/properties'
  import searchWidgetStore from '../core/store'

  let inputValue: string = ''
  let apiKey: string = ''

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    apiKey = store.initializers.apiKey
  })

  const handleInput = ({ target }: Event) => {
    inputValue = (target as HTMLInputElement).value
    searchWidgetStore.update(values => ({
      ...values,
      searchKeyword: inputValue,
    }))
  }

  const handleFetchProperties = async (isRental: boolean) => {
    searchWidgetStore.update(values => ({
      ...values,
      searchType: isRental ? 'Rent' : 'Sale',
    }))

    const properties = await getProperties(inputValue, isRental, apiKey)

    if (properties) {
      searchWidgetStore.update(values => ({
        ...values,
        properties,
      }))
    }
  }

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<form on:submit|preventDefault on:input|preventDefault={handleInput}>
  <input type="text" data-testid="search-input" id="search" />
  <button on:click|preventDefault={() => handleFetchProperties(true)} data-testid="lettings" type="button">
    For rent
  </button>
  <button on:click|preventDefault={() => handleFetchProperties(false)} data-testid="sales" type="button">
    For sale
  </button>
</form>
