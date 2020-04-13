<script>
  import { weekStore } from '../core/store/week-store'
  import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import DateTimePicker from './date-time-picker.svelte'

  export let themeClasses
  const { svgNavigation } = themeClasses
</script>

<style>
  .appointment-bookings-modal-header-container button {
    cursor: pointer;
    border: none;
    background: transparent;
  }
  .appointment-bookings-modal-header-container h1 {
    font-weight: bold;
    font-size: 1.5em;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .appointment-bookings-modal-header-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
  }
</style>

<div data-testid="appointment-bookings-modal-header-container" class="appointment-bookings-modal-header-container">
  <button data-testid="prev-week" on:click={weekStore.decrement}>
    <Fa class=" {svgNavigation}" icon={faChevronLeft} />
  </button>
  <h1 class={themeClasses.primaryHeading}>Choose an Appointment</h1>
  <button data-testid="next-week" on:click={weekStore.increment}>
    <Fa class=" {svgNavigation}" icon={faChevronRight} />
  </button>
  <div />
</div>
<DateTimePicker />
