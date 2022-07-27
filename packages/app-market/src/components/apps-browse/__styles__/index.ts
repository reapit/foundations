import { forWidescreenAndAbove } from './../../../core/__styles__/media'
import { ElBodyText } from './../../../../../elements/src/components/typography/__styles__/index'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElSubtitle, ElTitle } from '@reapit/elements'
import {
  forDesktopAndAbove,
  forMobileAndAbove,
  forSuperWidescreenAndAbove,
  forTabletAndAbove,
} from '../../../core/__styles__/media'

export const browseAppsTitleHasFilters = css``

export const browseAppsSubtitlePlaceholder = css``

export const BrowseAppsTitle = styled(ElTitle)`
  margin-top: 0.5rem;
  font-size: 28px;

  &.${browseAppsTitleHasFilters} {
    margin-bottom: 0;
  }

  ${forMobileAndAbove} {
    margin-top: 0;
    font-size: 32px;
    line-height: 36px;
  }
`

export const BrowseAppsSubtitle = styled(ElSubtitle)`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 0.5rem;

  ${forMobileAndAbove} {
    font-size: 20px;
    line-height: 24px;
  }

  &.${browseAppsSubtitlePlaceholder} {
    height: 24px;
  }
`

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

  ${forSuperWidescreenAndAbove} {
    margin-bottom: 0.5rem;
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

  ${forSuperWidescreenAndAbove} {
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
    height: 400px;
  }

  ${forSuperWidescreenAndAbove} {
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

  ${forSuperWidescreenAndAbove} {
    flex-direction: column;
  }
`

export const FeaturedHeroAppsContentContainer = styled.div`
  width: 100%;

  ${forDesktopAndAbove} {
    width: calc(25% - 1.5rem);
    margin-right: 3rem;
  }

  ${forSuperWidescreenAndAbove} {
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

  ${forSuperWidescreenAndAbove} {
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

  ${forSuperWidescreenAndAbove} {
    margin-bottom: 0;
    flex-direction: row;
  }
`

export const FeaturedHeroAppsIcon = styled.img`
  border-radius: 0.25rem;
  width: 48px;
  height: 48px;

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
  height: 140px;

  ${forMobileAndAbove} {
    height: 250px;
  }

  ${forDesktopAndAbove} {
    width: calc(75% - 1.5rem);
    height: auto;
  }

  ${forSuperWidescreenAndAbove} {
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

  ${forSuperWidescreenAndAbove} {
    display: block;
  }
`

export const featuredHeroAppsButtonDesktop = css`
  display: none;

  ${forDesktopAndAbove} {
    display: block;
  }

  ${forSuperWidescreenAndAbove} {
    display: none;
  }
`

export const HeroAppsContainer = styled.div`
  cursor: pointer;
  width: 100%;
  align-self: end;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    margin-bottom: 2.5rem;
  }
`

export const heroAppsCarouselWidescreen = css`
  ${forSuperWidescreenAndAbove} {
    width: calc(50% - 1rem);
    display: inline-block;
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
  font-size: 12px;
  border-radius: 0.25rem;
  padding: 1px 0.5rem;
  margin: 0rem 0.25rem 0.25rem 0;
  display: inline-block;
  align-self: flex-start;

  ${forMobileAndAbove} {
    font-size: 14px;
    line-height: 18px;
  }
`

export const HeroAppsSubtitle = styled(ElSubtitle)`
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;

  ${forMobileAndAbove} {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 0.5rem;
  }
`

export const HeroAppsStrapline = styled(ElBodyText)`
  font-size: 12px;
  color: var(--color-grey-dark);
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;

  ${forMobileAndAbove} {
    font-size: 14px;
    line-height: 18px;
    -webkit-line-clamp: 4;
  }

  ${forTabletAndAbove} {
    -webkit-line-clamp: 2;
    margin-bottom: 1.25rem;
  }

  ${forDesktopAndAbove} {
    font-size: 16px;
    line-height: 20px;
    -webkit-line-clamp: 5;
    margin-bottom: 0;
  }

  ${forSuperWidescreenAndAbove} {
    -webkit-line-clamp: 2;
    margin-bottom: 1.25rem;
  }
`

export const HeroAppsInnerContainer = styled.div`
  width: 100%;
  border-radius: 0.25rem;
  padding: 0.75rem;

  ${forMobileAndAbove} {
    padding: 1.25rem;
  }

  ${forTabletAndAbove} {
    height: 400px;
  }

  ${forDesktopAndAbove} {
    height: 300px;
  }

  ${forSuperWidescreenAndAbove} {
    height: 550px;
  }
`

export const HeroAppsContentContainer = styled.div`
  display: flex;

  ${forMobileAndAbove} {
    flex-direction: column;
    margin-bottom: 0.5rem;
  }

  ${forTabletAndAbove} {
    flex-direction: row;
    margin-bottom: 0;
  }

  ${forDesktopAndAbove} {
    flex-direction: column;
    margin-bottom: 0.5rem;
  }

  ${forSuperWidescreenAndAbove} {
    flex-direction: row;
    margin-bottom: 0;
  }
`

export const HeroAppsContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${forMobileAndAbove} {
    width: 40%;
    margin-right: 1.25rem;
    height: 230px;
  }

  ${forTabletAndAbove} {
    width: 100%;
    margin-right: 0;
    height: 148px;
  }

  ${forDesktopAndAbove} {
    width: calc(33.33% - 1.25rem);
    margin-right: 1.25rem;
    height: 100%;
  }

  ${forSuperWidescreenAndAbove} {
    width: 100%;
    margin-right: 0;
    height: 155px;
  }
`

export const HeroAppsNameContainer = styled.div`
  margin-left: 0.75rem;

  ${forMobileAndAbove} {
    margin-left: 0;
  }

  ${forTabletAndAbove} {
    margin-left: 0.75rem;
  }

  ${forDesktopAndAbove} {
    margin-left: 0;
  }

  ${forSuperWidescreenAndAbove} {
    margin-left: 0.75rem;
  }
`

export const HeroAppsIcon = styled.img`
  border-radius: 0.25rem;
  width: 40px;
  height: 40px;

  ${forMobileAndAbove} {
    margin-bottom: 1.25rem;
    border-radius: 0.5rem;
    width: 72px;
    height: 72px;
  }
`

export const HeroAppsImageContainer = styled.div`
  width: 100%;
  height: 100px;

  ${forMobileAndAbove} {
    width: 60%;
    height: auto;
  }

  ${forTabletAndAbove} {
    width: 100%;
    flex-grow: 1;
  }

  ${forDesktopAndAbove} {
    width: auto;
  }

  ${forSuperWidescreenAndAbove} {
    width: 100%;
    flex-grow: 1;
  }
`

export const heroAppsFlexToggle = css`
  flex-direction: column;

  ${forMobileAndAbove} {
    flex-direction: row;
  }

  ${forTabletAndAbove} {
    flex-direction: column;
  }

  ${forDesktopAndAbove} {
    flex-direction: row;
  }

  ${forSuperWidescreenAndAbove} {
    flex-direction: column;
  }
`

export const AppFilterGridWrap = styled.div`
  display: none;

  ${forSuperWidescreenAndAbove} {
    width: calc(50% - 1rem);
    margin-right: 2rem;
    display: block;
  }
`

export const AppFilterGrid = styled.div`
  display: none;

  ${forSuperWidescreenAndAbove} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 1.25rem;
    margin-bottom: 2.5rem;
  }
`

export const AppFilterCol = styled.div`
  cursor: pointer;
  padding: 0.75rem;
  background-color: #eaf5fc;
  border-radius: 0.25rem;
  height: 160px;

  ${forMobileAndAbove} {
    padding: 1.25rem;
    height: 230px;
  }

  ${forDesktopAndAbove} {
    height: 280px;
  }

  ${forWidescreenAndAbove} {
    padding: 1.25rem 2.5rem;
    height: 260px;
  }

  ${forSuperWidescreenAndAbove} {
    grid-column-end: span 1;
    height: auto;
  }
`

export const AppFilterSubtitle = styled(ElSubtitle)`
  font-size: 12px;
  line-height: 14px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-bottom: 0.5rem;

  ${forMobileAndAbove} {
    font-size: 16px;
    line-height: 20px;
  }
`

export const AppFilterStrapline = styled(ElBodyText)`
  font-size: 12px;
  line-height: 14px;
  color: var(--color-grey-dark);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-bottom: 0;

  ${forMobileAndAbove} {
    font-size: 14px;
    line-height: 18px;
    -webkit-line-clamp: 4;
  }

  ${forDesktopAndAbove} {
    font-size: 16px;
    line-height: 20px;
    -webkit-line-clamp: 5;
  }

  ${forWidescreenAndAbove} {
    -webkit-line-clamp: 3;
  }
`

export const AppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0.75rem;
  grid-row-gap: 0.75rem;
  margin-bottom: 1.25rem;

  ${forMobileAndAbove} {
    grid-column-gap: 1.25rem;
    margin-bottom: 1.25rem;
  }

  ${forTabletAndAbove} {
    grid-template-columns: repeat(12, 1fr);
    margin-bottom: 2.5rem;
  }

  ${forSuperWidescreenAndAbove} {
  }
`

export const AppsCol = styled.div`
  cursor: pointer;
  grid-column-end: span 1;
  align-self: end;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  height: 108px;
  min-width: 0;
  padding: 0.75rem;

  ${forMobileAndAbove} {
    padding: 1.25rem;
    height: 122px;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 4;
    height: 108px;
  }

  ${forDesktopAndAbove} {
    grid-column-end: span 3;
    height: 86px;
  }

  ${forSuperWidescreenAndAbove} {
    grid-column-end: span 3;
  }
`

export const AppsWrapper = styled.div`
  width: 100%;

  ${forSuperWidescreenAndAbove} {
    width: calc(50% - 1rem);
  }
`

export const FeaturedAppStrapline = styled(ElBodyText)`
  font-size: 12px;
  line-height: 14px;
  color: var(--color-grey-dark);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  margin-bottom: 0;

  ${forMobileAndAbove} {
    -webkit-line-clamp: 3;
    font-size: 14px;
    line-height: 18px;
  }

  ${forTabletAndAbove} {
    -webkit-line-clamp: 2;
  }

  ${forDesktopAndAbove} {
    -webkit-line-clamp: 1;
  }
`

export const AppTitle = styled(ElBodyText)`
  font-size: 12px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-bottom: 0;

  ${forMobileAndAbove} {
    font-size: 16px;
    line-height: 20px;
  }
`

export const AppIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`

export const AppFilterLink = styled.a`
  font-size: 12px;
  margin-left: 1.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;

  ${forMobileAndAbove} {
    margin-top: 0.125rem;
    font-size: 16px;
    line-height: 20px;
  }
`

export const SimpleAppStrapline = styled(ElBodyText)`
  font-size: 12px;
  line-height: 14px;
  color: var(--color-grey-dark);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 0;

  ${forMobileAndAbove} {
    font-size: 14px;
    line-height: 18px;
  }
`

export const SimpleAppsCol = styled(AppsCol)`
  height: 76px;

  ${forMobileAndAbove} {
    height: 108px;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 3;
  }

  ${forDesktopAndAbove} {
    grid-column-end: span 2;
  }
`

export const DeveloperAppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 0.75rem;
  margin-bottom: 1.25rem;
  background: var(--color-grey-light);
  padding: 0.75rem;

  ${forMobileAndAbove} {
    grid-column-gap: 0.75rem;
  }

  ${forDesktopAndAbove} {
    grid-template-columns: repeat(12, 1fr);
  }
`

export const DeveloperAppsColHelper = styled.div`
  cursor: pointer;
  grid-column-end: span 6;
  align-self: center;
  min-width: 0;

  ${forMobileAndAbove} {
    grid-column-end: span 6;
  }

  ${forDesktopAndAbove} {
    grid-column-end: span 2;
  }
`

export const DeveloperAppsCol = styled.div`
  grid-column-end: span 6;
  align-self: end;
  padding: 0.75rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;
  background: var(--color-white);
  min-width: 0;

  ${forMobileAndAbove} {
    padding: 0.75rem 1.25rem;
    grid-column-end: span 2;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 2;
  }
`

export const DeveloperMainStrapline = styled(ElBodyText)`
  font-size: 12px;
  line-height: 14px;
  color: var(--color-grey-dark);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin-bottom: 0;

  ${forMobileAndAbove} {
    font-size: 14px;
    line-height: 18px;
  }
`

export const DeveloperSubtitle = styled(ElBodyText)`
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-bottom: 0;
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
    margin-bottom: 1.25rem;
    width: 50%;
  }

  ${forTabletAndAbove} {
    margin-bottom: 2.5rem;
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
  margin-top: 1.25rem;
  min-height: 1.5rem;
`

export const appsFiltersCategories = css`
  width: 100%;

  ${forMobileAndAbove} {
    margin-bottom: 1.25rem;
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
