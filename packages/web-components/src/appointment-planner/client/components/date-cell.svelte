<script>
  import TimeCell from './time-cell.svelte'
  import dayjs from 'dayjs'

  export let date

  // generate dummy meeting between 00-00 -> 10-00 - duration - on hours
  export const mockedTimes = []
  for (let i = 0; i <= 5; i++) {
    const randomBool = Math.random() >= 0.5

    if (randomBool) {
      mockedTimes.push(`${i}${i}:${i}${i}`)
      continue;
    }

    mockedTimes.push(null)
  }

  export const formatHeader = date => {
    return date.format('ddd MMM DD')
  }
</script>

<style>
  .date-cell__container {
    flex: 1;
    margin-right: var(--cellSpacing)

  }

  .time-cell__container {
    background: #F2F2F2;
  }

  .date-cell__header {
    padding: 10px;
    font-weight: bold;
    background: #F2F2F2;
    display: flex;
    justify-content: center;
    margin-bottom: 2px;
    min-height: 36px;
  }
</style>

<div class="date-cell__container" title="Click on the cell for more detail">
  <div class="date-cell__header">{formatHeader(date)}</div>
  <div class="time-cell__container">
    {#each mockedTimes as startTime}
      <TimeCell {startTime} />
    {/each}
  </div>
</div>
