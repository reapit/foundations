<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-column el-flex-align-center el-mxauto">
    <div class="padded-container">
      <h2 class="el-title el-text-center">Compatibility</h2>
      <h5 class="el-subtitle el-text-center">Instant access to your daily & weekly appointments.</h5>
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
            >You can embed some of the most well-known, specialised PropTech solutions into your CRM for a truly
            seamless experience.
          </strong>
        </p>
        <p class="el-body-text el-has-grey-text">
          When you are ready to publish your app you will need to add some additional information such as a Summary,
          Description & Images.
        </p>
      </div>
      <div class="column el-px2">
        <p class="el-body-text el-has-grey-text">
          When you are ready to publish your app you will need to add some additional information such as a Summary,
          Description & Images and you will also need to make it 'Listed' so it is visible in the Marketplace.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .inner-container {
    max-width: 1200px;
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

  .column {
    width: 100%;
  }

  .column-container {
    padding: 2rem;
    flex-direction: column;
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

  @media screen and (max-width: 1100px) {
    .image-desktop-hero-container {
      display: none;
    }
  }

  @media screen and (min-width: 1099px) {
    .image-tablet-hero {
      display: none;
    }
  }

  @media screen and (max-width: 767px) {
    .image-tablet-hero {
      display: none;
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
