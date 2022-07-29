import { styled } from '@linaria/react'
import { ElBodyText } from '@reapit/elements'
import {
  forDesktopAndAbove,
  forMobileAndAbove,
  forSuperWidescreenAndAbove,
  forTabletAndAbove,
} from '../../../core/__styles__/media'

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
