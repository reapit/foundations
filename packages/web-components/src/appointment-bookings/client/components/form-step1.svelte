<script>
  import Fa from 'svelte-fa'
  import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import { formStore } from '../core/store/form-store.ts'
  import { handleSubmitFormStep1 } from '../handlers/submit-form-step1.ts'

  export let themeClasses
  export let handleNextStep
  export let toggleModal

  const {
    svgNavigation,
    formLabel,
    formBlock,
    formInput,
    formHeader,
    formSeparator,
    formButtonPrimary,
    formButtonSecondary,
    formError,
  } = themeClasses
</script>

<style>
  input[type='email'],
  input[type='text'] {
    width: 100%;
  }
  .form-step1-wrap {
    min-width: 30rem;
  }
  .form-step1-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .form-step1-header-back {
    flex-grow: 0;
    cursor: pointer;
  }
  .form-step1-header-title {
    flex-grow: 1;
    text-align: center;
  }
  .form-step1-sub-title {
    color: #737373;
    margin-bottom: 1.5rem;
  }
  .form-step1-form-block {
    display: flex;
    align-items: center;
  }
  .form-step1-label-block {
    flex: 0 0 30%;
  }
  .form-step1-value-block {
    flex: 1 0 70%;
  }
  .form-step1-button-group {
    width: 100%;
    display: flex;
  }
  .form-step1-button-get-appointments {
    flex: 1 0 70%;
  }
  .form-step1-button-cancel {
    flex: 0 0 30%;
  }
</style>

<form on:submit|preventDefault={handleSubmitFormStep1(handleNextStep)} class="form-step1-wrap">
  <div class="form-step1-header">
    <span on:click={toggleModal} class="form-step1-header-back" href="/">
      <Fa class={svgNavigation} icon={faChevronLeft} />
    </span>
    <h3 class="form-step1-header-title {formHeader}">Book a Valuation</h3>
  </div>

  <p class="form-step1-sub-title">To book a valuation, please enter your e-mail address below</p>

  <hr class={formSeparator} />

  <div class="form-step1-form-block {formBlock}">
    <label class="form-step1-label-block {formLabel}" for="looking-for">Looking for</label>
    <div id="looking-for" class="form-step1-value-block">
      <input
        bind:group={$formStore.lookingFor.value}
        name="looking-for"
        id="sell-a-property"
        type="radio"
        value="sell" />
      <label for="sell-a-property">Sell a property</label>
      <input bind:group={$formStore.lookingFor.value} name="looking-for" id="let-a-property" type="radio" value="let" />
      <label for="let-a-property">Let a property</label>
      {#if !$formStore.lookingFor.valid}
        <p class={formError}>Please select a valid type</p>
      {/if}
    </div>
  </div>

  <hr class={formSeparator} />

  <div class="form-step1-form-block {formBlock}">
    <label class="form-step1-label-block {formLabel}" for="your-email">Email*</label>
    <div class="form-step1-value-block">
      <input
        novalidate
        bind:value={$formStore.email.value}
        class={formInput}
        type="email"
        id="your-email"
        placeholder="Your e-mail address" />
      {#if !$formStore.email.valid}
        <p class={formError}>Please enter a valid email address</p>
      {/if}
    </div>
  </div>

  <hr class={formSeparator} />

  <div class="form-step1-form-block {formBlock}">
    <label class="form-step1-label-block {formLabel}" for="postcode">Postcode*</label>
    <div class="form-step1-value-block">
      <input
        bind:value={$formStore.postCode.value}
        class={formInput}
        type="text"
        id="postcode"
        placeholder="Postcode of the property" />

      {#if !$formStore.postCode.valid}
        <p class={formError}>Please enter a valid postcode</p>
      {/if}
    </div>
  </div>

  <hr class={formSeparator} />

  <div class="form-step1-form-block {formBlock}">
    <label class="form-step1-label-block {formLabel}" for="submit" />
    <div class="form-step1-button-group">
      <button
        data-testid="submit-button-form1"
        type="submit"
        class="form-step1-button-get-appointments {formButtonPrimary}">
        Get Appointments
      </button>
      <button on:click={toggleModal} class="form-step1-button-cancel {formButtonSecondary}">Cancel</button>
    </div>
  </div>

</form>
