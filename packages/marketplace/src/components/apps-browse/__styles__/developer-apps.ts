import { styled } from '@linaria/react'
import { ElBodyText } from '@reapit/elements'
import { forDesktopAndAbove, forMobileAndAbove, forTabletAndAbove } from '../../../core/__styles__/media'

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
