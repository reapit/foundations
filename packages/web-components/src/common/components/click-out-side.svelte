<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte'

  let containerElement: HTMLDivElement

  const dispatch = createEventDispatcher()

  const onClick = (event: MouseEvent) => {
    if (containerElement && !containerElement.contains(event.target as Node)) {
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
