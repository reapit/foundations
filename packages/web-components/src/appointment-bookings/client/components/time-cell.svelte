<script>
  import { themeStore  } from '../core/store/theme-store'

  export let startTime = ''
</script>

<style>
  .time-cell-container {
    padding: 1em;
    margin-bottom: 2px;
    height: 5vw;
    cursor: pointer;
  }

  .time-cell-container-visible {
    visibility: visible
  }

  .time-cell-container-not-visible {
    visibility: hidden;
  }
</style>

<div class="time-cell-container {startTime ? 'time-cell-container-visible' : 'time-cell-container-not-visible'} {$themeStore.item}">
  <div>{startTime || ''}</div>
</div>
