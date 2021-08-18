<script lang="ts">
  import SignInButton from './sign-in-button.svelte'
  import closeSystem from '@reapit/elements/assets/system-icons/closeSystem.svg'

  export let modalVisible: boolean
  export let setModalVisible: () => void
</script>

<div class="el-modal-bg" class:el-is-active={modalVisible} on:click|preventDefault={setModalVisible} />
<div class="el-modal modal-wrapper" class:el-is-active={modalVisible}>
  <img class="close-icon" src={closeSystem} alt="click to close" on:click|preventDefault={setModalVisible} />
  <div class="column-container el-flex-container">
    <div class="column el-flex-container el-flex-column el-px2">
      <div class="el-flex-container el-flex-align-center">
        <img class="modal-image" src="./images/existing-customer.svg" alt="existing customer" />
        <h6 class="modal-heading">Existing Customer</h6>
      </div>
      <p class="el-body-text el-has-grey-text modal-text">
        You can install GEO Diary now direct from the AppMarket, just sign in below:
      </p>
      <div class="login-reapit-button-container">
        <SignInButton />
      </div>
    </div>
    <div class="column el-flex-container el-flex-column el-px2">
      <div class="el-flex-container el-flex-align-center">
        <img class="modal-image" src="./images/new-customer.svg" alt="existing customer" />
        <h6 class="modal-heading">New Customer</h6>
      </div>
      <p class="el-body-text el-has-grey-text modal-text">
        To find out more about GEO Diary and the AppMarket, just enter your email address and we will be in touch:
      </p>
      <div class="frame-container">
        <iframe
          id="form-frame"
          src="https://go.reapit.com/l/894351/2021-08-03/2lny5"
          title="Email Form"
          width="100%"
          type="text/html"
          frameborder="0"
          allowTransparency
          style="border: 0"
        />
      </div>
    </div>
  </div>
</div>

<style>
  .column {
    width: 100%;
  }

  .column-container {
    flex-direction: column;
    padding: 1rem;
  }

  .modal-image {
    height: 7.5rem;
    margin-bottom: 1.5rem;
    margin-right: 0.5rem;
  }

  .modal-heading {
    font-size: 1.25rem;
  }

  .modal-text {
    height: 5rem;
    margin-bottom: 2rem;
  }

  .frame-container {
    position: relative;
    height: 38px;
    width: calc(100% + 34px);
  }

  .modal-wrapper {
    overflow-y: scroll;
    position: relative;
  }

  .close-icon {
    top: 1rem;
    right: 1rem;
    position: absolute;
    height: 1.5rem;
    cursor: pointer;
  }

  h6 {
    font-weight: bold;
    margin-bottom: 0;
    text-align: initial;
  }

  img {
    height: 100%;
  }

  p {
    margin-bottom: 0;
  }

  iframe {
    position: absolute;
    top: -1.3rem;
    left: -1.4rem;
  }

  @media screen and (min-width: 900px) {
    .column {
      width: 50%;
    }

    .column:first-child {
      border-right: 1px solid #e3e3e3;
      padding-right: 2rem;
    }

    .column:last-child {
      padding-left: 2rem;
    }

    .column-container {
      flex-direction: row;
      padding: 2rem 2rem 0 2rem;
    }

    img {
      height: auto;
    }

    h6 {
      margin-bottom: 1.25rem;
    }
  }
</style>
