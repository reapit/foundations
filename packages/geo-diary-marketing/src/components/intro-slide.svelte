<script lang="ts">
  import SignInButton from './sign-in-button.svelte'
</script>

<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-align-center el-mxauto">
    <div class="content-wrapper el-flex-container no-margin">
      <div class="column el-flex-container el-flex-column el-flex-justify-evenly el-flex-grow no-margin">
        <img class="logo-image" src="./images/intro-title.svg" alt="Geo Diary logo" />
        <div class="el-mb6">
          <h6 class="el-subtitle">Access your appointments, anywhere!</h6>
          <p class="el-body-text el-has-grey-text">
            Simple and easy to use. The GEO Diary app allows you to easily access your diary appointments in AgencyCloud
            CRM, direct from your mobile or web browser. Why not see it for yourself?
          </p>
          <a href="https://geo-diary-beta.prod.paas.reapit.cloud/?demo=true" target="_blank" rel="noopener noreferrer">
            <button class="el-intent-critical el-button-has-right-chevron el-button el-mb3">Try it now</button>
          </a>
        </div>
        <div class="column el-flex-container el-flex-column el-flex-justify-center is-hidden-desktop">
          <img src="./images/intro-hero-animated.svg" alt="Happy man holding a phone and a key" />
        </div>
        <div class="el-mtauto form-container">
          <h6 class="el-subtitle">Existing Customer? Install Now</h6>
          <div class="login-reapit-button-container">
            <SignInButton />
          </div>
          <h6 class="el-subtitle">New Customer? Find out more</h6>
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
      <div class="column el-flex-container el-flex-column el-flex-justify-center is-hidden-mobile no-margin">
        <img src="./images/intro-hero-animated.svg" alt="Happy man holding a phone and a key" />
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    background: linear-gradient(180deg, #edfaff 0%, #ffffff 26.56%, #ffffff 100%);
    margin-bottom: 2rem;
  }

  .inner-container {
    padding: 1rem;
    max-width: 1200px;
  }

  .form-container {
    padding: 1rem;
  }

  .column {
    width: 100%;
  }

  .content-wrapper {
    flex-direction: column;
    padding: 1rem;
  }

  .frame-container {
    position: relative;
    height: 38px;
    width: calc(100% + 27px);
  }

  .logo-image {
    max-width: 66%;
    margin: 0 0 2rem 0;
  }

  .login-reapit-button-container {
    border-bottom: 1px #e3e3e3 solid;
    margin-bottom: 2rem;
  }

  .no-margin {
    margin: 0;
  }

  iframe {
    position: absolute;
    top: -1.3rem;
    left: -1rem;
  }

  button {
    width: 9.75rem;
  }

  h6 {
    font-weight: bold;
  }

  p {
    font-size: 14px;
  }

  @media screen and (max-width: 767px) {
    .is-hidden-mobile {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    .is-hidden-desktop {
      display: none;
    }

    .column {
      width: 50%;
    }

    .column:first-child {
      margin-right: 1rem;
    }

    .column:last-child {
      margin-left: 1rem;
    }

    .inner-container {
      min-height: 100vh;
      padding: 2rem;
    }

    .form-container {
      box-shadow: 3px 4px 24px rgba(0, 0, 0, 0.07);
      border-radius: 0.5rem;
      padding: 2rem;
    }

    .content-wrapper {
      flex-direction: row;
    }

    p {
      font-size: 16px;
    }
  }
</style>
