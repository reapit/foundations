import { css } from 'linaria'

export const developerDesktopPricingTile = css`
  .modal-card-head {
    justify-content: center;

    h5 {
      font-weight: normal;
    }
  }

  .desktop-inner-container {
    margin: 0;
    border: 1px solid #dbdbdb;

    @media (min-width: 1200px) {
      margin: 1rem;
    }

    @media (min-width: 1400px) {
      margin: 0 3rem;
    }
  }

  .desktop-price {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .desktop-price-period {
    font-size: 1.6rem;
    color: #74818d;
  }
`
