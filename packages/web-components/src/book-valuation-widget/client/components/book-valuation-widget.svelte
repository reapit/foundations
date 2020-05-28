<script>
  import { themeStore } from '../core/store/theme-store'
  import { onMount } from 'svelte'
  import ClickOutSide from '../../../common/components/click-out-side.svelte'
  import { resetCSS, generateThemeClasses } from '../../../common/styles'
  import { generateBookValuationWidgetThemeClasses } from '../core/theme'
  import FormStep1 from './form-step1.svelte'
  import PlannerStep2 from '../../../appointment-planner-component/client/components/appointment-planner-component.svelte'
  import BookingConfirmationStep3 from './booking-confirmation-step3.svelte'
  import { handleSubmitFormStep2 } from '../handlers/submit-form-step2.ts'

  export let theme
  export let parentSelector
  // TODO - will need to import later
  // export let apiKey
  // export let variant
  // export let customerId
  // export let propertyId

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

  const onDateCellClick = ({ appointmentDate, appointmentTime }) => {
    handleSubmitFormStep2(appointmentDate.format('dddd, DD MMMM'), appointmentTime, handleNextStep)
  }

  const themeClasses = {
    ...generateThemeClasses(theme, parentSelector),
    ...generateBookValuationWidgetThemeClasses(theme, parentSelector),
  }

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

<button on:click={toggleModal} class="book-valuation-select-button">Book a Valuation</button>
{#if isModalOpen}
  <div data-testid="book-valuation-modal-wrapper" class="book-valuation-modal-wrapper">
    <ClickOutSide on:click-out-side={toggleModal}>
      <div class="{resetCSS} {themeClasses.globalStyles} {themeClasses.bodyText} book-valuation-modal-container">
        {#if currentStep === 1}
          <FormStep1 {toggleModal} {handleNextStep} {themeClasses} />
        {/if}

        {#if currentStep === 2}
          <PlannerStep2 {themeClasses} {handleNextStep} handleOnClickCell={onDateCellClick} />
        {/if}

        {#if currentStep === 3}
          <BookingConfirmationStep3 {themeClasses} {handlePreviousStep} />
        {/if}
      </div>
    </ClickOutSide>
  </div>
{/if}
