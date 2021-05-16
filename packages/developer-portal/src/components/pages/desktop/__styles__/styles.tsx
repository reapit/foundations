import { css } from 'linaria'
import { styled } from 'linaria/react'

const SUBSCRIBE_IMAGE_BREAKPOINT = '1400px'
const SUBSCRIBE_BUTTON_QUERY = '@media (min-width: 1024px) and (max-width: 1115px)'
// const SUBSCRIBE_INNER_BP_LARGE = '1'

export const ImageTextPair = styled.div`
  padding: 0.75rem;
  border-radius: 4px;
  background-color: var(--color-grey-light);
  display: flex;
`

export const TextWrap = styled.div`
  display: flex;
  align-items: center;
  vertical-align: center;
  font-size: var(--font-size-small);
  line-height: 1.125rem;
  margin-left: 1rem;
`

export const BannerCol = styled.div`
  grid-column-end: span 12;

  @media (min-width: 1165px) {
    grid-column-end: span 4;
  }
`

export const VideoContainer = styled.div`
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 1rem 1rem 0.5rem 1rem;

  img {
    margin-bottom: 1rem;
    width: 100%;
  }

  p {
    margin-bottom: 1.5rem;
  }

  svg {
    width: 100%;
  }
`

export const SubscribeContainer = styled.div`
  border-radius: 4px;
  background-color: var(--color-grey-light);
  padding-top: 2rem;
`

export const SubscribeInnerContainer = styled.div`
  padding: 2rem 1.5rem;
  border-radius: 4px;
  background-color: var(--color-white);
  margin: 0 auto 2rem auto;
`

export const subscribeContainerExpanded = css`
  transition: height 0.3s linear, width 0.3s linear;
  height: 28.5rem;
  width: 19rem;

  @media (min-width: 580px) {
    height: 21rem;
    width: 30rem;
  }

  @media (min-width: 769px) {
    height: 28.5rem;
    width: 19rem;
  }

  @media (min-width: 1025px) {
    height: 29.5rem;
    width: 17rem;
    padding: 2rem 1rem;
  }

  @media (min-width: 1115px) {
    height: 28.5rem;
    width: 19rem;
    padding: 2rem 1.5rem;
  }

  @media (min-width: 1400px) {
    height: 23.5rem;
    width: 25rem;
  }

  @media (min-width: 1700px) {
    height: 21rem;
    width: 30rem;
  }
`

export const subscribeContainerContracted = css`
  transition: height 0.3s linear, width 0.3s linear;
  height: 12.25rem;
  width: 15rem;
`

export const SubscribeHeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 1rem 1rem 1rem;
`

export const SubscribeButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button:first-child {
    margin-right: 0.5rem;
  }

  button:last-child {
    margin-left: 0.5rem;
  }

  ${SUBSCRIBE_BUTTON_QUERY} {
    button:first-child {
      margin-right: 0.125rem;
    }

    button:last-child {
      margin-left: 0.125rem;
    }
  }
`

export const SubscribeImageContainer = styled.div`
  height: 380px;
  transition: height 0.3s linear;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
`

export const subscribingContractedContainer = css`
  height: 280px;
`

export const SubscribeImageBars = styled.img`
  position: absolute;
  left: 5%;
  bottom: 19%;
  z-index: 1;

  @media (min-width: ${SUBSCRIBE_IMAGE_BREAKPOINT}) {
    transform: scale(1.2);
    left: 10%;
    bottom: 11%;
  }
`

export const imgBarsContracted = css`
  animation: bars-image-contract 0.3s linear forwards;

  @keyframes bars-image-contract {
    from {
      bottom: 19%;
      transform: scale(1);
    }
    to {
      bottom: 10%;
      transform: scale(0.8);
    }
  }
`

export const SubscribeImageDevices = styled.img`
  position: absolute;
  z-index: 3;
  bottom: 20%;
  left: 30%;

  @media (min-width: ${SUBSCRIBE_IMAGE_BREAKPOINT}) {
    transform: scale(1.2);
    left: 40%;
    bottom: 20%;
  }
`

export const imgDevicesContracted = css`
  animation: devices-image 0.3s linear forwards;

  @keyframes devices-image {
    from {
      bottom: 20%;
      transform: scale(1);
    }
    to {
      bottom: 0;
      transform: scale(0.8);
    }
  }
`

export const SubscribeImageFooter = styled.img`
  width: 100%;
  position: absolute;
  z-index: 2;
  bottom: 0;

  @media (min-width: ${SUBSCRIBE_IMAGE_BREAKPOINT}) {
    bottom: -20%;
  }
`

export const imgFooterContracted = css`
  animation: footer-image 0.3s linear forwards;

  @keyframes footer-image {
    from {
      bottom: 0;
    }
    to {
      bottom: -20px;
    }
  }
`

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;

  h3 {
    font-size: 3rem;
    font-weight: normal;
    text-align: center;
    margin-bottom: 1.5rem;
  }

  div {
    border-top: 1px solid var(--color-grey-medium);
    display: flex;
    max-width: 5rem;
    margin: 0rem auto 1rem auto;
    padding: 0 1rem;
    font-size: 0.875rem;
  }
`

export const hasGreyText = css`
  color: var(--color-grey-dark);
`
