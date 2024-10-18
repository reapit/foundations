import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { BodyText, Subtitle } from '@reapit/elements'
import {
  forDesktopAndAbove,
  forMobileAndAbove,
  forWidescreenAndAbove,
  forTabletAndAbove,
} from '../../../core/__styles__/media'

export const FeaturedHeroAppsSubtitle = styled(Subtitle)`
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

export const FeaturedHeroAppsStrapline = styled(BodyText)`
  font-size: 14px;
  color: var(--color-grey-dark);
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;

  ${forMobileAndAbove} {
    font-size: 16px;
    min-height: 2.5rem;
  }

  ${forDesktopAndAbove} {
    margin-bottom: 2.5rem;
    -webkit-line-clamp: 3;
    min-height: 3.75rem;
  }

  ${forWidescreenAndAbove} {
    margin-bottom: 1.25rem;
    -webkit-line-clamp: 1;
    min-height: 1.25rem;
  }
`

export const FeaturedHeroAppsItem = styled.div`
  cursor: pointer;
  width: 100%;
  align-self: end;
  margin-bottom: 1.25rem;

  ${forMobileAndAbove} {
    margin-bottom: 2.5rem;
  }

  ${forWidescreenAndAbove} {
    width: calc(50% - 0.625rem);
    display: inline-block;
    margin-right: 1.25rem;
  }
`

export const FeaturedHeroAppsContainer = styled.div`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;

  ${forMobileAndAbove} {
    padding: 1.25rem;
  }

  ${forTabletAndAbove} {
    height: 430px;
  }

  ${forDesktopAndAbove} {
    height: 400px;
  }

  ${forWidescreenAndAbove} {
    height: 556px;
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
    width: 25%;
    margin-right: 1.25rem;
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
  padding: 0.375rem;
  background-color: var(--color-white);

  ${forMobileAndAbove} {
    border-radius: 0.375rem;
    padding: 0.5rem;
    width: 72px;
    height: 72px;
  }

  ${forDesktopAndAbove} {
    border-radius: 0.5rem;
    padding: 0.625rem;
    margin-bottom: 1.25rem;
    width: 96px;
    height: 96px;
  }
`

export const FeaturedHeroAppsImageContainer = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  ${forMobileAndAbove} {
    height: 260px;
  }

  ${forDesktopAndAbove} {
    width: 75%;
    height: auto;
    margin-left: 1.25rem;
  }

  ${forWidescreenAndAbove} {
    margin-left: 0;
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
