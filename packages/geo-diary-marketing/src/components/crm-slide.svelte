<script lang="ts">
  $: modalVisible = false

  const setModalVisible = () => (modalVisible = !modalVisible)
</script>

<div class="container el-wscreen">
  <div class="inner-container el-flex-container el-flex-column el-flex-align-center el-mxauto">
    <h2 class="el-title el-text-center">Anywhere, Anytime, Any Device</h2>
    <div class="el-flex-container el-flex-align-center">
      <h6 class="el-subtitle el-mr3">How it works</h6>
      <a
        class="is-hidden-desktop"
        href="https://www.youtube.com/watch?v=iKdil7liAts&amp;t=3s"
        rel="noopener noreferrer"
        target="_blank"
      >
        <button class="el-intent-critical el-button el-mr3 el-mb3">Watch Video</button>
      </a>
      <button
        class="el-intent-critical el-button el-mr3 el-mb3 is-hidden-mobile"
        on:click|preventDefault={setModalVisible}>Watch Video</button
      >
    </div>
    <img class="is-hidden-mobile" src="./images/crm-desktop-hero.svg" alt="View of calendar and mobile app overlaid" />
    <img class="is-hidden-desktop" src="./images/crm-mobile-hero.svg" alt="View of calendar and mobile app overlaid" />
    <div class="el-flex-container column-container">
      <div class="column el-flex-container el-flex-column el-px2">
        <p class="el-body-text el-has-grey-text">
          <strong
            >Quick and easy to install, the GEO Diary app lets you access your AgencyCloud diary appointments from
            anywhere. You can view your appointments for today, tomorrow or the whole week, direct from an app on your
            phone or via a web browser.
          </strong>
        </p>
        <p class="el-body-text el-has-grey-text">
          You can view your appointments for today, tomorrow or for the whole week, direct from an app on your phone or
          via a web browser.
        </p>
      </div>
      <div class="column el-px2">
        <p class="el-body-text el-has-grey-text">
          Running late for an appointment? Send an automated ETA text message. Carried out a viewing? Enter your follow
          up notes direct on the appointment to have it instantly stored in the AgencyCloud record.
        </p>

        <p class="el-body-text el-has-grey-text">
          With Geo Diary you have full control – so there’s no reason to ever worry about your appointment management
          again.
        </p>
      </div>
    </div>
  </div>
  <div class="el-modal-bg" class:el-is-active={modalVisible} on:click|preventDefault={setModalVisible} />
  <div class="el-modal modal-wrapper" class:el-is-active={modalVisible}>
    <svg
      class="close-icon"
      width="1em"
      height="1em"
      on:click|preventDefault={setModalVisible}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.8336 17.2478C16.1265 17.5407 16.6014 17.5407 16.8943 17.2478C17.1872 16.955 17.1872 16.4801 16.8943 16.1872L10.7071 10L16.8943 3.81282C17.1872 3.51992 17.1872 3.04505 16.8943 2.75216C16.6014 2.45926 16.1265 2.45926 15.8336 2.75216L9.64643 8.93934L3.8128 3.10571C3.51991 2.81282 3.04503 2.81282 2.75214 3.10571C2.45925 3.3986 2.45925 3.87348 2.75214 4.16637L8.58577 10L2.75214 15.8336C2.45925 16.1265 2.45925 16.6014 2.75214 16.8943C3.04503 17.1872 3.51991 17.1872 3.8128 16.8943L9.64643 11.0607L15.8336 17.2478Z"
        fill="currentColor"
      />
    </svg>
    <iframe
      width="100%"
      height="100%"
      src={modalVisible ? 'https://www.youtube.com/embed/iKdil7liAts' : ''}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</div>

<style>
  .container {
    background: linear-gradient(180deg, #f2f2f2 0%, rgba(242, 242, 242, 0) 100%);
    margin-bottom: 2rem;
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

  .close-icon {
    top: 0.5rem;
    right: 0.5rem;
    position: absolute;
    height: 1.5rem;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
  }

  .modal-wrapper {
    overflow-y: scroll;
    width: 90vw;
    height: 90vh;
    max-width: 90vw;
    max-height: 90vh;
    transform: translate(-50%, -40%);
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

    h2 {
      font-size: 2rem;
      line-height: 2.25rem;
    }

    img {
      margin: -2.5rem 0 auto 0;
    }
  }
</style>
