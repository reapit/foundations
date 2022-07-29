import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElSubtitle, ElTitle } from '@reapit/elements'
import { forMobileAndAbove } from '../../../core/__styles__/media'

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
