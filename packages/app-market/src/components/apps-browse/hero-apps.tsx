import React, { FC, memo, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { elFadeIn, elHFull, FlexContainer, MediaType, PlaceholderImage, useMediaQuery } from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import {
  HeroAppsChip,
  HeroAppsContainer,
  HeroAppsContentContainer,
  heroAppsFlexToggle,
  HeroAppsIcon,
  HeroAppsImage,
  HeroAppsImageContainer,
  HeroAppsInnerContainer,
  HeroAppsNameContainer,
  BrowseAppsSubtitle,
  HeroAppsSubtitle,
  HeroAppsStrapline,
  browseAppsSubtitlePlaceholder,
  HeroAppsContentWrapper,
} from './__styles__'
import { cx } from '@linaria/core'
import { navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import { AppsBrowseConfigItem } from '../../core/use-apps-browse-state'

interface HeroAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const handlePlaceholderSize = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop } = mediaQuery

  if (isMobile) {
    return 80
  }

  if (isTablet || isDesktop) {
    return 120
  }

  return 220
}

export const HeroAppsCollection: FC<HeroAppsCollectionProps> = memo(({ configItem }) => {
  const history = useHistory()
  const mediaQuery = useMediaQuery()
  const { filters, content } = configItem
  const [appDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: {
      appId: filters?.id && filters.id[0],
    },
    fetchWhenTrue: [filters?.id?.length],
  })

  const placeholderSize = useMemo(handlePlaceholderSize(mediaQuery), [mediaQuery])
  const app = appDetail ?? {}
  const { name, media, summary, category, id } = app
  const iconUri = media?.find((item) => item.type === 'icon')?.uri

  return (
    <HeroAppsContainer onClick={id ? navigate(history, `${Routes.APPS_BROWSE}/${id}`) : undefined}>
      <BrowseAppsSubtitle className={cx(!content?.title && browseAppsSubtitlePlaceholder)}>
        {content?.title}
      </BrowseAppsSubtitle>
      <HeroAppsInnerContainer style={{ backgroundColor: content?.brandColour ? `${content?.brandColour}1a` : '#fff' }}>
        <FlexContainer className={cx(elHFull, heroAppsFlexToggle)}>
          <HeroAppsContentWrapper>
            <HeroAppsContentContainer>
              {iconUri ? (
                <HeroAppsIcon className={elFadeIn} src={iconUri} alt={name} />
              ) : (
                <PlaceholderImage placeholder="placeholderSmall" size={40} />
              )}
              <HeroAppsNameContainer>
                <HeroAppsSubtitle>{name}</HeroAppsSubtitle>
                <HeroAppsChip>{category?.name}</HeroAppsChip>
              </HeroAppsNameContainer>
            </HeroAppsContentContainer>
            <HeroAppsStrapline>{summary}</HeroAppsStrapline>
          </HeroAppsContentWrapper>
          <HeroAppsImageContainer>
            {content?.imageUrl ? (
              <HeroAppsImage src={content.imageUrl} alt={name} />
            ) : (
              <PlaceholderImage placeholder="placeholderLarge" size={placeholderSize} fillAvailable />
            )}
          </HeroAppsImageContainer>
        </FlexContainer>
      </HeroAppsInnerContainer>
    </HeroAppsContainer>
  )
})
