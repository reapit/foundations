<script>
  import { themeStore } from '../core/store/theme-store'
  import { onMount } from 'svelte'
  import ClickOutSide from './click-out-side.svelte'
  import { resetCSS, generateThemeClasses } from '../../../common/styles'
  import { generateAppointmentBookingThemeClasses } from '../core/theme'
  import FormStep1 from './form-step1.svelte'
  import PlannerStep2 from './planner-step2.svelte'
  import BookingConfirmationStep3 from './booking-confirmation-step3.svelte'

  export let theme
  export let parentSelector
  // TODO - will need to import later
  // export let apiKey
  // export let variant

  let isModalOpen = false
  let currentStep = 1

  const handleNextStep = () => {
    currentStep += 1
  }

  const handlePreviousStep = () => {
    currentStep -= 1
  }

  const toggleModal = e => {
    isModalOpen = !isModalOpen

    // click event of component 'ClickOutSide' is added before this event buble up -> break toggle behavior
    e.stopPropagation()
  }

  const themeClasses = {
    ...generateThemeClasses(theme, parentSelector),
    ...generateAppointmentBookingThemeClasses(theme, parentSelector),
  }

  onMount(() => {
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

  .appointment-bookings-select-button {
    padding: 0.5em;
    font-size: 1em;
  }
</style>

<button on:click={toggleModal} class="appointment-bookings-select-button">Select Appointment</button>
{#if isModalOpen}
  <div data-testid="appointment-bookings-modal-wrapper" class="appointment-bookings-modal-wrapper">
    <ClickOutSide on:click-out-side={toggleModal}>
      <div class="{resetCSS} {themeClasses.globalStyles} {themeClasses.bodyText} appointment-bookings-modal-container">
        {#if currentStep === 1}
          <FormStep1 {toggleModal} {handleNextStep} {themeClasses} />
        {/if}

        {#if currentStep === 2}
          <PlannerStep2 {themeClasses} {handleNextStep} />
        {/if}

        {#if currentStep === 3}
          <BookingConfirmationStep3 {themeClasses} {handlePreviousStep}/>
        {/if}
      </div>
    </ClickOutSide>
  </div>
{/if}