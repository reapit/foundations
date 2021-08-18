<script lang="ts">
  import SignInModal from './sign-in-modal.svelte'

  $: modalVisible = false

  const setModalVisible = () => (modalVisible = !modalVisible)
</script>

<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-column el-flex-align-center el-mxauto">
    <h2 class="el-title el-text-center">Agency Cloud - Diary Appointment Features</h2>
    <h5 class="el-subtitle el-text-center">Instant access to your daily & weekly appointments.</h5>
    <div class="tile-container el-flex-container el-flex-wrap">
      <div class="tile tile-border-blue-lightest">
        <div class="image-container el-flex-container el-flex-column el-flex-align-center el-flex-justify-center">
          <img class="" src="./images/stopwatch.svg" alt="stopwatch" />
        </div>
        <div class="tile-content">
          <h6 class="el-subtitle el-w1_2_2 el-text-center">Send ETA</h6>
          <p class="el-body-text el-has-grey-text is-hidden-mobile">
            Send a prepopulated text message with your exact time of arrival. GEO Diary will automatically calculate
            your current location and time to your next appointment.
          </p>
        </div>
      </div>
      <div class="tile tile-border-blue-dark">
        <div class="image-container el-flex-container el-flex-column el-flex-align-center el-flex-justify-center">
          <img class="" src="./images/location.svg" alt="" />
        </div>
        <div class="tile-content">
          <h6 class="el-subtitle el-w1_2_2 el-text-center">Location Settings</h6>
          <p class="el-body-text el-has-grey-text is-hidden-mobile">
            Get turn by turn directions from any starting location. The app will automatically detect your current
            location but it also provides the ability to set a different location.
          </p>
        </div>
      </div>
      <div class="tile tile-border-blue-light">
        <div class="image-container el-flex-container el-flex-column el-flex-align-center el-flex-justify-center">
          <img class="" src="./images/maps.svg" alt="" />
        </div>
        <div class="tile-content">
          <h6 class="el-subtitle el-w1_2_2 el-text-center">Map Integration</h6>
          <p class="el-body-text el-has-grey-text is-hidden-mobile">
            Seamless integration with Google Maps and Apple Maps. From any appointment you can see turn by turn
            directions using your default map application.
          </p>
        </div>
      </div>
      <div class="tile tile-border-green">
        <div class="image-container el-flex-container el-flex-column el-flex-align-center el-flex-justify-center">
          <img class="" src="./images/whatsapp.svg" alt="" />
        </div>
        <div class="tile-content">
          <h6 class="el-subtitle el-w1_2_2 el-text-center">WhatsApp Integration</h6>
          <p class="el-body-text el-has-grey-text is-hidden-mobile">
            Our integration with WhatsApp provides you the ability to easily start a conversation on any contact record
            that has a mobile telephone number.
          </p>
        </div>
      </div>
      <div class="tile tile-border-orange">
        <div class="image-container el-flex-container el-flex-column el-flex-align-center el-flex-justify-center">
          <img class="" src="./images/email.svg" alt="" />
        </div>
        <div class="tile-content">
          <h6 class="el-subtitle el-w1_2_2 el-text-center">Email Integration</h6>
          <p class="el-body-text el-has-grey-text is-hidden-mobile">
            Prepopulated emails using your default mail client. If an email address is present on any contact record GEO
            Diary will open an email draft
          </p>
        </div>
      </div>
      <div class="tile tile-border-blue-med">
        <div class="image-container el-flex-container el-flex-column el-flex-align-center el-flex-justify-center">
          <img class="" src="./images/checklist.svg" alt="" />
        </div>
        <div class="tile-content">
          <h6 class="el-subtitle el-w1_2_2 el-text-center">Online Checklist</h6>
          <p class="el-body-text el-has-grey-text is-hidden-mobile">
            Access identity and address history for any contact. If you have the Online Check List app installed, you
            can access and update identity information for any contact.
          </p>
        </div>
      </div>
    </div>
    <div class="el-flex-container el-flex-align-center">
      <h6 class="el-subtitle el-mr3 footer-heading">Existing customer or new to Reapit?</h6>
      <button
        class="el-intent-primary el-button el-button-has-right-chevron el-mr3"
        on:click|preventDefault={setModalVisible}>Find out more</button
      >
    </div>
  </div>
  <SignInModal {modalVisible} {setModalVisible} />
</div>

<style>
  .container {
    margin-bottom: 2rem;
  }

  .inner-container {
    padding: 2rem;
    max-width: 1200px;
    overflow: hidden;
  }

  .tile {
    box-shadow: 3px 4px 24px rgba(0, 0, 0, 0.07);
    border-radius: 0.5rem;
    display: flex;
    border-left-width: 1rem;
    border-style: solid;
    margin: 0.625rem 0;
    width: 100%;
    height: 88px;
  }

  .tile-border-blue-lightest {
    border-color: #7bc9eb;
  }

  .tile-border-blue-light {
    border-color: #23a4de;
  }

  .tile-border-orange {
    border-color: #ffb71b;
  }

  .tile-border-blue-dark {
    border-color: #262f69;
  }

  .tile-border-green {
    border-color: #a0c862;
  }

  .tile-border-blue-med {
    border-color: #0061a8;
  }

  .tile-content {
    display: flex;
    align-items: center;
  }

  .tile-container {
    margin-bottom: 2.25rem;
    flex-direction: column;
    width: 100%;
  }

  .image-container {
    width: 5.75rem;
    height: 3.5rem;
    flex-shrink: 0;
    margin-bottom: 0;
    align-self: center;
  }

  .footer-heading {
    margin-bottom: 0;
  }

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.625rem;
    line-height: 1.75rem;
  }

  h5 {
    margin-bottom: 2.5rem;
    font-size: 1rem;
    line-height: 1.25rem;
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

  @media screen and (max-width: 899px) {
    .is-hidden-mobile {
      display: none;
    }
  }

  @media screen and (min-width: 900px) {
    .tile {
      width: calc(50% - 1.25rem);
      margin: 0.625rem;
      height: auto;
    }

    .image-container {
      width: 10.75rem;
      height: auto;
    }

    .tile-container {
      flex-direction: row;
    }

    .tile-content {
      padding: 1.5rem 2rem 1.5rem 0;
      display: block;
    }

    img {
      height: auto;
    }

    h6 {
      margin-bottom: 1.25rem;
    }

    h5 {
      font-size: 1.25rem;
      line-height: 1.5rem;
    }

    h2 {
      font-size: 2rem;
      line-height: 2.25rem;
    }
  }
</style>
