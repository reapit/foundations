<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-column el-flex-align-center el-mxauto">
    <h2 class="el-title el-text-center">Don’t Take Our Word for It</h2>
    <h4 class="el-subtitle el-text-center">See what others had to say...</h4>
    <div class="tile-container el-flex-container el-flex-wrap">
      <div class="tile">
        <div class="tile-content el-flex-container el-flex-wrap">
          <div class="quotes-container image-container el-flex-container el-flex-align-center el-flex-justify-center">
            <img class="" src="./images/quotes.svg" alt="" />
          </div>
          <div class="image-container el-flex-container el-flex-align-center el-flex-justify-center">
            <img class="" src="./images/avatar.svg" alt="" />
          </div>
          <div class="el-card-heading-wrap">
            <h5 class="el-subtitle">Steven Shepherd</h5>
            <h6 class="el-card-sub-heading el-mb3">Agent</h6>
            <h6 class="el-card-sub-heading-additional-expanded el-card-sub-heading-additional">
              Homes of Bath (Fine & Country)
            </h6>
          </div>
          <div class="quotes-container-mobile el-flex-container el-flex-align-center el-flex-justify-center">
            <img class="" src="./images/quotes.svg" alt="" />
          </div>
          <p class="el-body-text el-has-grey-text">
            AppMarket is simple to use and puts all your potential prop tech solutions in one location. Apps are simple
            to download, one click and the process begins. Whether you are already utilising the third-party app
            provider or not, it can all be handled through the AppMarket.
          </p>
          <p class="el-body-text el-has-grey-text">
            The AppMarket allows us to make both cost & time savings that we can re-invest into our business, and
            alongside the third-party app offerings there are also a selection of apps that Reapit have developed
            themselves. One of these is GeoDiary, which allows our negotiators to quickly access their diary from the
            app on their mobiles whilst out of the office on appointments. The app allows you to plan your journey,
            contact your clients and access valuable information in seconds. It is a live connection with Reapit which
            means if an appointment is cancelled while you’re on the road, your GeoDiary app will update with this live
            information.
          </p>
          <p class="el-body-text el-has-grey-text">
            Using the App Market has saved us 10 hours a month versus our previous integration processes, and we have
            been able to re-invest this time into generating more valuations and conducting more viewings to generate
            additional business.
          </p>
        </div>
      </div>
      <div class="tile">
        <div class="tile-content el-flex-container el-flex-wrap">
          <div class="quotes-container image-container el-flex-container el-flex-align-center el-flex-justify-center">
            <img class="" src="./images/quotes.svg" alt="" />
          </div>
          <div class="image-container el-flex-container el-flex-align-center el-flex-justify-center">
            <img class="" src="./images/avatar.svg" alt="" />
          </div>
          <div class="el-card-heading-wrap">
            <h5 class="el-subtitle">John Smith</h5>
            <h6 class="el-card-sub-heading el-mb3">Executive Assistant</h6>
            <h6 class="el-card-sub-heading-additional-expanded el-card-sub-heading-additional">Countrywide PLC</h6>
          </div>
          <div class="quotes-container-mobile el-flex-container el-flex-align-center el-flex-justify-center">
            <img class="" src="./images/quotes.svg" alt="" />
          </div>
          <p class="el-body-text el-has-grey-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quas recusandae, facilis atque doloremque commodi est necessitatibus, sunt repellat illum id eos et pariatur magnam perferendis adipisci tempora eum! Maiores.
          </p>
          <p class="el-body-text el-has-grey-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum illum officiis praesentium. Consectetur voluptates ex labore sed omnis dignissimos, natus amet est facilis beatae voluptate quis, ipsum, atque consequatur aliquam.
          </p>
          <p class="el-body-text el-has-grey-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eius error eum quam, veritatis praesentium minima, facilis aperiam sed cumque odit voluptate dolorem libero repudiandae. Id fugiat suscipit voluptatibus nostrum?
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
      max-height: 900px;
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
