<script>
  import { css } from 'emotion'
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
  let image
  let backgroundImage
  let correctEmail = true

  const themeClasses = generateThemeClasses(theme, parentSelector)
  const { globalStyles } = themeClasses

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
    image = store.image
  })

  function updateImage(image) {
    backgroundImage = css`
      background: url(${image});
    `
  }

  $: updateImage(image)

  onMount(() => {
    viewBookingStore.update(values => ({
      ...values,
      initializers: {
        theme,
        apiKey,
        parentSelector,
      },
      themeClasses,
      image:
        'https://tracker.reapit.net/demo/_demo/webservice/rest/property/rps_demo-SCO190002/thumbnail?ApiKey=8ed799bbe77c96311e71f64b99ec2ddde765d13a&Width=480&Height=285&Crop=1',
    }))
  })
  onDestroy(() => unsubscribe())
</script>

<style>
  .viewing_booking-btn {
    padding: 0.5em;
    font-size: 1em;
  }
  .viewing-booking-email-form {
    padding: 0.5em 1em;
  }
  .viewing-booking-email-form::after {
    content: '';
    clear: both;
    display: block;
  }
  .viewing-booking-email-form p {
    padding: 0.5em 0;
    line-height: 1em;
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
    border: 1px solid #ddd;
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
    color: #ffffff;
    padding: 0.5em;
    box-sizing: border-box;
    font-size: 1.1em;
  }
  .property-image h4 strong {
    float: right;
    font-weight: 600;
  }
  .viewing-booking-form-submit {
    width: 100%;
    padding: 0.25em 1em 1em;
    box-sizing: border-box;
  }
  .viewing-booking-form-submit button {
    width: 100%;
    padding: 0.3em;
    border-radius: 3px;
    background: #f2f2f2;
    border: 1px solid #ddd;
    font-size: inherit;
    outline: none;
  }
  .viewing-booking-form-submit button:hover {
    cursor: pointer;
    background: #00a7e3;
    color: #ffffff;
    border: 1px solid #00a7e3;
  }
  .invaild-email {
    float: right;
    color: #d8000c;
    font-size: 0.8em;
  }
</style>

<button on:click={handleToggleModal} class="viewing_booking-btn">Book a viewing</button>
<ViewingBookingModal
  isOpen={isModalOpen}
  closeModal={handleToggleModal}
  {isLoading}
  title="Book a Viewing"
  className="{globalStyles}
  {resetCSS}">

  <form on:submit|preventDefault={submitForm}>
    <div class="property-image {backgroundImage}">
      <h4>
        Kirknewton, Midlothian
        <strong>£1,700,000</strong>
      </h4>
    </div>
    <div class="viewing-booking-email-form">
      <p>To book a viewing, please enter your e-mail below.</p>
      <label for="viewing-booking-email">E-mail*</label>
      <input type="email" id="viewing-booking-email" on:input={handleInput} placeholder="Your e-mail address" />
      {#if !correctEmail}
        <p class="invaild-email">Please enter a valid e-mail address</p>
      {/if}
    </div>
    <div class="viewing-booking-form-submit">
      <button type="submit">Get Appointments</button>
    </div>
  </form>
</ViewingBookingModal>
