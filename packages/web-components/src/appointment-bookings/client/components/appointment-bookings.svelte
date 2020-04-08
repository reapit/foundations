<script>
  import { weekStore } from '../core/store/week-store'
  import { themeStore } from '../core/store/theme-store'
  import {onMount} from 'svelte'
  import Fa from 'svelte-fa'
  import ClickOutSide from './click-out-side.svelte'

  import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import { resetCSS, generateThemeClasses } from '../../../common/styles'
  import { generateAppointmentBookingThemeClasses } from '../core/theme'
  import DateTimePicker from './date-time-picker.svelte'

  export let theme
  export let parentSelector

  // TBC
  // export let variant

  let isModalOpen = false

  const toggleModal = e => {
    isModalOpen = !isModalOpen

    // click event of component 'ClickOutSide' is added before this event buble up -> break toggle behavior
    e.stopPropagation()
  }

  const themeClasses = {
    ...generateThemeClasses(theme, parentSelector),
    ...generateAppointmentBookingThemeClasses(theme, parentSelector),
  }
  const { button, svgNavigation } = themeClasses

onMount(()=>{

  themeStore.set(themeClasses)
})

</script>

<style>
  .appointment-bookings-modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    background: #00000052;
  }

  .appointment-bookings-modal-container {
    padding: 1.5em;
    box-shadow: 1px 1px 7px 1px #d4d4d4;
    border-radius: 4px;
    overflow: scroll;
  }

  .appointment-bookings-modal-header-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
  }

  .appointment-bookings-modal-header-container h1 {
    font-weight: bold;
    font-size: 1.5em;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .appointment-bookings-modal-header-container button {
    cursor: pointer;
    border: none;
    background: transparent;
  }

  .appoitment-bookings-select-button {
    padding: 0.5em;
    font-size: 1em;
  }
</style>

<button on:click={toggleModal} class="appoitment-bookings-select-button">Select Appointment</button>
{#if isModalOpen}
  <div data-testid="appointment-bookings-modal-wrapper" class="appointment-bookings-modal-wrapper">
    <div class="{resetCSS} { themeClasses.globalStyles } { themeClasses.bodyText } appointment-bookings-modal-container">
      <ClickOutSide on:click-out-side={toggleModal}>
        <div data-testid="appointment-booking-modal">
          <div data-testid="appointment-bookings-modal-header-container" class="appointment-bookings-modal-header-container">
            <button on:click={weekStore.decrement}>
              <Fa class=" {svgNavigation}" icon={faChevronLeft} />
            </button>

            <h1 class={themeClasses.primaryHeading}>Choose an Appointment</h1>

            <button on:click={weekStore.increment}>
              <Fa class=" {svgNavigation}" icon={faChevronRight} />
            </button>
            <div />
          </div>

          <DateTimePicker />
        </div>
      </ClickOutSide>
    </div>
  </div>
{/if}
