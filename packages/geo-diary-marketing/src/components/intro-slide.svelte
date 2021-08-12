<script lang="ts">
  import SignInButton from './sign-in-button.svelte'
</script>

<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-align-center el-mxauto">
    <div class="content-wrapper el-flex-container no-margin">
      <div class="column el-flex-container el-flex-column el-flex-justify-evenly el-flex-grow no-margin">
        <img class="logo-image" src="./images/page-one-title.svg" alt="Geo Diary logo" />
        <div class="el-mb6">
          <h6 class="el-subtitle">Lets get started!</h6>
          <p class="el-body-text el-has-grey-text">
            You can also use the listing preview to see how your app will display in the Marketplace to potential
            clients.
          </p>
          <button class="el-intent-critical el-button-has-right-chevron el-button el-mb3">Watch Video</button>
        </div>
        <div class="el-mtauto form-container">
          <h6 class="el-subtitle">Existing Customer</h6>
          <div class="login-reapit-button-container">
            <SignInButton />
          </div>
          <h6 class="el-subtitle">New Customer</h6>
          <div class="frame-container">
            <iframe
              id="form-frame"
              src="https://go.reapit.com/l/894351/2021-08-03/2lny5"
              title="Email Form"
              width="100%"
              height="500"
              type="text/html"
              frameborder="0"
              allowTransparency
              style="border: 0"
            />
          </div>
        </div>
      </div>
      <div class="column el-flex-container el-flex-column el-flex-justify-center">
        <img src="./images/page-one-hero.svg" alt="Happy man holding a phone and a key" />
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    background: linear-gradient(180deg, #edfaff 0%, #ffffff 26.56%, #ffffff 100%);
  }

  .inner-container {
    padding: 2rem;
    max-width: 1200px;
  }

  .form-container {
    box-shadow: 3px 4px 24px rgba(0, 0, 0, 0.07);
    border-radius: 0.5rem;
    padding: 2rem;
  }

  .column {
    width: 100%;
  }

  .content-wrapper {
    flex-direction: column;
  }

  .frame-container {
    position: relative;
    height: 38px;
    width: 108%;
  }

  .logo-image {
    max-width: 400px;
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
    left: -1.4rem;
  }

  button {
    width: 9.75rem;
  }

  h6 {
    font-weight: bold;
  }

  @media screen and (min-width: 768px) {
    .column {
      width: 50%;
      /* flex-direction: row; */
    }

    .inner-container {
      height: 100vh;
    }

    .logo-image {
      margin: 4.5rem 0;
    }

    .content-wrapper {
      flex-direction: row;
    }
  }
</style>
