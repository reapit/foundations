import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElModalBody } from '@reapit/elements'

export const ImageTextPair = styled.div`
  padding: 0.75rem;
  border-radius: 4px;
  background-color: var(--color-grey-50);
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

  @media (min-width: 1390px) {
    grid-column-end: span 4;
  }
`

export const VideoContainer = styled.div`
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 1rem 1rem 0.5rem 1rem;
  cursor: pointer;

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

export const videoModal = css`
  width: 80vw;
  height: 70vh;
  max-width: 2000px;

  ${ElModalBody} {
    width: 100%;
    height: 85%;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
`

export const SubscribeContainer = styled.div`
  border-radius: 4px;
  background-color: var(--color-grey-50);
  padding-top: 2rem;
`

export const SubscribeInnerContainer = styled.div`
  padding: 1.5rem;
  border-radius: 4px;
  background-color: var(--color-white);
  margin: 0 auto 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const subscribeContainerExpanded = css`
  transition:
    height 0.3s linear,
    width 0.3s linear;
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
    padding: 1.5rem 1rem;
  }

  @media (min-width: 1115px) {
    height: 28.5rem;
    width: 19rem;
    padding: 1.5rem;
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
  transition:
    height 0.3s linear,
    width 0.3s linear;
  height: 13em;
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
  margin-top: 3rem;

  button:first-child {
    margin-right: 0.5rem;
  }

  button:last-child {
    margin-left: 0.5rem;
  }

  @media (min-width: 1024px) and (max-width: 1115px) {
    button:first-child {
      margin-right: 0.125rem;
    }

    button:last-child {
      margin-left: 0.125rem;
    }
  }
`

export const SubscribeImageContainer = styled.div`
  height: 23rem;
  transition: height 0.3s linear;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @media (min-width: 580px) {
    height: 15.5rem;
  }

  @media (min-width: 769px) {
    height: 100%;
  }

  @media (min-width: 1025px) {
    height: 24rem;
  }

  @media (min-width: 1115px) {
    height: 23rem;
  }

  @media (min-width: 1400px) {
    height: 18rem;
  }

  @media (min-width: 1700px) {
    height: 15.5rem;
  }
`

export const subscribingContractedContainer = css`
  height: 12.75rem;

  @media (min-width: 580px) {
    height: 11.85rem;
  }

  @media (min-width: 769px) {
    height: 100%;
  }

  @media (min-width: 1025px) {
    height: 12.75rem;
  }

  @media (min-width: 1400px) {
    height: 11.85rem;
  }
`

export const SubscribeImageBars = styled.div`
  transition:
    transform 0.3s linear,
    left 0.3s linear,
    bottom 0.3s linear;
  position: absolute;
  z-index: 1;
`

export const imgBarsInitial = css`
  left: 5%;
  bottom: 19%;

  @media (min-width: 769px) {
    left: 5%;
    bottom: 20%;
  }

  @media (min-width: 1025px) {
    left: 5%;
    bottom: 10%;
  }

  @media (min-width: 1115px) {
    bottom: 15%;
  }

  @media (min-width: 1400px) {
    transform: scale(1.2);
    left: 10%;
    bottom: 11%;
  }

  @media (min-width: 1700px) {
  }
`

export const imgBarsSubscribing = css`
  left: 5%;
  bottom: 10%;

  @media (min-width: 580px) {
    bottom: -5%;
  }

  @media (min-width: 769px) {
    left: 5%;
    bottom: 10%;
    transform: scale(1.2);
  }

  @media (min-width: 1025px) {
    transform: scale(0.8);
    left: 5%;
    bottom: 10%;
  }

  @media (min-width: 1115px) {
    bottom: 12%;
  }

  @media (min-width: 1400px) {
    left: 10%;
    bottom: 0%;
  }

  @media (min-width: 1700px) {
    bottom: -10%;
  }
`

export const SubscribeImageDevices = styled.div`
  transition:
    transform 0.3s linear,
    left 0.3s linear,
    bottom 0.3s linear;
  position: absolute;
  z-index: 3;
`

export const imgDevicesInitial = css`
  bottom: 20%;
  left: 30%;

  @media (min-width: 580px) {
    bottom: 9%;
    left: 40%;
  }

  @media (min-width: 769px) {
    bottom: 5;
    left: 30%;
    transform: scale(1.1);
  }

  @media (min-width: 1025px) {
    transform: scale(0.8);
    left: 20%;
    bottom: 15%;
  }

  @media (min-width: 1115px) {
    transform: scale(1);
    left: 30%;
  }

  @media (min-width: 1400px) {
    left: 40%;
    bottom: 5%;
  }

  @media (min-width: 1700px) {
  }
`

export const imgDevicesSubscribing = css`
  bottom: 0;
  left: 30%;
  transform: scale(0.8);

  @media (min-width: 580px) {
    bottom: -8%;
    left: 40%;
  }

  @media (min-width: 769px) {
    bottom: 20%;
    left: 30%;
  }

  @media (min-width: 1025px) {
    transform: scale(0.8);
    left: 20%;
    bottom: 0%;
  }

  @media (min-width: 1115px) {
    transform: scale(0.8);
    left: 30%;
  }

  @media (min-width: 1400px) {
    bottom: -8%;
    left: 40%;
  }

  @media (min-width: 1700px) {
    left: 45%;
  }
`

export const SubscribeImageFooter = styled.div`
  transition: bottom 0.3s linear;
  width: 100%;
  position: absolute;
  z-index: 2;
`

export const imageFooterInitial = css`
  bottom: 0;

  @media (min-width: 580px) {
    bottom: -28%;
  }

  @media (min-width: 769px) {
    bottom: 0;
  }

  @media (min-width: 1025px) {
  }

  @media (min-width: 1115px) {
  }

  @media (min-width: 1400px) {
    bottom: -20%;
  }

  @media (min-width: 1700px) {
    bottom: -30%;
  }
`

export const imgFooterSubscribing = css`
  bottom: -15%;

  @media (min-width: 580px) {
    bottom: -65%;
  }

  @media (min-width: 769px) {
    bottom: -5%;
  }

  @media (min-width: 1025px) {
    bottom: -15%;
  }

  @media (min-width: 1115px) {
  }

  @media (min-width: 1400px) {
    bottom: -40%;
  }

  @media (min-width: 1700px) {
    bottom: -65%;
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
  }

  > div {
    border-top: 1px solid var(--color-grey-400);
    display: flex;
    margin: 0rem auto 1rem auto;
    padding: 0 1rem;
    font-size: 0.875rem;
  }
`

export const hasGreyText = css`
  color: var(--color-grey-500);
`
