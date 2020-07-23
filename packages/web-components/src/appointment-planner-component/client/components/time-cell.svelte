<script lang="ts">
  export let date
  export let startTime = ''
  export let handleOnClickCell
  export let themeClasses

  const handleTimeCellClick = () => {
    handleOnClickCell && handleOnClickCell({ appointmentDate: date, appointmentTime: startTime })
  }
</script>

<style>
  .time-cell-container {
    padding: 1em;
    margin-bottom: 2px;
    cursor: pointer;
    min-height: 50px;
  }

  .time-cell-container-visible {
    visibility: visible;
  }

  .time-cell-container-not-visible {
    visibility: hidden;
    pointer-events: none;
  }
</style>

<div
  on:click={handleTimeCellClick}
  class="time-cell-container {startTime ? 'time-cell-container-visible' : 'time-cell-container-not-visible'}
  {themeClasses.timeCell}">
  <div>{startTime || ''}</div>
</div>
