import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElBodyText, ElSubtitle } from '@reapit/elements'
import {
  forDesktopAndAbove,
  forMobileAndAbove,
  forWidescreenAndAbove,
  forTabletAndAbove,
} from '../../../core/__styles__/media'

export const FeaturedHeroAppsSubtitle = styled(ElSubtitle)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;

  ${forTabletAndAbove} {
    margin-bottom: 0.75rem;
  }
`

export const FeaturedHeroAppsStrapline = styled(ElBodyText)`
  font-size: 14px;
  color: var(--color-grey-dark);
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  ${forMobileAndAbove} {
    font-size: 16px;
  }

  ${forDesktopAndAbove} {
    margin-bottom: 3.75rem;
    -webkit-line-clamp: 3;
  }

  ${forWidescreenAndAbove} {
    margin-bottom: 1.25rem;
    -webkit-line-clamp: 1;
  }
`

export const FeaturedHeroAppsItem = styled.div`
  cursor: pointer;
  width: 100%;
  align-self: end;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    margin-bottom: 2.5rem;
  }

  ${forWidescreenAndAbove} {
    width: calc(50% - 1rem);
    display: inline-block;
    margin-right: 2rem;
  }
`

export const FeaturedHeroAppsContainer = styled.div`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.25rem;

  ${forMobileAndAbove} {
    padding: 1.25rem;
  }

  ${forTabletAndAbove} {
    height: 450px;
  }

  ${forDesktopAndAbove} {
    height: 400px;
  }

  ${forWidescreenAndAbove} {
    height: 550px;
  }
`

export const FeaturedHeroAppsFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${forDesktopAndAbove} {
    flex-direction: row;
  }

  ${forWidescreenAndAbove} {
    flex-direction: column;
  }
`

export const FeaturedHeroAppsContentContainer = styled.div`
  width: 100%;

  ${forDesktopAndAbove} {
    width: calc(25% - 1.5rem);
    margin-right: 3rem;
  }

  ${forWidescreenAndAbove} {
    width: 100%;
    margin-right: 0;
  }
`

export const FeaturedHeroAppsNameContainer = styled.div`
  margin-left: 0.75rem;

  ${forMobileAndAbove} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: auto;
  }

  ${forDesktopAndAbove} {
    margin-left: 0;
  }

  ${forWidescreenAndAbove} {
    display: block;
    margin-left: 0.75rem;
  }
`

export const FeaturedHeroAppsInnerContainer = styled.div`
  display: flex;

  ${forMobileAndAbove} {
    margin-bottom: 0.75rem;
    justify-content: space-between;
  }

  ${forDesktopAndAbove} {
    margin-bottom: 0.75rem;
    flex-direction: column;
  }

  ${forWidescreenAndAbove} {
    margin-bottom: 0;
    flex-direction: row;
  }
`

export const FeaturedHeroAppsIcon = styled.img`
  border-radius: 0.25rem;
  width: 48px;
  height: 48px;
  padding: 0.25rem;
  background-color: var(--color-white);

  ${forMobileAndAbove} {
    border-radius: 0.5rem;
    width: 72px;
    height: 72px;
  }

  ${forDesktopAndAbove} {
    border-radius: 1rem;
    margin-bottom: 1.25rem;
    width: 96px;
    height: 96px;
  }
`

export const FeaturedHeroAppsImageContainer = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${forMobileAndAbove} {
    height: 280px;
  }

  ${forDesktopAndAbove} {
    width: calc(75% - 1.5rem);
    height: auto;
  }

  ${forWidescreenAndAbove} {
    width: 100%;
    height: 100%;
  }
`

export const featuredHeroAppsButtonMobTablet = css`
  display: none;

  ${forMobileAndAbove} {
    display: block;
  }

  ${forDesktopAndAbove} {
    display: none;
  }

  ${forWidescreenAndAbove} {
    display: block;
  }
`

export const featuredHeroAppsButtonDesktop = css`
  display: none;

  ${forDesktopAndAbove} {
    display: block;
  }

  ${forWidescreenAndAbove} {
    display: none;
  }
`
