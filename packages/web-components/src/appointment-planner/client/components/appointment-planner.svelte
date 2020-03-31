<script>
  import { weekStore } from '../core/store/week-store'
  import Fa from 'svelte-fa'
  import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import * as commonStyles from '../../../common/styles/index'
  import cx from 'classnames'

  import DateTimePicker from './date-time-picker.svelte'

  import { apointmentPlannerSvg } from '../styles/appointment-planner.styles'
  import {generateGlobalTheme} from '../core/theme'

  export let theme = {}

  generateGlobalTheme(theme)
</script>

<style type="text/scss">

  .appointment-planner__container {
    padding: 20px;
    box-shadow: 1px 1px 7px 1px #d4d4d4;
    border-radius: 4px
  }

  .appointment-planner__header-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    h1 {
      font-weight: bold;
      font-size: 1.5rem;
      margin-left: auto;
      margin-right: auto;
    }

    button {
      cursor: pointer;
      border: none;
      background: transparent;
    }
  }
</style>

<div class={cx(commonStyles.resetCSS, 'appointment-planner__container')}>
  <div class={'appointment-planner__header-container'}>
    <button on:click={weekStore.decrement}>
      <Fa class={apointmentPlannerSvg} icon={faChevronLeft} />
    </button>

    <h1>Choose an Appointment</h1>

    <button on:click={weekStore.increment}>
      <Fa class={apointmentPlannerSvg} icon={faChevronRight} />
    </button>
    <div />
  </div>

  <DateTimePicker />
</div>
