<script>
  import { css } from 'emotion'
  import { getProperty } from '../api/property'
  import { generateThemeClasses, resetCSS } from '../../../common/styles'
  import { onMount, onDestroy } from 'svelte'
  import ViewingBookingModal from '../../../common/components/modal.svelte'
  import viewBookingStore from '../core/store'
  import { validateEmail } from '../../../common/utils/validate'

  export let theme
  export let apiKey
  export let parentSelector
  export let submitAction

  let isModalOpen = true
  let isLoading

  let email
  let inputValue

  let propertyData

  let backgroundImage
  let correctEmail = true

  const themeClasses = generateThemeClasses(theme, parentSelector)

  function handleToggleModal() {
    isModalOpen = !isModalOpen
  }

  function handleInput({ target }) {
    inputValue = target.value
    viewBookingStore.update(values => ({
      ...values,
      email: inputValue,
    }))
  }

  function submitForm() {
    correctEmail = validateEmail(email)
    correctEmail && submitAction && submitAction(email)
  }

  const unsubscribe = viewBookingStore.subscribe(store => {
    isLoading = store.isLoading
    email = store.email
    propertyData = store.propertyData
  })

  function updateImage(propertyData) {
    backgroundImage = css`
      background: url(${propertyData && propertyData.image});
    `
  }
  $: updateImage(propertyData)

  onMount(async () => {
    isLoading = true
    const propertyData = await getProperty()
    viewBookingStore.update(values => ({
      ...values,
      initializers: {
        theme,
        apiKey,
        parentSelector,
      },
      themeClasses,
      propertyData,
    }))
    isLoading = false
  })

  onDestroy(() => unsubscribe())
</script>

<style>
  .viewing_booking-btn {
    padding: 0.5em;
    font-size: 1em;
  }
  .viewing-booking-email-form {
    padding: 0.5em;
  }
  .viewing-booking-email-form::after {
    content: '';
    clear: both;
    display: block;
  }
  .viewing-booking-email-form p {
    padding: 0.5em 0;
    line-height: 1em;
    margin-bottom: 0.5em !important;
  }
  .viewing-booking-email-form label {
    float: left;
    padding: 0.5em 0;
    line-height: 1em;
  }
  .viewing-booking-email-form input {
    width: 80%;
    float: right;
    height: 2em;
    border-radius: 3px;
    outline: none;
    padding: 0 0.5em;
  }
  .property-image {
    background-size: cover;
    padding: 1em;
    padding-top: 62.5%;
    position: relative;
  }
  .property-image h4 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
    font-size: 1.1em;
    background: linear-gradient(transparent, #c8c8c8);
  }
  .property-image h4 strong {
    float: right;
    font-weight: 600;
  }
  .viewing-booking-form-submit {
    width: 100%;
    padding: 0.5em 0.5em 1em;
    box-sizing: border-box;
  }
  .viewing-booking-form-submit button {
    width: 100%;
    padding: 0.3em;
    border-radius: 3px;
    cursor: pointer;
  }

  .invaild-email {
    float: right;
    color: #d8000c;
    font-size: 0.8em;
    padding: 0.5em;
  }
</style>

<button on:click={handleToggleModal} class="viewing_booking-btn">Book a viewing</button>
<ViewingBookingModal
  isOpen={isModalOpen}
  closeModal={handleToggleModal}
  {isLoading}
  title="Book a Viewing"
  className="{themeClasses.globalStyles}
  {resetCSS}">

  <form on:submit|preventDefault={submitForm}>
    <div class="property-image {backgroundImage}">
      <h4>
        {propertyData && propertyData.address}
        <strong>{propertyData && propertyData.price}</strong>
      </h4>
    </div>
    <div class="viewing-booking-email-form">
      <p class={themeClasses.bodyText}>To book a viewing, please enter your e-mail below.</p>
      <label class={themeClasses.secondaryStrapline} for="viewing-booking-email">E-mail*</label>
      <input
        class={themeClasses.input}
        type="email"
        id="viewing-booking-email"
        on:input={handleInput}
        placeholder="Your e-mail address" />
      {#if !correctEmail}
        <span class="invaild-email {themeClasses.errorText}">Please enter a valid e-mail address</span>
      {/if}
    </div>
    <div class="viewing-booking-form-submit">
      <button class={themeClasses.button} type="submit">Get Appointments</button>
    </div>
  </form>
</ViewingBookingModal>
