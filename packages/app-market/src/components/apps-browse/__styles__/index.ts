import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { forDesktopAndAbove, forMobileAndAbove, forTabletAndAbove } from '../../../core/__styles__/media'

export const FeaturedHeroAppsWrapper = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 2.5rem;
  font-size: 0;

  ${forDesktopAndAbove} {
    width: calc(50% - 1.25rem);
    margin-right: 1.25rem;
  }
`

export const FeaturedHeroAppsContainer = styled.div`
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.25rem;

  ${forTabletAndAbove} {
    height: 400px;
  }
`

export const FeaturedHeroAppsContentContainer = styled.div`
  width: 100%;

  ${forMobileAndAbove} {
    width: 276px;
    margin-right: 3rem;
  }
`

export const FeaturedHeroAppsIcon = styled.img`
  margin-bottom: 1.25rem;
  border-radius: 1rem;
  width: 48px;
  height: 48px;

  ${forMobileAndAbove} {
    width: 96px;
    height: 96px;
  }
`

export const FeaturedHeroAppsImageContainer = styled.div`
  width: 100%;

  ${forTabletAndAbove} {
    width: calc(100% - 276px);
  }
`

export const featuredHeroAppsButton = css`
  display: none;

  ${forTabletAndAbove} {
    display: block;
  }
`

export const HeroAppsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const HeroAppsChip = styled.div`
  background: var(--color-white);
  color: var(--color-grey-dark);
  font-size: var(--font-size-small);
  border-radius: 0.25rem;
  padding: 1px 0.5rem;
  margin: 0.25rem 0.5rem 0.75rem 0;
  display: inline-block;
`

export const HeroAppsWrapper = styled.div`
  display: inline-block;
  font-size: 0;
  width: 100%;
  margin-bottom: 2.5rem;

  ${forMobileAndAbove} {
    width: 50%;
    width: calc(50% - 0.625rem);
    margin-right: 1.25rem;
  }

  ${forDesktopAndAbove} {
    width: 25%;
    width: calc(25% - 0.625rem);
  }

  &:last-child {
    margin-right: 0;
  }
`

export const HeroAppsContainer = styled.div`
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.25rem;

  ${forTabletAndAbove} {
    height: 295px;
  }

  ${forDesktopAndAbove} {
    height: 400px;
  }
`

export const HeroAppsContentContainer = styled.div`
  width: 100%;

  ${forMobileAndAbove} {
    margin-right: 3rem;
  }

  ${forTabletAndAbove} {
    width: 177px;
  }
`

export const HeroAppsIcon = styled.img`
  margin-bottom: 1.25rem;
  border-radius: 1rem;
  width: 48px;
  height: 48px;

  ${forMobileAndAbove} {
    width: 72px;
    height: 72px;
  }
`

export const HeroAppsImageContainer = styled.div`
  width: 100%;

  ${forTabletAndAbove} {
    width: calc(100% - 177px);
  }
`

export const heroAppsStrapline = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-bottom: 1.25rem;

  ${forMobileAndAbove} {
    min-height: 3.75rem;
    -webkit-line-clamp: 3;
  }

  ${forTabletAndAbove} {
    margin-bottom: 3.75rem;
  }
`

export const heroAppsTitle = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

export const heroAppsFlexToggle = css`
  flex-direction: column;

  ${forTabletAndAbove} {
    flex-direction: row;
  }
`

export const heroSubMinHeight = css`
  min-height: 2rem;
`

export const AppFilterCollectionContainer = styled.div`
  width: 100%;
  height: 180px;
  padding: 1.25rem 2rem;
  background-color: #eaf5fc;
  border-radius: 0.25rem;
  margin-bottom: 2.5rem;

  ${forMobileAndAbove} {
    width: 33.33%;
    width: calc(33.33% - 0.625rem);
    margin-right: 1.25rem;
  }

  ${forDesktopAndAbove} {
    width: 20%;
    width: calc(20% - 0.625rem);
  }
`
