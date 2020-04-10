<script>
  import { resetCSS, generateThemeClasses } from '../../../common/styles'
  export let theme
  const parentSelector = 'appointment-confirmation';

  const themeClasses = {
    ...generateThemeClasses(theme, `#${parentSelector}`),
  };
  console.log('themeClasses ne', themeClasses)
  const { button, primaryHeading, globalStyles, input } = themeClasses;
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

.button, .input, .textarea, .select select {
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

.input, .textarea, .select select {
  background-color: white;
  border-color: #dbdbdb;
  border-radius: 4px;
  color: #363636;
}

.input::-moz-placeholder, .textarea::-moz-placeholder, .select select::-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input::-webkit-input-placeholder, .textarea::-webkit-input-placeholder, .select select::-webkit-input-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:-moz-placeholder, .textarea:-moz-placeholder, .select select:-moz-placeholder {
  color: rgba(54, 54, 54, 0.3);
}

.input:-ms-input-placeholder, .textarea:-ms-input-placeholder, .select select:-ms-input-placeholder {
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
            <input class="input" placeholder="Title" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" placeholder="First name*" />
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" placeholder="Surname*" />
          </div>
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
            <input class="input is-danger" type="text" placeholder="House name"/>
          </div>
          <!-- <p class="error">
            This field is required
          </p> -->
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <input class="input" placeholder="House no." />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" placeholder="Address*" />
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input" placeholder="Town" />
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
            <input class="input" placeholder="Country" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" value="NN1 1DF" disabled />
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
            <input class="input" placeholder="Mobile number*"/>
          </div>
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
            <textarea class="textarea" placeholder="Notes"></textarea>
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
              <input type="radio" name="member">
              Yes
            </label>
            <label class="radio">
              <input type="radio" name="member">
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
              <input type="checkbox">
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