<script lang="ts">
  import Fa from 'svelte-fa'
  import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import { formOneStore } from '../core/store/form-store'
  import { handleSubmitFormStepOne } from '../handlers/submit-form-step-one'
  import { themeStore } from '../core/store/theme-store'
  export let handleNextStep: () => void
  export let toggleModal: (e: Event) => void
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

<form on:submit|preventDefault={handleSubmitFormStepOne(handleNextStep)} class="form-step1-wrap">
  <div class="form-step1-header">
    <span on:click={toggleModal} class="form-step1-header-back" href="/">
      <Fa class={$themeStore.svgNavigation} icon={faChevronLeft} />
    </span>
    <h3 class="form-step1-header-title {$themeStore.formHeader}">Book a Valuation</h3>
  </div>

  <p class="form-step1-sub-title">
    To book a valuation, please select the type of valuation you require and enter your email address and postcode
  </p>

  <hr class={$themeStore.formSeparator} />

  <div class="form-step1-form-block {$themeStore.formBlock}">
    <label class="form-step1-label-block {$themeStore.formLabel}" for="looking-for">Looking for</label>
    <div id="looking-for" class="form-step1-value-block">
      <input
        bind:group={$formOneStore.lookingFor.value}
        name="looking-for"
        id="sell-a-property"
        type="radio"
        value="sell" />
      <label for="sell-a-property">Sell a property</label>
      <input bind:group={$formOneStore.lookingFor.value} name="looking-for" id="let-a-property" type="radio" value="let" />
      <label for="let-a-property">Let a property</label>
      {#if !$formOneStore.lookingFor.valid}
        <p class={$themeStore.formError}>Please select a valid type</p>
      {/if}
    </div>
  </div>

  <hr class={$themeStore.formSeparator} />

  <div class="form-step1-form-block {$themeStore.formBlock}">
    <label class="form-step1-label-block {$themeStore.formLabel}" for="your-email">Email*</label>
    <div class="form-step1-value-block">
      <input
        novalidate
        bind:value={$formOneStore.email.value}
        class={$themeStore.formInput}
        type="email"
        id="your-email"
        placeholder="Your e-mail address" />
      {#if !$formOneStore.email.valid}
        <p class={$themeStore.formError}>Please enter a valid email address</p>
      {/if}
    </div>
  </div>

  <hr class={$themeStore.formSeparator} />

  <div class="form-step1-form-block {$themeStore.formBlock}">
    <label class="form-step1-label-block {$themeStore.formLabel}" for="postcode">Postcode*</label>
    <div class="form-step1-value-block">
      <input
        bind:value={$formOneStore.postCode.value}
        class={$themeStore.formInput}
        type="text"
        id="postcode"
        placeholder="Postcode of the property" />

      {#if !$formOneStore.postCode.valid}
        <p class={$themeStore.formError}>Please enter your postcode</p>
      {/if}
    </div>
  </div>

  <hr class={$themeStore.formSeparator} />

  <div class="form-step1-form-block {$themeStore.formBlock}">
    <label class="form-step1-label-block {$themeStore.formLabel}" for="submit" />
    <div class="form-step1-button-group">
      <button
        data-testid="submit-button-form1"
        type="submit"
        class="form-step1-button-get-appointments {$themeStore.formButtonPrimary}">
        Get Appointments
      </button>
    </div>
  </div>

</form>
