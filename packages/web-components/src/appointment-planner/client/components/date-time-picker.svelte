<script>
  import { derrivedDayOfWeek } from '../core/store/week-store'
  import DateCell from './date-cell.svelte'

  export let handleNextStep
  export let themeClasses
  export let handleOnClickCell
</script>

<style>
  .date-time-picker-container {
    display: flex;
  }
</style>

<div class="date-time-picker-container">
  {#each $derrivedDayOfWeek as date}
    <div>
      <DateCell {themeClasses} {date} {handleNextStep} {handleOnClickCell} />
    </div>
  {/each}
</div>
