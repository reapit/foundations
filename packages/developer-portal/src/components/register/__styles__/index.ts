import { styled } from '@linaria/react'
import { forMobileOnly } from '../../../core/__styles__/media'
import { css } from '@linaria/core'

export const RegisterContainer = styled.div`
  min-width: 100vw;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background: url('./../../login/__styles__/login-bg.svg') left center no-repeat;
  background-size: cover;
  height: 100vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`

export const RegisterContentWrapper = styled.div`
  max-width: 30rem;
  width: 30rem;
  pointer-events: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto;
  background-color: var(--color-white);
  padding: 1.25rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;

  img {
    margin: 0 auto 3rem auto;
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`

export const RegisterImageContainer = styled.div`
  ${forMobileOnly} {
    display: none;
  }
`

export const registrationForm = css`
  margin-top: 1rem;
  width: 100%;
`

export const TermsConditionsViewer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  .pdf-viewer {
    border: 1px solid black;
    width: 100%;
    height: 100%;
  }
`
