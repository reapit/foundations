import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { BodyText, Button, elFadeIn, elHFull, elMb7, FlexContainer, PlaceholderImage, Subtitle } from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { AppsBrowseConfigItem } from './use-apps-browse-state'
import {
  FeaturedHeroAppsContainer,
  FeaturedHeroAppsContentContainer,
  FeaturedHeroAppsIcon,
  HeroAppsImage,
  FeaturedHeroAppsImageContainer,
  HeroAppsChip,
  heroAppsStrapline,
  FeaturedHeroAppsCol,
  heroSubMinHeight,
  heroAppsTitle,
  heroAppsFlexToggle,
  featuredHeroAppsButton,
} from './__styles__'
import { cx } from '@linaria/core'
import { navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'

interface FeaturedHeroAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const FeaturedHeroAppsCollection: FC<FeaturedHeroAppsCollectionProps> = ({ configItem }) => {
  const history = useHistory()
  const { filters, content } = configItem

  const [appDetail] = useReapitGet<AppDetailModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppById],
    uriParams: {
      appId: filters?.id && filters.id[0],
    },
    fetchWhenTrue: [filters?.id?.length],
  })

  const app = appDetail ?? {}
  const { name, media, summary, category, id } = app
  const iconUri = media?.find((item) => item.type === 'icon')?.uri

  return (
    <FeaturedHeroAppsCol onClick={navigate(history, `${Routes.APPS_BROWSE}/${id}`)}>
      <FlexContainer isFlexColumn>
        <Subtitle className={heroSubMinHeight} hasBoldText hasNoMargin>
          {content?.title}
        </Subtitle>
        <FeaturedHeroAppsContainer
          style={{ backgroundColor: content?.brandColour ? `${content?.brandColour}1a` : '#fff' }}
        >
          <FlexContainer className={cx(elHFull, heroAppsFlexToggle)}>
            <FeaturedHeroAppsContentContainer>
              {iconUri ? (
                <FeaturedHeroAppsIcon className={elFadeIn} src={iconUri} alt={name} />
              ) : (
                <PlaceholderImage className={elMb7} placeholder="placeholderSmall" size={96} />
              )}
              <Subtitle className={heroAppsTitle} hasBoldText hasNoMargin>
                {name}
              </Subtitle>
              {category?.name && <HeroAppsChip className={elFadeIn}>{category.name}</HeroAppsChip>}
              <BodyText className={heroAppsStrapline} hasGreyText>
                {summary}
              </BodyText>
              <Button className={featuredHeroAppsButton} style={{ background: content?.brandColour, color: '#fff' }}>
                Find Out More
              </Button>
            </FeaturedHeroAppsContentContainer>
            <FeaturedHeroAppsImageContainer>
              {content?.imageUrl ? (
                <HeroAppsImage src={content.imageUrl} alt={name} />
              ) : (
                <PlaceholderImage className={elMb7} placeholder="placeholderLarge" size={320} fillAvailable />
              )}
            </FeaturedHeroAppsImageContainer>
          </FlexContainer>
        </FeaturedHeroAppsContainer>
      </FlexContainer>
    </FeaturedHeroAppsCol>
  )
}
