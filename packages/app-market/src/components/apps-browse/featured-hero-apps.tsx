import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { BodyText, Button, elHFull, FlexContainer, PlaceholderImage, Subtitle } from '@reapit/elements'
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

interface FeaturedHeroAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const FeaturedHeroAppsCollection: FC<FeaturedHeroAppsCollectionProps> = ({ configItem }) => {
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
  const { name, media, summary, category } = app
  const iconUri = media?.find((item) => item.type === 'icon')?.uri

  return (
    <FeaturedHeroAppsCol>
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
                <FeaturedHeroAppsIcon src={iconUri} alt={name} />
              ) : (
                <PlaceholderImage placeholder="placeholderSmall" size={96} />
              )}
              <Subtitle className={heroAppsTitle} hasBoldText hasNoMargin>
                {name}
              </Subtitle>
              <HeroAppsChip>{category?.name}</HeroAppsChip>
              <BodyText className={heroAppsStrapline} hasGreyText>
                {summary}
              </BodyText>
              <Button className={featuredHeroAppsButton} style={{ background: content?.brandColour, color: '#fff' }}>
                Find Out More
              </Button>
            </FeaturedHeroAppsContentContainer>
            <FeaturedHeroAppsImageContainer>
              <HeroAppsImage src={content?.imageUrl} alt={name} />
            </FeaturedHeroAppsImageContainer>
          </FlexContainer>
        </FeaturedHeroAppsContainer>
      </FlexContainer>
    </FeaturedHeroAppsCol>
  )
}
