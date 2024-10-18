import { styled } from '@linaria/react'
import { BodyText, Subtitle } from '@reapit/elements'
import { forDesktopAndAbove, forMobileAndAbove, forWidescreenAndAbove } from '../../../core/__styles__/media'

export const AppFilterCol = styled.div`
  cursor: pointer;
  padding: 0.75rem;
  background-color: var(--intent-primary-lightest);
  border-radius: 0.5rem;
  height: 160px;

  ${forMobileAndAbove} {
    padding: 1.25rem;
    height: 230px;
  }

  ${forDesktopAndAbove} {
    height: 224px;
  }
`

export const AppFilterSubtitle = styled(Subtitle)`
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

export const AppFilterStrapline = styled(BodyText)`
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

  ${forWidescreenAndAbove} {
    -webkit-line-clamp: 3;
  }
`
