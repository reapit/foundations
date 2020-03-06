<script lang="typescript">
  import { onDestroy } from 'svelte'
  import { getPropertiesForSale, getPropertiesToRent } from '../api/properties'
  import searchWidgetStore from '../core/store'

  let inputValue: string = ''
  let apiKey: string = ''

  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    apiKey = store.initializers.apiKey
  })

  const handleInput = ({ target }: Event) => {
    inputValue = (target as HTMLInputElement).value
  }

  const handleToRent = async () => {
    const properties = await getPropertiesToRent(inputValue, apiKey)

    if (properties) {
      searchWidgetStore.update(values => ({
        ...values,
        properties
      }))
    }
  }

  const handleToBuy = async () => {
    const properties = await getPropertiesForSale(inputValue, apiKey)

    if (properties) {
      searchWidgetStore.update(values => ({
        ...values,
        properties
      }))
    }
  }

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<form on:submit|preventDefault on:input|preventDefault={handleInput}>
  <input type="text" id="search" />
  <button on:click|preventDefault={handleToRent} type="button">For rent</button>
  <button on:click|preventDefault={handleToBuy} type="button">For sale</button>
</form>
