<div class="container el-wscreen el-flex-container el-flex-column el-flex-justify-between">
  <div class="padded-container">
    <h2 class="el-title el-text-center">Available now!</h2>
    <h5 class="el-subtitle el-text-center">
      Immediate access to all eligible Enterprise clients of Reapit’s Agency Cloud CRM software
    </h5>
  </div>
  <div class="image-footer-container">
    <div class="image-mobile-hero">
      <img src="./images/availability-mobile-hero.svg" alt="flow of data to various devices" />
      <p class="el-body-text el-has-grey-text image-text">
        <button class="el-intent-critical el-button el-mr3 el-mb3 button">App Marketplace</button>
        Reapit customers can now adopt and deploy powerful new apps and integrations from a continually evolving library
        developed by Reapit’s growing range of partnerships.
      </p>
    </div>
    <div class="image-tablet-hero">
      <img src="./images/availability-hero.svg" alt="flow of data to various devices" />
      <p class="el-body-text el-has-grey-text image-text">
        <button class="el-intent-critical el-button el-mr3 el-mb3 button">App Marketplace</button>
        Reapit customers can now adopt and deploy powerful new apps and integrations from a continually evolving library
        developed by Reapit’s growing range of partnerships.
      </p>
    </div>
    <div class="image-desktop-hero">
      <img src="./images/availability-desktop-hero.svg" alt="flow of data to various devices" />
      <p class="el-body-text el-has-grey-text image-text">
        <button class="el-intent-critical el-button el-mr3 el-mb3 button">App Marketplace</button>
        Reapit customers can now adopt and deploy powerful new apps and integrations from a continually evolving library
        developed by Reapit’s growing range of partnerships.
      </p>
    </div>

    <div class="footer">
      <p>© Copyright Reapit. All rights reserved. 2021</p>
      <p>
        By submitting your email, you agree to Reapit processing your data in accordance with our <a
          href="https://www.reapit.com/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          >Privacy Policy.
        </a>
      </p>
    </div>
  </div>
</div>

<style>
  .container {
    background: #262f69;
  }

  .padded-container {
    padding: 2rem;
  }

  .footer {
    padding: 1.75rem;
    width: 100%;
    background: #fafafa;
    color: var(--color-grey-dark);
    margin-top: -2px;
    text-align: center;
  }

  .image-footer-container {
    line-height: 0;
    margin: 0 auto;
    width: 100%;
  }

  .image-mobile-hero,
  .image-tablet-hero,
  .image-desktop-hero {
    position: relative;
    line-height: 0;
  }

  .image-text {
    position: absolute;
    bottom: 0;
    padding: 0 2rem;
    text-align: center;
  }

  .button {
    display: block;
    margin: 0 auto 1.5rem auto;
  }

  img {
    max-height: 100%;
    min-height: 0;
    width: 100%;
  }

  h2 {
    margin-bottom: 0.5rem;
    color: #fff;
    font-size: 1.625rem;
    line-height: 1.75rem;
  }

  h5 {
    margin-bottom: 2.5rem;
    color: #fff;
    font-size: 1rem;
    line-height: 1.25rem;
  }

  p {
    font-size: 0.875rem;
  }

  a {
    color: var(--intent-primary);
  }

  @media screen and (max-width: 1100px) {
    .image-desktop-hero {
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
