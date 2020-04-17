<script>
  import { derrivedDayOfWeek } from '../core/store/week-store'
  import DateCell from './date-cell.svelte'
  export let handleNextStep
</script>

<style>
.date-time-picker-container {
  display: flex;
}
</style>

<div class="date-time-picker-container">
  {#each $derrivedDayOfWeek as date }
    <div>
      <DateCell {date} {handleNextStep}/>
    </div>
  {/each}
</div>
