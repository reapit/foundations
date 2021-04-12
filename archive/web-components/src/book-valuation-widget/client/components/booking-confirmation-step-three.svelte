<script lang="ts">
  import Fa from 'svelte-fa'
  import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
  import { formOneStore, formTwoStore, formThreeStore, FormThreeDataStore } from '../core/store/form-store'
  import { handleSubmitFormStepThree } from '../handlers/submit-form-step-three'
  import * as Theme from '../../../common/styles/types'

  export let handlePreviousStep: () => void
  export let themeClasses: Theme.ThemeBookingClasses

  let isChecked = Boolean($formThreeStore.marketingCommunication.value)

  const {
    svgNavigation,
    formLabel,
    formInput,
    formHeader,
    formSeparator,
    formButtonPrimary,
    formError,
  } = themeClasses

  const handleFormSubmitCallback = (formDataStore: FormThreeDataStore) => {
    console.log(JSON.stringify(formDataStore))
  }
</script>

<style>
  input[type='text'],
  textarea {
    width: 100%;
  }
  textarea {
    height: 100%;
  }
  .form-step3-wrap {
    min-width: 30rem;
  }
  .form-step3-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .form-step3-header-back {
    flex-grow: 0;
    cursor: pointer;
  }
  .form-step3-header-title {
    flex-grow: 1;
    text-align: center;
  }
  .form-step3-sub-title {
    margin-bottom: 1.5rem;
  }
  .field:not(:last-child) {
    margin-bottom: 0.75rem;
  }
  .field.is-horizontal {
    display: flex;
  }
  .field-label {
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
    flex: 0 0 30%;
    text-align: left;
  }
  .field-body .field .field {
    margin-bottom: 0;
  }
  .field .control {
    box-sizing: border-box;
  }
  .field-body {
    display: flex;
    flex-basis: 0;
    flex-grow: 5;
    flex-shrink: 1;
  }
  .field-body .field {
    margin-bottom: 0;
  }
  .field-body > .field {
    flex-shrink: 1;
  }
  .field-body > .field:not(.is-narrow) {
    flex-grow: 1;
  }
  .field-body > .field:not(:last-child) {
    margin-right: 0.75rem;
  }
  .request-appountment-button {
    width: 100%;
  }
</style>

<form on:submit|preventDefault={handleSubmitFormStepThree(handleFormSubmitCallback)} class="form-step3-wrap">
  <div class="form-step3-header">
    <span on:click={handlePreviousStep} class="form-step3-header-back" href="/">
      <Fa class={svgNavigation} icon={faChevronLeft} />
    </span>
    <h3 class="form-step3-header-title {formHeader}">Your Details</h3>
  </div>
  <p class="form-step3-sub-title">
    Book your valuation for {$formTwoStore.appointmentDate.value} at {$formTwoStore.appointmentTime.value}
  </p>
  <hr class={formSeparator} />
  <div class="field is-horizontal">
    <div class="field-label">
      <label class={formLabel}>Your name</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input type="text" class={formInput} placeholder="Title" bind:value={$formThreeStore.title.value} />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="text" class={formInput} placeholder="First name*" bind:value={$formThreeStore.firstName.value} />
        </div>
        {#if !$formThreeStore.firstName.valid}
          <p class={formError}>First name is a required field</p>
        {/if}
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label" />
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input type="text" class={formInput} placeholder="Surname*" bind:value={$formThreeStore.surname.value} />
        </div>
        {#if !$formThreeStore.surname.valid}
          <p class={formError}>Surname is a required field</p>
        {/if}
      </div>
    </div>
  </div>

  <hr class={formSeparator} />

  <div class="field is-horizontal">
    <div class="field-label ">
      <label class={formLabel}>Address</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input type="text" class={formInput} placeholder="House name" />
        </div>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label" />
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input type="text" class={formInput} placeholder="House no." bind:value={$formThreeStore.houseNo.value} />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="text" class={formInput} placeholder="Address*" bind:value={$formThreeStore.address.value} />
        </div>
        {#if !$formThreeStore.address.valid}
          <p class={formError}>Address is a required field</p>
        {/if}
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label" />
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input type="text" class={formInput} placeholder="Town" bind:value={$formThreeStore.town.value} />
        </div>
      </div>
    </div>
  </div>
  <div class="field is-horizontal">
    <div class="field-label" />
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input type="text" class={formInput} placeholder="Country" bind:value={$formThreeStore.country.value} />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="text" class={formInput} value={$formOneStore.postCode.value} disabled />
        </div>
      </div>
    </div>
  </div>
  <hr class={formSeparator} />
  <div class="field is-horizontal">
    <div class="field-label ">
      <label class={formLabel}>Contact</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <input type="text" class="{formInput}" placeholder="Mobile number*" bind:value={$formThreeStore.mobileNumber.value} />
        </div>
        {#if !$formThreeStore.mobileNumber.valid}
          <p class={formError}>Please enter a valid phone number</p>
        {/if}
      </div>
    </div>
  </div>
  <hr class={formSeparator} />
  <div class="field is-horizontal">
    <div class="field-label ">
      <label class={formLabel}>Notes</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <textarea
            class={formInput}
            rows={3}
            placeholder="Please enter any additional notes about the appointment or property"
            bind:value={$formThreeStore.notes.value} />
        </div>
      </div>
    </div>
  </div>
  <hr class={formSeparator} />
  <div class="field is-horizontal">
    <div class="field-label">
      <label class={formLabel}>Looking to buy?</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <label class="radio">
            <input type="radio" name="lookingToBuy" bind:group={$formThreeStore.lookingToBuy.value} value="yes" />
            Yes
          </label>
          <label class="radio">
            <input type="radio" name="lookingToBuy" bind:group={$formThreeStore.lookingToBuy.value} value="no" />
            No
          </label>
        </div>
      </div>
    </div>
  </div>
  <hr class={formSeparator} />
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <div class="control">
          <label class={formLabel}>
            <input type="checkbox" bind:checked={isChecked} />
            Tick here to opt in to marketing communications
          </label>
        </div>
      </div>
    </div>
  </div>
  <hr class={formSeparator} />
  <div class="field is-horizontal">
    <div class="field-label" />
    <div class="field-body">
      <div class="field">
        <div class="control">
          <button class="{formButtonPrimary} request-appountment-button">Request Appointment</button>
        </div>
      </div>
    </div>
  </div>
</form>
