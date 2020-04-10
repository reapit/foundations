<script>
  import Fa from 'svelte-fa'
  import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import { formStore } from '../core/store/form-store.ts'
  import { handleSubmitFormStep1 } from '../handlers/submit-form-step1.ts'

  export let themeClasses
  export let handleNextStep

  const {
    svgNavigation,
    formLabel,
    formBlock,
    formInput,
    formHeader,
    formSeparator,
    formButtonPrimary,
    formButtonSecondary,
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

<form on:submit|preventDefault={handleSubmitFormStep1($formStore, handleNextStep)} class="form-step1-wrap">
  <div class="form-step1-header">
    <span class="form-step1-header-back" href="/">
      <Fa class={svgNavigation} icon={faChevronLeft} />
    </span>
    <h3 class="form-step1-header-title {formHeader}">Book a Valuation</h3>
  </div>

  <p class="form-step1-sub-title">To book a valuation, please enter your e-mail address below</p>

  <hr class={formSeparator} />

  <div class="form-step1-form-block {formBlock}">
    <label class="form-step1-label-block {formLabel}" for="looking-for">Looking for</label>
    <div id="looking-for" class="form-step1-value-block">
      <input bind:group={$formStore.lookingFor} name="looking-for" id="sell-a-property" type="radio" value="sell" />
      <label for="sell-a-property">Sell a property</label>

      <input bind:group={$formStore.lookingFor} name="looking-for" id="let-a-property" type="radio" value="let" />
      <label for="let-a-property">Let a property</label>
    </div>
  </div>

  <hr class={formSeparator} />

  <div class="form-step1-form-block {formBlock}">
    <label class="form-step1-label-block {formLabel}" for="your-email">Email*</label>
    <div class="form-step1-value-block">
      <input
        required
        bind:value={$formStore.email}
        class={formInput}
        type="email"
        id="your-email"
        placeholder="Your e-mail address" />
    </div>
  </div>

  <hr class={formSeparator} />

  <div class="form-step1-form-block {formBlock}">
    <label class="form-step1-label-block {formLabel}" for="postcode">Postcode*</label>
    <div class="form-step1-value-block">
      <input
        required
        bind:value={$formStore.postCode}
        class={formInput}
        type="text"
        id="postcode"
        placeholder="Postcode of the property" />
    </div>
  </div>

  <hr class={formSeparator} />

  <div class="form-step1-form-block {formBlock}">
    <label class="form-step1-label-block {formLabel}" for="submit" />
    <div class="form-step1-button-group">
      <button type="submit" class="form-step1-button-get-appointments {formButtonPrimary}">Get Appointments</button>
      <button class="form-step1-button-cancel {formButtonSecondary}">Cancel</button>
    </div>
  </div>

</form>
