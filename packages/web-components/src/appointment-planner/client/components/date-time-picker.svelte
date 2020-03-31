<script>
  import { derrivedDayOfWeek } from '../core/store/week-store'
  import DateCell from './date-cell.svelte'
</script>

<style>
.date-time-picker__container {
  display: flex;
}
</style>

<div class="date-time-picker__container">
  {#each $derrivedDayOfWeek as date }
    <DateCell {date} />
  {/each}
</div>
