<script lang="ts">
  import { onMount } from 'svelte'
  import { weekStore } from '../core/week-store'
  import { themeStore } from '../core/theme-store'
  import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import DateTimePicker from './date-time-picker.svelte'
  import * as Theme from '../../../common/styles/types'
  export let themeClasses: Theme.ThemeBookingClasses
  export let handleOnClickCell: ({ appointmentDate: Dayjs, appointmentTime: number }) => void

  onMount(() => {
    themeStore.update(values => ({
      ...values,
      ...themeClasses,
    }))
  })
</script>

<style>
  .appointment-planner-component-modal-header-container button {
    cursor: pointer;
    border: none;
    background: transparent;
  }
  .appointment-planner-component-modal-header-container h1 {
    font-weight: bold;
    font-size: 1.5em;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .appointment-planner-component-modal-header-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
  }
</style>

<div
  data-testid="appointment-planner-component-modal-header-container"
  class="appointment-planner-component-modal-header-container">
  <button data-testid="prev-week" on:click={weekStore.decrement}>
    <Fa class="{$themeStore.svgNavigation}" icon={faChevronLeft} />
  </button>
  <h1 class={$themeStore.primaryHeading}>Choose an Appointment</h1>
  <button data-testid="next-week" on:click={weekStore.increment}>
    <Fa class="{$themeStore.svgNavigation}" icon={faChevronRight} />
  </button>
  <div />
</div>
<DateTimePicker {handleOnClickCell} />
