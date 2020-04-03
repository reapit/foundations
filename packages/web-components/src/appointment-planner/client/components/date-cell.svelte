<script>
  import TimeCell from './time-cell.svelte'
  import dayjs from 'dayjs'

  export let date

  // generate dummy meeting slots between 00-00 -> 10-00 - duration - on hours
  export const mockedTimes = []

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

  export const formatHeader = date => {
    return date.format('ddd MMM DD')
  }
</script>

<style>
  .date-cell-container {
    flex: 1;
    margin-right: var(--cellSpacing);
  }

  .time-cell-container {
    background: #f2f2f2;
  }

  .date-cell-header {
    padding: 10px;
    font-weight: bold;
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    margin-bottom: 2px;
    min-height: 36px;
  }
</style>

<div class="date-cell-container" title="Click on the cell for more detail">
  <div class="date-cell-header">{formatHeader(date)}</div>
  <div class="time-cell-container">
    {#each mockedTimes as startTime}
      <TimeCell {startTime} />
    {/each}
  </div>
</div>
