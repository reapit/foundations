import React, { FC, memo, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { Button, elFadeIn, elMb7, FlexContainer, MediaType, PlaceholderImage, useMediaQuery } from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import {
  FeaturedHeroAppsContainer,
  FeaturedHeroAppsContentContainer,
  FeaturedHeroAppsIcon,
  HeroAppsImage,
  FeaturedHeroAppsImageContainer,
  HeroAppsChip,
  FeaturedHeroAppsItem,
  featuredHeroAppsButton,
  FeaturedHeroAppsNameContainer,
  FeaturedHeroAppsInnerContainer,
  BrowseAppsSubtitle,
  FeaturedHeroAppsSubtitle,
  FeaturedHeroAppsStrapline,
  FeaturedHeroAppsFlexContainer,
} from './__styles__'
import { navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import { AppsBrowseConfigItem } from '../../core/use-apps-browse-state'

interface FeaturedHeroAppsCollectionProps {
  configItem: AppsBrowseConfigItem
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

export const FeaturedHeroAppsCollection: FC<FeaturedHeroAppsCollectionProps> = memo(({ configItem }) => {
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
    <FeaturedHeroAppsItem onClick={id ? navigate(history, `${Routes.APPS_BROWSE}/${id}`) : undefined}>
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
                  <PlaceholderImage className={elMb7} placeholder="placeholderSmall" size={48} />
                )}
                <FeaturedHeroAppsNameContainer>
                  <FeaturedHeroAppsSubtitle>{name}</FeaturedHeroAppsSubtitle>
                  {category?.name && <HeroAppsChip className={elFadeIn}>{category.name}</HeroAppsChip>}
                </FeaturedHeroAppsNameContainer>
                <Button className={featuredHeroAppsButton} style={{ background: content?.brandColour, color: '#fff' }}>
                  Find Out More
                </Button>
              </FeaturedHeroAppsInnerContainer>
              <FeaturedHeroAppsStrapline>{summary}</FeaturedHeroAppsStrapline>
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
