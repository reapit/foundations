import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElBodyText, ElSubtitle } from '@reapit/elements'
import {
  forDesktopAndAbove,
  forMobileAndAbove,
  forWidescreenAndAbove,
  forTabletAndAbove,
} from '../../../core/__styles__/media'

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
  ${forWidescreenAndAbove} {
    width: calc(50% - 1rem);
    display: inline-block;
  }
`

export const HeroAppsImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.25rem;
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

export const HeroAppsChipPlaceholder = styled.div`
  height: 1.25rem;
  opacity: 0;
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

  ${forWidescreenAndAbove} {
    -webkit-line-clamp: 2;
    margin-bottom: 1.25rem;
  }
`

export const HeroAppsInnerContainer = styled.div`
  width: 100%;
  border-radius: 0.5rem;
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

  ${forWidescreenAndAbove} {
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

  ${forWidescreenAndAbove} {
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

  ${forWidescreenAndAbove} {
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

  ${forWidescreenAndAbove} {
    margin-left: 0.75rem;
  }
`

export const HeroAppsIcon = styled.img`
  border-radius: 0.25rem;
  width: 40px;
  height: 40px;
  padding: 0.25rem;
  background-color: var(--color-white);

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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

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

  ${forWidescreenAndAbove} {
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

  ${forWidescreenAndAbove} {
    flex-direction: column;
  }
`
