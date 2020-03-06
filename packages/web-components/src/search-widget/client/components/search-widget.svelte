<script lang="typescript">
  import { onMount, onDestroy } from 'svelte'
  import searchWidgetStore from '../core/store'
  import { generateGlobalTheme } from '../../../common/styles/theme'
  import * as Styles from '../../../common/styles/index'
  import SearchForm from './search-form.svelte'

  export let theme: Styles.InitializerTheme = {}
  export let apiKey: string = ''

  const { resetCSS } = Styles
  const globalCSSTheme = generateGlobalTheme(theme)
  const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
    console.log(store)
  })

  onMount(() => {
    searchWidgetStore.update(values => ({
      ...values,
      initializers: {
        theme,
        apiKey,
      }
    }))
  })

  onDestroy(() => {
    unsubscribeSearchWidgetStore()
  })
</script>

<style>

</style>

<div class={resetCSS}>
  <div class={globalCSSTheme}>
    <SearchForm />
  </div>
</div>
