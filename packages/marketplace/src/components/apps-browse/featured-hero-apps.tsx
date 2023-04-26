import React, { FC, memo, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
import { Button, elFadeIn, elMb7, FlexContainer, MediaType, PlaceholderImage, useMediaQuery } from '@reapit/elements'
import { AppDetailModel, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import {
  FeaturedHeroAppsContainer,
  FeaturedHeroAppsContentContainer,
  FeaturedHeroAppsIcon,
  HeroAppsImage,
  FeaturedHeroAppsImageContainer,
  HeroAppsChip,
  FeaturedHeroAppsItem,
  featuredHeroAppsButtonMobTablet,
  featuredHeroAppsButtonDesktop,
  FeaturedHeroAppsNameContainer,
  FeaturedHeroAppsInnerContainer,
  BrowseAppsSubtitle,
  FeaturedHeroAppsSubtitle,
  FeaturedHeroAppsStrapline,
  FeaturedHeroAppsFlexContainer,
  HeroAppsChipPlaceholder,
  HeroAppsChipContainer,
} from './__styles__'
import { navigateRoute } from '../../utils/navigation'
import { RoutePaths } from '../../constants/routes'
import { useNavigate } from 'react-router-dom'
import { filterRestrictedAppDetail } from '../../utils/browse-app'
import { useReapitConnect } from '@reapit/connect-session'

interface FeaturedHeroAppsCollectionProps {
  configItem?: AppsBrowseConfigItemInterface
}

export const handlePlaceholderSize = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop } = mediaQuery

  if (isMobile) {
    return 100
  }

  if (isTablet || isDesktop) {
    return 200
  }

  return 320
}

export const handleIconPlaceholderSize = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop } = mediaQuery

  if (isMobile) {
    return 48
  }

  if (isTablet || isDesktop) {
    return 72
  }

  return 96
}

export const FeaturedHeroAppsCollection: FC<FeaturedHeroAppsCollectionProps> = memo(({ configItem }) => {
  const navigate = useNavigate()
  const mediaQuery = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { filters, content } = configItem ?? {}

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
  const iconPlaceholderSize = useMemo(handleIconPlaceholderSize(mediaQuery), [mediaQuery])
  const app = appDetail ?? {}
  const { name, media, summary, categories, id } = app
  const iconUri = media?.find((item) => item.type === 'icon')?.uri

  return (
    <FeaturedHeroAppsItem onClick={id ? navigateRoute(navigate, `${RoutePaths.APPS_BROWSE}/${id}`) : undefined}>
      <FlexContainer isFlexColumn>
        <BrowseAppsSubtitle>{content?.title}</BrowseAppsSubtitle>
        <FeaturedHeroAppsContainer
          style={{ backgroundColor: content?.brandColour ? `${content?.brandColour}1a` : '#fff' }}
        >
          <FeaturedHeroAppsFlexContainer>
            <FeaturedHeroAppsContentContainer>
              <FeaturedHeroAppsInnerContainer>
                {iconUri ? (
                  <FeaturedHeroAppsIcon className={elFadeIn} src={iconUri} alt={name} />
                ) : (
                  <PlaceholderImage className={elMb7} placeholder="placeholderSmall" size={iconPlaceholderSize} />
                )}
                <FeaturedHeroAppsNameContainer>
                  <FeaturedHeroAppsSubtitle>{name}</FeaturedHeroAppsSubtitle>

                  {categories?.length ? (
                    <HeroAppsChipContainer>
                      {categories.map((category, index) => {
                        if (index > 2) return null
                        return <HeroAppsChip key={category?.id}>{category.name}</HeroAppsChip>
                      })}
                    </HeroAppsChipContainer>
                  ) : (
                    <HeroAppsChipPlaceholder />
                  )}
                </FeaturedHeroAppsNameContainer>
                <Button
                  className={featuredHeroAppsButtonMobTablet}
                  style={{ background: content?.brandColour, color: '#fff' }}
                >
                  Find Out More
                </Button>
              </FeaturedHeroAppsInnerContainer>
              <FeaturedHeroAppsStrapline>{content?.strapline ?? summary}</FeaturedHeroAppsStrapline>
              <Button
                className={featuredHeroAppsButtonDesktop}
                style={{ background: content?.brandColour, color: '#fff' }}
              >
                Find Out More
              </Button>
            </FeaturedHeroAppsContentContainer>
            <FeaturedHeroAppsImageContainer>
              {content?.imageUrl ? (
                <HeroAppsImage src={content.imageUrl} alt={name} />
              ) : (
                <PlaceholderImage placeholder="placeholderLarge" size={placeholderSize} fillAvailable />
              )}
            </FeaturedHeroAppsImageContainer>
          </FeaturedHeroAppsFlexContainer>
        </FeaturedHeroAppsContainer>
      </FlexContainer>
    </FeaturedHeroAppsItem>
  )
})
