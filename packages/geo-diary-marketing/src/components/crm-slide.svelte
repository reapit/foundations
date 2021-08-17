<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-column el-flex-align-center el-mxauto">
    <h2 class="el-title el-text-center">Do more with AgencyCloud</h2>
    <h5 class="el-subtitle el-text-center">Intuitive CRM and Client Accounting Software</h5>
    <div class="el-flex-container el-flex-align-center">
      <h6 class="el-subtitle el-mr3">How it works</h6>
      <button class="el-intent-critical el-button el-mr3 el-mb3">Watch Video</button>
    </div>
    <img class="is-hidden-mobile" src="./images/crm-desktop-hero.svg" alt="View of calendar and mobile app overlaid" />
    <img class="is-hidden-desktop" src="./images/crm-mobile-hero.svg" alt="View of calendar and mobile app overlaid" />
    <div class="el-flex-container column-container">
      <div class="column el-flex-container el-flex-column el-px2">
        <p class="el-body-text el-has-grey-text">
          <strong
            >Combining the power of our intuitive CRM ‘Agency Cloud’, the GEO Diary app provides you with the ability to
            access diary appointments from anywhere!
          </strong>
        </p>
        <p class="el-body-text el-has-grey-text">
          You can view your appointments for today, tomorrow or for the whole week, direct from an app on your phone or
          via a web browser.
        </p>
        <p class="el-body-text el-has-grey-text">
          Easy to install and simple to use, GEO Diary is a progressive web application that integrates with What’s App,
          Email and other applications from the AppMarket.
        </p>
      </div>
      <div class="column el-px2">
        <p class="el-body-text el-has-grey-text">
          Running late for an appointment? send an automated ETA text message. Carried out a viewing? Enter your follow
          up notes direct on the appointment and they will be instantly stored against that record in Agency Cloud.
        </p>
        <p class="el-body-text el-has-grey-text">
          Using the very latest in technology, we have integrated with Google Maps and Apple Maps for turn-by-turn
          directions.
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    background: linear-gradient(180deg, #f2f2f2 0%, rgba(242, 242, 242, 0) 100%);
  }

  .inner-container {
    padding: 2rem;
    max-width: 1200px;
  }

  .column {
    width: 100%;
  }

  .column-container {
    flex-direction: column;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    min-width: 0;
    min-height: 0;
    margin: 0 auto;
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
  }

  p {
    font-size: 0.875rem;
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

    .column-container {
      flex-direction: row;
    }

    p {
      font-size: 1rem;
    }

    h5 {
      font-size: 1.25rem;
      line-height: 1.5rem;
    }

    h2 {
      font-size: 2rem;
      line-height: 2.25rem;
    }

    img {
      margin: -2.5rem 0 auto 0;
    }
  }
</style>
