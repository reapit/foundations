<style>
  .loader-spinner-container {
    height: 5em;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .loader-spinner {
    width: auto;
    height: 3.5em;
  }

  .loader-spinner > div {
    background-color: grey;
    height: 100%;
    width: 0.33em;
    margin: 2px;
    display: inline-block;
    border-radius: 15%;
    animation: loader-animation 1.2s infinite ease-in-out;
  }

  .loader-spinner > div:nth-of-type(1) {
    animation-delay: -1.1s;
  }

  .loader-spinner > div:nth-of-type(2) {
    animation-delay: -1s;
  }

  .loader-spinner > div:nth-of-type(3) {
    animation-delay: -0.9s;
  }

  .loader-spinner > div:nth-of-type(4) {
    animation-delay: -0.8s;
  }

  @keyframes loader-animation {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
</style>

<div class="loader-spinner-container">
  <div class="loader-spinner">
    <div />
    <div />
    <div />
    <div />
  </div>
</div>
