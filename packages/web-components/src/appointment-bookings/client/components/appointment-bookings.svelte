<script>
  import { weekStore } from '../core/store/week-store'
  import { themeStore  } from '../core/store/theme-store'
  import Fa from 'svelte-fa'
  import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import {resetCSS, generateThemeClasses} from '../../../common/styles'
  import {generateAppointmentBookingThemeClasses} from '../core/theme'
  import cx from 'classnames'

  export let theme
  export let parentSelector

  const themeClasses = {...generateThemeClasses(theme, parentSelector), ...generateAppointmentBookingThemeClasses(theme)}


  themeStore.set(themeClasses)

  import DateTimePicker from './date-time-picker.svelte'
  import { apointmentPlannerSvg } from '../styles/appointment-bookings.styles'
</script>

<style>
  :root {
    --cellSpacing: 2px;
  }

  .appointment-bookings-container {
    padding: 20px;
    box-shadow: 1px 1px 7px 1px #d4d4d4;
    border-radius: 4px;
    overflow: scroll;
  }

  .appointment-bookings-header-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .appointment-bookings-header-container h1 {
      font-weight: bold;
      font-size: 1.5rem;
      margin-left: auto;
      margin-right: auto;
    }

  .appointment-bookings-header-container button {
      cursor: pointer;
      border: none;
      background: transparent;
    }
</style>

<div class={cx(resetCSS, themeClasses.globalStyles, themeClasses.bodyText, 'appointment-bookings-container')}>
  <div class='appointment-bookings-header-container'>
    <button on:click={weekStore.decrement}>
      <Fa class={cx(apointmentPlannerSvg, themeClasses.svgNavigation)} icon={faChevronLeft} />
    </button>

    <h1 class={themeClasses.primaryHeading}>Choose an Appointment</h1>

    <button on:click={weekStore.increment}>
      <Fa class={cx(apointmentPlannerSvg, themeClasses.svgNavigation)} icon={faChevronRight} />
    </button>
    <div />
  </div>

  <DateTimePicker />
</div>
