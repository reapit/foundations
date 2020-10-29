import { css } from 'linaria'

export const paymentStyles = css`
  /* Pasha styles – Brand-overrides, can split these out */
  :root {
    --accent-color: #ed5f74;
    --success-color: #5fed82;
    --headline-color: var(--accent-color);
    --logo-image: url('https://storage.googleapis.com/stripe-sample-images/logo-pasha.svg');
  }

  .pasha-image-stack {
    display: grid;
    grid-gap: 12px;
    grid-template-columns: auto auto;
  }

  .pasha-image-stack img {
    border-radius: var(--radius);
    background-color: var(--gray-border);
    box-shadow: 0 7px 14px 0 rgba(50, 50, 93, 0.1),
      0 3px 6px 0 rgba(0, 0, 0, 0.07);
    transition: all 0.8s ease;
    opacity: 0;
  }

  .pasha-image-stack img:nth-child(1) {
    transform: translate(12px, -12px);
    opacity: 1;
  }
  .pasha-image-stack img:nth-child(2) {
    transform: translate(-24px, 16px);
    opacity: 1;
  }
  .pasha-image-stack img:nth-child(3) {
    transform: translate(68px, -100px);
    opacity: 1;
  }

  .sample-info {
    padding: 20px 30px;
    border: 1px solid var(--gray-border);
    border-radius: var(--radius);

    position: fixed;
    top: 10px;
    left: 50%;
    margin-left: -250px;
    max-width: 500px;
  }

  @media (max-width: 720px) {
    .sample-info {
      top: 0;
    }
  }
`
