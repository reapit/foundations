import { css } from 'linaria'
import { styled } from 'linaria/react'

const SUBSCRIBE_IMAGE_BREAKPOINT = '1400px'

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
  padding: 1rem;
  border-radius: 4px;
  background-color: var(--color-white);
`

export const SubscribeHeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 1rem;
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
`

export const SubscribeImageContainer = styled.div`
  height: 340px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
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

export const SubscribeImageFooter = styled.img`
  width: 100%;
  position: absolute;
  z-index: 2;
  bottom: 0;

  @media (min-width: ${SUBSCRIBE_IMAGE_BREAKPOINT}) {
    bottom: -20%;
  }
`

export const PriceSection = styled.div`
  display: flex;
  flex-direction: column;

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

export const subscribingStateInitialContainer = css`
  margin: 1rem 4rem;
  padding: 2rem 2rem 1.5rem 2rem;

  // extra breakpoint to deal with squished button
  @media (min-width: 1024px) and (max-width: 1115px) {
    margin: 1rem 3rem;
  }
`
