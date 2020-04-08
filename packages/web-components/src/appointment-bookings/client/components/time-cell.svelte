<script>
  import { themeStore  } from '../core/store/theme-store'

  export let startTime = ''
</script>

<style>
  .time-cell-container {
    padding: 1em;
    margin-bottom: 2px;
    cursor: pointer;
    min-height: 50px
  }

  .time-cell-container-visible {
    visibility: visible
  }

  .time-cell-container-not-visible {
    visibility: hidden;
  }
</style>

<div class="time-cell-container {startTime ? 'time-cell-container-visible' : 'time-cell-container-not-visible'} {$themeStore.timeCell}">
  <div>{startTime || ''}</div>
</div>
