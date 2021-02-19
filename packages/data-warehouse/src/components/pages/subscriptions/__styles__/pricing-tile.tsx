import { styled } from 'linaria/react'

export const PricingTile = styled.div`
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

  li {
    list-style-position: inside;
  }
`
