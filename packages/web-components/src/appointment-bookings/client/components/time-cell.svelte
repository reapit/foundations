<script>
  import { themeStore  } from '../core/store/theme-store'
  import { handleSubmitFormStep2 } from '../handlers/submit-form-step2.ts'

  export let date
  export let startTime = ''
  export let handleNextStep

  const onDateCellClick = () => {
    handleSubmitFormStep2(handleNextStep, date.format('dddd, DD MMMM'), startTime)
  }
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
    pointer-events: none;
  }
</style>

<div on:click={onDateCellClick} class="time-cell-container {startTime ? 'time-cell-container-visible' : 'time-cell-container-not-visible'} {$themeStore.timeCell}">
  <div>{startTime || ''}</div>
</div>
