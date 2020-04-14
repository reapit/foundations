<script>
  import { resetCSS, generateThemeClasses } from '../../../common/styles'
  import { requiredValidator, phoneNumberValidator } from '../validation/validator';
  import { createFieldValidator } from '../validation';

  export let theme
  export let postCode

  const parentSelector = 'appointment-confirmation';
  const themeClasses = {
    ...generateThemeClasses(theme, `#${parentSelector}`),
  };
  const { button, primaryHeading, globalStyles, input } = themeClasses;

  let title = null;
  let firstName = null;
  let surName = null;
  let houseName = null;
  let houseNo = null;
  let address = null;
  let town = null;
  let country = null;
  let mobileNumber = null;
  let notes = null;
  let lookingToBuy = null;
  let marketingCommunication = null;

  const [ firstNameValidity, firstNameValidate ] = createFieldValidator(requiredValidator());
  const [ surnameValidity, surnameValidate ] = createFieldValidator(requiredValidator());
  const [ addressValidity, addressValidate ] = createFieldValidator(requiredValidator());
  const [ mobileNumberValidity, mobileNumberValidate ] = createFieldValidator(requiredValidator(), phoneNumberValidator());

  $: isFirstNameError = !$firstNameValidity.valid && $firstNameValidity.dirty;
  $: isSurnameError = !$surnameValidity.valid && $surnameValidity.dirty;
  $: isAddressError = !$addressValidity.valid && $addressValidity.dirty;
  $: isMobileNumberError = !$mobileNumberValidity.valid && $mobileNumberValidity.dirty;

</script>

<style>
.appointment-confirmation {
  max-width: 700px;
  margin: 20px auto;
}

.appointment-confirmation form {
  padding: 5px 15px 15px
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
  margin-right: 1.5rem;
  text-align: right;
}

.field-body .field .field {
  margin-bottom: 0;
}

.field .control {
  box-sizing: border-box;
}

.button, .input, .textarea {
  -moz-appearance: none;
  -webkit-appearance: none;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  display: inline-flex;
  justify-content: flex-start;
  padding-bottom: calc(0.5em - 1px);
  padding-left: calc(0.75em - 1px);
  padding-right: calc(0.75em - 1px);
  padding-top: calc(0.5em - 1px);
  position: relative;
  vertical-align: top;
  box-sizing: inherit;
}

.input, .textarea {
  background-color: white;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}

.is-danger.input, .is-danger.textarea {
  border-color: #f14668;
}

.input::-moz-placeholder, .textarea::-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input::-webkit-input-placeholder, .textarea::-webkit-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:-moz-placeholder, .textarea:-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:-ms-input-placeholder, .textarea:-ms-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:hover, .textarea:hover .field-label{
  border-color: #b5b5b5;
}

.input:focus, .textarea:focus, .input:active, .textarea:active {
  border-color: #3273dc;
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.input, .textarea {
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  max-width: 100%;
  width: 100%;
}

@media screen and (min-width: 769px), print {
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
}
.button {
  width: 100%;
  display: block;
}
.title {
  text-align: center
}
</style>

<div id={parentSelector} class="appointment-confirmation {globalStyles}">
  <form>
    <h2 class="title {primaryHeading}">Your Details</h2>
    <p>Book  your valuation for Saturday, 4 April at 9:30 am.</p>
    <hr/>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">Your name</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <input class="input" placeholder="Title" bind:value={title} />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" placeholder="First name*" bind:value={firstName} class:is-danger={isFirstNameError} use:firstNameValidate={firstName}/>
          </div>
          {#if isFirstNameError}
             <p class="error">
              {$firstNameValidity.message}
            </p>
          {/if}
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" placeholder="Surname*" bind:value={surName} class:is-danger={isSurnameError} use:surnameValidate={surName} />
          </div>
          {#if isSurnameError}
             <p class="error">
              {$surnameValidity.message}
            </p>
          {/if}
        </div>
      </div>
    </div>

    <hr/>

    <div class="field is-horizontal">
      <div class="field-label ">
        <label class="label">Address</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" type="text" placeholder="House name"/>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <input class="input" placeholder="House no." bind:value={houseNo} />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" placeholder="Address*" bind:value={address} class:is-danger={isAddressError} use:addressValidate={address} />
          </div>
          {#if isAddressError}
             <p class="error">
              {$addressValidity.message}
            </p>
          {/if}
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" placeholder="Town"bind:value={town} />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <input class="input" placeholder="Country" bind:value={country} />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" value={postCode} disabled />
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="field is-horizontal">
      <div class="field-label ">
        <label class="label">Contact</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" placeholder="Mobile number*" bind:value={mobileNumber} class:is-danger={isMobileNumberError} use:mobileNumberValidate={mobileNumber}/>
          </div>
          {#if isMobileNumberError}
             <p class="error">
              {$mobileNumberValidity.message}
            </p>
          {/if}
        </div>
      </div>
    </div>
    <hr/>
    <div class="field is-horizontal">
      <div class="field-label ">
        <label class="label">Notes</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <textarea class="textarea" placeholder="Notes"bind:value={notes}></textarea>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="field is-horizontal">
      <div class="field-label">
        <label class="label">Looking to buy?</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <label class="radio">
              <input type="radio" name="lookingToBuy" bind:group={lookingToBuy} value="yes">
              Yes
            </label>
            <label class="radio">
              <input type="radio" name="lookingToBuy" bind:group={lookingToBuy} value="no">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" bind:checked={marketingCommunication}>
              Tick here to opt in to marketing communications
            </label>
          </div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="field is-horizontal">
      <div class="field-label"></div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <button class="button {button}">
              Request Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>