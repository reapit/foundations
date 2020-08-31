<script lang="ts">
  import TimeCell from './time-cell.svelte'
  import { themeStore } from '../core/theme-store'

  export let date
  export let handleOnClickCell: ({ appointmentDate: Dayjs, appointmentTime: number }) => void

  // generate dummy meeting slots between 00-00 -> 10-00 - duration - on hours
  export const mockedTimes: string[] = []

  // if not testing
  if (typeof window.process === 'undefined') {
    for (let i = 0; i <= 5; i++) {
      const randomBool = Math.random() >= 0.5

      if (randomBool) {
        mockedTimes.push(`${i}${i}:${i}${i}`)
        continue
      }

      mockedTimes.push(null)
    }
  }

  export const formatHeader = (date: Dayjs) => {
    return date.format('ddd MMM DD')
  }
</script>

<style>
  .date-cell-container {
    flex: 1;
    margin-right: 2px;
  }
</style>

<div class="date-cell-container" title="Click on the cell for more detail">
  <div class={$themeStore.dateCellHeader}>{formatHeader(date)}</div>
  <div class={$themeStore.timeCellsContainer}>
    {#each mockedTimes as startTime}
      <TimeCell {date} {startTime} {handleOnClickCell} />
    {/each}
  </div>
</div>
