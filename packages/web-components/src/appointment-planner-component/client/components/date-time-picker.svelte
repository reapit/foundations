<script lang="ts">
  import { derrivedDayOfWeek } from '../core/week-store'
  import DateCell from './date-cell.svelte'

  export let handleOnClickCell: ({ appointmentDate: Dayjs, appointmentTime: number }) => void
</script>

<style>
  .date-time-picker-container {
    display: flex;
  }
</style>

<div class="date-time-picker-container">
  {#each $derrivedDayOfWeek as date}
    <div>
      <DateCell {date} {handleOnClickCell} />
    </div>
  {/each}
</div>
