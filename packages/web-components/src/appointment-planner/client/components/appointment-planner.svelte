<script>
  import { weekStore, derrivedDayOfWeek } from '../core/store/week-store'
  import Fa from 'svelte-fa'
  import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import * as commonStyles from '../../../common/styles/index'
  import cx from 'classnames'

  import {apointmentPlannerSvg} from '../styles/appointment-planner.styles'
</script>

<style type="text/scss">
.appointment-planner__container {
  display: flex;
  justify-content: center;

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
  <button on:click={weekStore.decrement}>
    <Fa class="{apointmentPlannerSvg}" icon={faChevronLeft} />
  </button>

  <h1>Choose an Appointment</h1>

  <button on:click={weekStore.increment}>
    <Fa class="{apointmentPlannerSvg}" icon={faChevronRight} />
  </button>
  <div />
</div>
