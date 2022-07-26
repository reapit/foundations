import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElSubtitle, ElTitle } from '@reapit/elements'
import {
  forDesktopAndAbove,
  forMobileAndAbove,
  forSuperWidescreenAndAbove,
  forTabletAndAbove,
} from '../../../core/__styles__/media'

export const browseAppsTitleHasFilters = css`
  margin-bottom: 0;
`

export const BrowseAppsTitle = styled(ElTitle)`
  margin-top: 0.5rem;
  font-size: 28px;

  &.${browseAppsTitleHasFilters} {
    margin-bottom: 0;
  }
`

export const BrowseAppsSubtitle = styled(ElSubtitle)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

export const FeaturedHeroAppsItem = styled.div`
  cursor: pointer;
  width: 100%;
  align-self: end;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    margin-bottom: 2.5rem;
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

export const FeaturedHeroAppsNameContainer = styled.div`
  margin-left: 0.75rem;

  ${forMobileAndAbove} {
    margin-left: 0;
  }
`

export const FeaturedHeroAppsInnerContainer = styled.div`
  display: flex;

  ${forMobileAndAbove} {
    flex-direction: column;
  }
`

export const FeaturedHeroAppsIcon = styled.img`
  border-radius: 0.25rem;
  width: 48px;
  height: 48px;

  ${forMobileAndAbove} {
    border-radius: 1rem;
    margin-bottom: 1.25rem;
    width: 96px;
    height: 96px;
  }
`

export const FeaturedHeroAppsImageContainer = styled.div`
  width: 100%;
  height: 140px;

  ${forTabletAndAbove} {
    width: calc(100% - 276px);
    height: auto;
  }
`

export const featuredHeroAppsButton = css`
  display: none;

  ${forTabletAndAbove} {
    display: block;
  }
`

export const HeroAppsContainer = styled.div`
  width: 100%;
  align-self: end;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    margin-bottom: 2.5rem;
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

export const HeroAppsInnerContainer = styled.div`
  width: 100%;
  padding: 1.25rem;
  border-radius: 0.25rem;

  ${forTabletAndAbove} {
    height: 400px;
  }
`

export const HeroAppsContentContainer = styled.div`
  display: flex;

  ${forMobileAndAbove} {
    flex-direction: column;
  }
`

export const HeroAppsNameContainer = styled.div`
  margin-left: 0.75rem;

  ${forMobileAndAbove} {
    margin-left: 0;
  }
`

export const HeroAppsIcon = styled.img`
  border-radius: 0.25rem;
  width: 48px;
  height: 48px;

  ${forMobileAndAbove} {
    margin-bottom: 1.25rem;
    border-radius: 1rem;
    width: 72px;
    height: 72px;
  }
`

export const HeroAppsImageContainer = styled.div`
  width: 100%;
  height: 100px;

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

export const AppFilterCol = styled.div`
  cursor: pointer;
  padding: 0.75rem;
  background-color: #eaf5fc;
  border-radius: 0.25rem;
  height: 192px;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    margin-bottom: 2.5rem;
  }
`

export const appFilterTitle = css`
  height: 1.25rem;
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
  cursor: pointer;
  grid-column-end: span 4;
  align-self: end;
  padding: 1.25rem 2rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  height: 84px;
  min-width: 0;

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
  cursor: pointer;
  grid-column-end: span 6;
  align-self: end;
  padding: 1.25rem 2rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  height: 105px;
  min-width: 0;

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
  cursor: pointer;
  grid-column-end: span 6;
  align-self: center;
  min-width: 0;

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
  min-width: 0;

  ${forMobileAndAbove} {
    grid-column-end: span 2;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 1;
  }
`

export const AppSearchFiltersWrap = styled.div`
  display: flex;
  justify-content: space-between;

  ${forMobileAndAbove} {
    flex-direction: column;
  }
`

export const AppsSearchInput = styled.input`
  font-family: var(--font-sans-serif);
  font-size: 14px;
  display: flex;
  flex-grow: 1;
  border-radius: 0 0.25rem 0.25rem 0;
  background: var(--component-input-focus-bg);
  height: 2.5rem;
  border: none;
  margin: 0;
  color: black;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: black;
    font-size: 14px;
  }

  ${forTabletAndAbove} {
    width: 25%;
  }
`

export const appsSearchContainer = css`
  width: 100%;

  ${forMobileAndAbove} {
    width: 50%;
  }

  ${forTabletAndAbove} {
    width: 33.33%;
  }

  ${forDesktopAndAbove} {
    width: 25%;
  }
`

export const appsSearchInputIcon = css`
  border-radius: 0.25rem 0 0 0.25rem;
  padding: 0 0.5rem 0 1.25rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey-light);
`

export const appsSearchMobileControls = css`
  display: flex;

  ${forMobileAndAbove} {
    display: none;
  }
`

export const appsSearchDesktopControls = css`
  display: none;

  ${forMobileAndAbove} {
    display: flex;
  }
`

export const appsSearchMobileIconActive = css``

export const appsSearchMobileIcon = css`
  margin-right: 0.5rem;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: var(--color-grey-light);
  border-radius: 0.25rem;

  &:last-child {
    margin-right: 0;
  }

  &.${appsSearchMobileIconActive} {
    color: var(--intent-primary);
  }
`

export const appsSearchMobileFilterControlsActive = css``

export const AppsSearchMobileFilterControls = styled.div`
  display: flex;

  ${forMobileAndAbove} {
    display: none;
  }

  &.${appsSearchMobileFilterControlsActive} {
    padding: 1.25rem 0;
  }
`

export const appsFiltersMobileBrowseBy = css`
  min-height: 1.5rem;
`

export const appsFiltersCategories = css`
  width: 100%;
  margin-bottom: 1.25rem;

  ${forMobileAndAbove} {
    margin-bottom: 2.5rem;
  }
`

export const cardCursor = css`
  cursor: pointer;
`

export const IsFreeNotice = styled.span`
  z-index: 50;
  color: var(--color-white);
  font-size: 0.875rem;
  font-weight: bold;
  padding: 0.1rem 0.4rem;
  border-radius: 0.25rem;
  background: var(--intent-secondary);
  margin-right: auto;

  ${forMobileAndAbove} {
    margin-right: 0;
  }
`
