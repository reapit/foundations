import React, { FC } from 'react'
import { styled } from '@linaria/react'
import { isTablet } from '../styles/media'
import { ReactComponent as ReapitLogoInfographic } from '../../assets/infographic-icons/reapitLogoInfographic.svg'

const WelcomeWrapper = styled.div`
  background-color: var(--color-white);
  width: 100%;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: space-evenly;

  svg {
    height: 40px;
    width: 200px;
    display: block;
    margin-bottom: 2rem;
  }
`

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--color-black);

  ${isTablet} {
    width: 65%;
  }
`

const WelcomeFooter = styled.div`
  display: flex;
  background-color: var(--color-grey-100);
  flex-wrap: wrap;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`

const WelcomeFooterItem = styled.div`
  width: 50%;
  box-sizing: border-box;
  color: var(--color-black);
  display: flex;
  flex-direction: column;
  padding: 2rem;

  p {
    margin-bottom: 0.5rem;
  }

  ${isTablet} {
    width: 25%;
  }
`

export const WelcomeFooterTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--color-black);
  margin-bottom: 1rem;
`

export const Welcome: FC = () => {
  return (
    <>
      <WelcomeWrapper>
        <ReapitLogoInfographic />
        <WelcomeTitle>Elements UI Component Library</WelcomeTitle>
      </WelcomeWrapper>
      <WelcomeFooter>
        <WelcomeFooterItem>
          <WelcomeFooterTitle>Composable</WelcomeFooterTitle>
          <p>Building blocks using atomic principles designed to work together</p>
          <p>Supports theming out the box</p>
          <p>Modifiers and custom styling options</p>
        </WelcomeFooterItem>
        <WelcomeFooterItem>
          <WelcomeFooterTitle>Presentational</WelcomeFooterTitle>
          <p>Implements the Reapit Foundations Design System</p>
          <p>Just the UI approach - complete developer flexibility on behaviour</p>
        </WelcomeFooterItem>
        <WelcomeFooterItem>
          <WelcomeFooterTitle>Agnostic</WelcomeFooterTitle>
          <p>Add your own custom JS or TS to control behaviour</p>
          <p>Designed to be used as React Components or as CSS classes in any web framework</p>
        </WelcomeFooterItem>
        <WelcomeFooterItem>
          <WelcomeFooterTitle>Reliable</WelcomeFooterTitle>
          <p>Excellent test coverage, strongly typed</p>
          <p>Production hardened across the Reapit Estate</p>
          <p>Tiny dependency footprint</p>
        </WelcomeFooterItem>
      </WelcomeFooter>
    </>
  )
}
