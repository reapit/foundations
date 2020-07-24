<script lang="ts">
  import { themeStore } from '../core/store/theme-store'
  import { onMount } from 'svelte'
  import ClickOutSide from '../../../common/components/click-out-side.svelte'
  import { resetCSS, generateBookingThemeClasses } from '../../../common/styles'
  import FormStepOne from './form-step-one.svelte'
  import PlannerStepTwo from '../../../appointment-planner-component/client/components/appointment-planner-component.svelte'
  import BookingConfirmationStepThree from './booking-confirmation-step-three.svelte'
  import { handleSubmitFormStepTwo } from '../handlers/submit-form-step-two'
  import * as Theme from '../../../common/styles/types'

  export let theme: Theme.ThemeBookingInitializer
  export let parentSelector: string

  let isModalOpen = false
  let currentStep = 1

  const handleNextStep = () => {
    currentStep += 1
  }

  const handlePreviousStep = () => {
    currentStep -= 1
  }

  const toggleModal = (e: Event) => {
    isModalOpen = !isModalOpen

    // click event of component 'ClickOutSide' is added before this event buble up -> break toggle behavior
    e.stopPropagation()
  }

  const onDateCellClick = ({ appointmentDate, appointmentTime }) => {
    handleSubmitFormStepTwo(appointmentDate.format('dddd, DD MMMM'), appointmentTime, handleNextStep)
  }

  const themeClasses: Theme.ThemeBookingClasses = generateBookingThemeClasses(theme, parentSelector)

  onMount(() => {
    themeStore.set(themeClasses)
  })
</script>

<style>
  .book-valuation-modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00000052;
    z-index: 1000;
  }

  .book-valuation-modal-container {
    padding: 1.5em;
    box-shadow: 1px 1px 7px 1px #d4d4d4;
    box-sizing: border-box;
    border-radius: 4px;
  }

  .book-valuation-select-button {
    padding: 0.5em;
    font-size: 1em;
  }
</style>

<button on:click={toggleModal} class="{$themeStore.button} book-valuation-select-button">Book a Valuation</button>
{#if isModalOpen}
  <div data-testid="book-valuation-modal-wrapper" class="book-valuation-modal-wrapper">
    <ClickOutSide on:click-out-side={toggleModal}>
      <div class="{resetCSS} {$themeStore.globalStyles} {$themeStore.bodyText} book-valuation-modal-container">
        {#if currentStep === 1}
          <FormStepOne {toggleModal} {handleNextStep} />
        {/if}

        {#if currentStep === 2}
          <PlannerStepTwo {themeClasses} handleOnClickCell={onDateCellClick} />
        {/if}

        {#if currentStep === 3}
          <BookingConfirmationStepThree {handlePreviousStep} />
        {/if}
      </div>
    </ClickOutSide>
  </div>
{/if}
