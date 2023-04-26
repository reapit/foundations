import React, { FC, memo, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
import { elFadeIn, elHFull, FlexContainer, MediaType, PlaceholderImage, useMediaQuery } from '@reapit/elements'
import { AppDetailModel, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
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
  HeroAppsChipPlaceholder,
} from './__styles__'
import { cx } from '@linaria/core'
import { navigateRoute } from '../../utils/navigation'
import { RoutePaths } from '../../constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { filterRestrictedAppDetail } from '../../utils/browse-app'
import { useNavigate } from 'react-router'

interface HeroAppsCollectionProps {
  configItem?: AppsBrowseConfigItemInterface
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
  const navigate = useNavigate()
  const mediaQuery = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { filters, content } = configItem ?? {}
  const { isMobile } = mediaQuery

  const [unfilteredAppDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getAppById],
    uriParams: {
      appId: filters?.id && filters.id[0],
    },
    fetchWhenTrue: [filters?.id?.length],
  })

  const appDetail = useMemo(filterRestrictedAppDetail(unfilteredAppDetail, connectSession), [unfilteredAppDetail])

  const placeholderSize = useMemo(handlePlaceholderSize(mediaQuery), [mediaQuery])
  const app = appDetail ?? {}
  const { name, media, summary, categories, id } = app
  const iconUri = media?.find((item) => item.type === 'icon')?.uri

  return (
    <HeroAppsContainer onClick={id ? navigateRoute(navigate, `${RoutePaths.APPS_BROWSE}/${id}`) : undefined}>
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
                <PlaceholderImage placeholder="placeholderSmall" size={isMobile ? 40 : 72} />
              )}
              <HeroAppsNameContainer>
                <HeroAppsSubtitle>{name}</HeroAppsSubtitle>
                {categories?.length ? (
                  categories.map((category, index) => {
                    if (index > 2) return null
                    return <HeroAppsChip key={category?.id}>{category.name}</HeroAppsChip>
                  })
                ) : (
                  <HeroAppsChipPlaceholder />
                )}
              </HeroAppsNameContainer>
            </HeroAppsContentContainer>
            <HeroAppsStrapline>{content?.strapline ?? summary}</HeroAppsStrapline>
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
