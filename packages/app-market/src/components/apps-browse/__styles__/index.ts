import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import {
  forDesktopAndAbove,
  forMobileAndAbove,
  forSuperWidescreenAndAbove,
  forTabletAndAbove,
  forWidescreenAndAbove,
} from '../../../core/__styles__/media'

export const FeaturedHeroAppsCol = styled.div`
  grid-column-end: span 4;

  ${forDesktopAndAbove} {
    grid-column-end: span 2;
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

export const HeroAppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    grid-row-gap: 2.5rem;
    margin-bottom: 2.5rem;
  }
`

export const HeroAppsCol = styled.div`
  grid-column-end: span 4;
  align-self: end;

  ${forTabletAndAbove} {
    grid-column-end: span 2;
  }

  ${forDesktopAndAbove} {
    grid-column-end: span 1;
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

export const AppFilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    grid-row-gap: 2.5rem;
    margin-bottom: 2.5rem;
  }

  ${forWidescreenAndAbove} {
    grid-template-columns: repeat(5, 1fr);
  }

  ${forSuperWidescreenAndAbove} {
    grid-template-columns: repeat(10, 1fr);
  }
`

export const AppFilterCol = styled.div`
  grid-column-end: span 3;
  align-self: end;
  height: 180px;
  padding: 1.25rem 2rem;
  background-color: #eaf5fc;
  border-radius: 0.25rem;

  ${forTabletAndAbove} {
    grid-column-end: span 1;
  }
`

export const appTitleOneLine = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

export const appTitleTwoLine = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

export const appTitleThreeLine = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`

export const FeaturedAppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    grid-row-gap: 2.5rem;
    margin-bottom: 2.5rem;
  }

  ${forSuperWidescreenAndAbove} {
    grid-template-columns: repeat(7, 1fr);
  }
`

export const FeaturedAppsCol = styled.div`
  grid-column-end: span 4;
  align-self: end;
  padding: 1.25rem 2rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  height: 84px;

  ${forMobileAndAbove} {
    grid-column-end: span 2;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 1;
  }
`

export const AppIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`

export const AppFilterLink = styled.a`
  margin-left: 0.5rem;
  margin-top: 0.25rem;
`

export const SimpleAppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    grid-row-gap: 2.5rem;
    margin-bottom: 2.5rem;
  }

  ${forSuperWidescreenAndAbove} {
    grid-template-columns: repeat(10, 1fr);
  }
`

export const SimpleAppsCol = styled.div`
  grid-column-end: span 6;
  align-self: end;
  padding: 1.25rem 2rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  height: 105px;

  ${forMobileAndAbove} {
    grid-column-end: span 2;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 1;
  }
`

export const DeveloperAppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  margin-bottom: 1.25rem;
  background: var(--color-grey-light);
  padding: 1.25rem;

  ${forTabletAndAbove} {
    grid-row-gap: 2.5rem;
    margin-bottom: 2.5rem;
  }

  ${forSuperWidescreenAndAbove} {
    grid-template-columns: repeat(10, 1fr);
  }
`

export const DeveloperAppsColHelper = styled.div`
  grid-column-end: span 6;
  align-self: center;

  ${forMobileAndAbove} {
    grid-column-end: span 4;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 2;
  }
`

export const DeveloperAppsCol = styled.div`
  grid-column-end: span 6;
  align-self: end;
  padding: 1.25rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  background: var(--color-white);
  height: 70px;

  ${forMobileAndAbove} {
    grid-column-end: span 2;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 1;
  }
`
