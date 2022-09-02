import { styled } from '@linaria/react'
import { ElBodyText, ElSubtitle } from '@reapit/elements'
import { forDesktopAndAbove, forMobileAndAbove, forWidescreenAndAbove } from '../../../core/__styles__/media'

export const AppFilterGridWrap = styled.div`
  display: none;

  ${forWidescreenAndAbove} {
    width: calc(50% - 1rem);
    margin-right: 2rem;
    display: block;
  }
`

export const AppFilterGrid = styled.div`
  display: none;

  ${forWidescreenAndAbove} {
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
  border-radius: 0.5rem;
  height: 160px;

  ${forMobileAndAbove} {
    padding: 1.25rem;
    height: 230px;
  }

  ${forDesktopAndAbove} {
    padding: 1.25rem 2.5rem;
    height: 280px;
  }

  ${forWidescreenAndAbove} {
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
