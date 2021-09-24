<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-column el-flex-align-center el-mxauto">
    <div class="padded-container">
      <h2 class="el-title el-text-center">Compatibility</h2>
      <h5 class="el-subtitle el-text-center">Available on IOS, Windows, Mobile & Web</h5>
    </div>
    <img class="image-mobile-hero" src="./images/compatibility-mobile-hero.svg" alt="flow of data to various devices" />
    <img class="image-tablet-hero" src="./images/compatibility-hero.svg" alt="flow of data to various devices" />
    <div class="image-desktop-hero-container">
      <img
        class="image-desktop-hero-bg"
        src="./images/compatibility-desktop-hero.svg"
        alt="flow of data to various devices"
      />
      <img
        class="image-desktop-hero"
        src="./images/compatibility-desktop-devices-hero.svg"
        alt="flow of data to various devices"
      />
    </div>
    <div class="column-container el-flex-container white-bg-container">
      <div class="column el-flex-container el-flex-column el-px2">
        <p class="el-body-text el-has-grey-text">
          <strong
            >The GEO Diary app is a progressive web application and can be saved and launched as an app on your phone,
            accessed via a web browser or launched through Agency Cloud.
          </strong>
        </p>
      </div>
      <div class="column el-px2">
        <p class="el-body-text el-has-grey-text">
          Supporting multiple platforms, you can access your weekly diary appointments in the office on a web browser or
          on the go on your mobile or tab.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    margin-bottom: 2rem;
  }

  .padded-container {
    padding-top: 2rem;
    background: rgb(248, 248, 248);
    max-width: var(--max-screen-width-desktop);
  }

  .white-bg-container {
    background-color: #fff;
    margin-bottom: 0;
    max-height: 100%;
    flex-grow: 1;
  }

  .image-desktop-hero-container {
    position: relative;
  }

  .image-desktop-hero {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .image-tablet-hero {
    margin-top: -140px;
    z-index: -1;
  }

  .column {
    width: 100%;
  }

  .column-container {
    padding: 2rem;
    flex-direction: column;
    max-width: 1200px;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 0;
    margin: -2.5rem 0 0 0;
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

  p {
    font-size: 0.875rem;
  }

  @media screen and (max-width: 2880px) {
    .image-desktop-hero-container {
      display: none;
    }
  }

  @media screen and (min-width: 2879px) {
    .image-tablet-hero {
      display: none;
    }
  }

  @media screen and (max-width: 767px) {
    .image-tablet-hero {
      display: none;
    }

    .padded-container {
      background: #fff;
    }
  }

  @media screen and (min-width: 768px) {
    .image-mobile-hero {
      display: none;
    }

    .column {
      width: 50%;
    }

    .column-container {
      flex-direction: row;
    }

    h5 {
      font-size: 1.25rem;
      line-height: 1.5rem;
    }

    h2 {
      font-size: 2rem;
      line-height: 2.25rem;
    }

    p {
      font-size: 1rem;
    }
  }
</style>
