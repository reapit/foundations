<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'

  let containerElement

  const dispatch = createEventDispatcher()

  const onClick = event => {
    if (containerElement && !containerElement.contains(event.target)) {
      event.stopPropagation()
      dispatch('click-out-side')
    }
  }

  onMount(() => {
    // true to use capture instead
    document.addEventListener('click', onClick, true)
  })

  onDestroy(() => {
    document.removeEventListener('click', onClick)
  })
</script>

<div bind:this={containerElement}>
  <slot />
</div>
