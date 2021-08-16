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
            When you are ready to publish your app you will need to add some additional information such as a Summary,
            Description & Images and you will also need to make it 'Listed'.
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
            When you are ready to publish your app you will need to add some additional information such as a Summary,
            Description & Images and you will also need to make it 'Listed'.
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
            When you are ready to publish your app you will need to add some additional information such as a Summary,
            Description & Images and you will also need to make it 'Listed'.
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
            When you are ready to publish your app you will need to add some additional information such as a Summary,
            Description & Images and you will also need to make it 'Listed'.
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
            When you are ready to publish your app you will need to add some additional information such as a Summary,
            Description & Images and you will also need to make it 'Listed'.
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
            When you are ready to publish your app you will need to add some additional information such as a Summary,
            Description & Images and you will also need to make it 'Listed'.
          </p>
        </div>
      </div>
    </div>
    <div class="el-flex-container el-flex-align-center">
      <h6 class="el-subtitle el-mr3 footer-heading">Already a customer?</h6>
      <button class="el-intent-primary el-button el-button-has-right-chevron el-mr3">Install now</button>
    </div>
  </div>
</div>

<style>
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
