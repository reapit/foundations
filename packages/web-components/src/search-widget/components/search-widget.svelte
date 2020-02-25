<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { simpleStore, initializers } from '../core/store'
  import { generateGlobalTheme } from '../../common/styles/theme'
  import * as Styles from '../../common/styles/index'

  export let theme: Styles.InitializerTheme = {}
  export let apiKey: string = ''

  const { resetCSS } = Styles
  const globalCSSTheme = generateGlobalTheme(theme)
  const updateCount = () => simpleStore.update((current: number) => (current += 1))

  const unsubscribeSimpleStore = simpleStore.subscribe(value => {
    console.log('simpleStore', value)
  })

  const unsubscribeInitializers = initializers.subscribe(value => {
    console.log('initializers', value)
  })

  onMount(() => {
    console.log('App mounted')
    initializers.update(() => ({
      theme,
      apiKey,
    }))
  })

  onDestroy(() => {
    unsubscribeSimpleStore()
    unsubscribeInitializers()
  })
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<div class={resetCSS}>
  <div class={globalCSSTheme}>
    <h1>Hello!</h1>
    <p>
      <span data-testid="count">Count is {$simpleStore}</span>
      <button data-testid="button" on:click={updateCount}>Click me</button>
    </p>
  </div>
</div>
