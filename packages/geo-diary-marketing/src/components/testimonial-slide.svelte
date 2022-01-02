<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-column el-flex-align-center el-mx-auto">
    <h2 class="el-title el-text-center">Don’t Take Our Word for It</h2>
    <h4 class="el-subtitle el-text-center">See what others had to say...</h4>
    <div class="tile-container el-flex-container el-flex-wrap">
      <div class="tile">
        <div class="tile-content el-flex-container el-flex-column">
          <div class="el-flex-container">
            <div class="quotes-container image-container el-flex-container el-flex-align-center el-flex-justify-center">
              <img class="" src="./images/quotes.svg" alt="" />
            </div>
            <div class="el-card-heading-wrap">
              <h5 class="el-subtitle">Steven Shepherd</h5>
              <h6 class="el-card-sub-heading el-mb5">Owner</h6>
              <h6 class="el-card-sub-heading-additional-expanded el-card-sub-heading-additional">Homes of Bath</h6>
            </div>
            <div class="quotes-container-mobile el-flex-container el-flex-align-center el-flex-justify-center">
              <img class="" src="./images/quotes.svg" alt="" />
            </div>
          </div>
          <p class="el-body-text el-has-grey-text">
            “...GEO Diary allows our negotiators to quickly access their diary from the app on their mobiles whilst out
            of the office on appointments. The app allows you to plan your journey, contact your clients and access
            valuable information in seconds. It is a live connection with Reapit which means if an appointment is
            cancelled while you’re on the road, your GEO Diary app will update with this live information…”
          </p>
        </div>
      </div>
      <div class="tile">
        <div class="tile-content el-flex-container el-flex-column">
          <div class="el-flex-container">
            <div class="quotes-container image-container el-flex-container el-flex-align-center el-flex-justify-center">
              <img class="" src="./images/quotes.svg" alt="" />
            </div>
            <div class="el-card-heading-wrap">
              <h5 class="el-subtitle">Jessica Bichard</h5>
              <h6 class="el-card-sub-heading el-mb5">Local Market Negotiator</h6>
              <h6 class="el-card-sub-heading-additional-expanded el-card-sub-heading-additional">Swoffers</h6>
            </div>
            <div class="quotes-container-mobile el-flex-container el-flex-align-center el-flex-justify-center">
              <img class="" src="./images/quotes.svg" alt="" />
            </div>
          </div>
          <p class="el-body-text el-has-grey-text">
            “…Having access to our AgencyCloud diaries on the move with updates being sent through as and when they
            happen is a massive benefit to our teams. It has moved us away from printed copies and manually having to
            call our team to check if there are any updates to appointments…”
          </p>
        </div>
      </div>
      <div class="tile">
        <div class="tile-content el-flex-container el-flex-column">
          <div class="el-flex-container">
            <div class="quotes-container image-container el-flex-container el-flex-align-center el-flex-justify-center">
              <img class="" src="./images/quotes.svg" alt="" />
            </div>
            <div class="el-card-heading-wrap">
              <h5 class="el-subtitle">Marco Olival</h5>
              <h6 class="el-card-sub-heading el-mb5">HUB & Business Development Manager</h6>
              <h6 class="el-card-sub-heading-additional-expanded el-card-sub-heading-additional">
                Bridges Estate Agents
              </h6>
            </div>
            <div class="quotes-container-mobile el-flex-container el-flex-align-center el-flex-justify-center">
              <img class="" src="./images/quotes.svg" alt="" />
            </div>
          </div>
          <p class="el-body-text el-has-grey-text">
            “…GEO Diary makes it easy for us to plan out routes for the day between appointments. With the ability to
            write feedback on appointments straight back into Reapit from the app, we can be more proactive in updating
            appointments which means we can save our negotiators time at the end of the day inputting feedback into the
            diary…”
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    background: linear-gradient(0deg, #fff7f1 0%, rgba(255, 255, 255, 0) 100%);
    padding-bottom: 2rem;
  }

  .inner-container {
    padding: 1rem;
    max-width: 1200px;
  }

  .quotes-container {
    border-right: 1px solid #e3e3e3;
    width: 5rem;
  }

  .quotes-container-mobile {
    margin-left: auto;
  }

  .quotes-container-mobile img {
    height: 2.5rem;
  }

  .image-container {
    height: 4.5rem;
    flex-shrink: 0;
    margin: 0 1rem 1.5rem 0;
    justify-content: flex-start;
    align-items: center;
  }

  .tile {
    box-shadow: 3px 4px 24px rgba(0, 0, 0, 0.07);
    border-radius: 0.5rem;
    display: flex;
    margin: 0.625rem;
    height: fit-content;
    padding: 1rem 1rem 0 1rem;
  }

  .tile-container {
    margin-bottom: 2.25rem;
    flex-flow: column wrap;
    width: 100%;
  }

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.625rem;
    line-height: 1.75rem;
  }

  h4 {
    margin-bottom: 2.5rem;
    font-size: 1rem;
    line-height: 1.25rem;
  }

  h5 {
    margin-bottom: 0;
  }

  h6 {
    justify-self: flex-start;
  }

  p {
    font-size: 0.875rem;
  }

  @media screen and (max-width: 767px) {
    .quotes-container {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    .inner-container {
      padding: 2rem;
    }

    .quotes-container-mobile {
      display: none;
    }

    .tile-container {
      max-height: 800px;
    }

    .tile {
      width: calc(50% - 1.25rem);
      padding: 2rem 2rem 1rem 2rem;
    }

    p {
      font-size: 1rem;
    }

    h4 {
      font-size: 1.25rem;
      line-height: 1.5rem;
    }

    h2 {
      font-size: 2rem;
      line-height: 2.25rem;
    }
  }
</style>
