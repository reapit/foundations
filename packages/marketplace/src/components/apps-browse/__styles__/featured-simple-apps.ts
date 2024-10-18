import { styled } from '@linaria/react'
import { BodyText } from '@reapit/elements'
import {
  forDesktopAndAbove,
  forMobileAndAbove,
  forTabletAndAbove,
  forWidescreenAndAbove,
} from '../../../core/__styles__/media'

export const AppsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0.75rem;
  grid-row-gap: 0.75rem;
  margin-bottom: 1.25rem;

  ${forMobileAndAbove} {
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 1.25rem;
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
    height: 105px;
    grid-column-end: span 6;
    padding: 1.25rem;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 4;
  }

  ${forDesktopAndAbove} {
    grid-column-end: span 3;
  }

  ${forWidescreenAndAbove} {
    grid-column-end: span 2;
  }
`

export const FeaturedAppStrapline = styled(BodyText)`
  font-size: 12px;
  line-height: 14px;
  color: var(--color-grey-dark);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  margin-bottom: 0;

  ${forMobileAndAbove} {
    -webkit-line-clamp: 2;
    font-size: 14px;
    line-height: 18px;
  }
`

export const AppTitle = styled(BodyText)`
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

export const SimpleAppsGrid = styled(AppsGrid)`
  ${forWidescreenAndAbove} {
    grid-template-columns: repeat(8, 1fr);
  }
`

export const SimpleAppStrapline = styled(BodyText)`
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
    grid-column-end: span 4;
    height: 105px;
  }

  ${forTabletAndAbove} {
    grid-column-end: span 3;
  }

  ${forDesktopAndAbove} {
    grid-column-end: span 2;
  }

  ${forWidescreenAndAbove} {
    grid-column-end: span 1;
  }
`
