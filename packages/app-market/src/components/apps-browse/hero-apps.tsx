import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { BodyText, elHFull, FlexContainer, Subtitle } from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import { AppsBrowseConfigItem } from './use-apps-browse-state'
import {
  HeroAppsChip,
  HeroAppsContainer,
  HeroAppsContentContainer,
  heroAppsFlexToggle,
  HeroAppsIcon,
  HeroAppsImage,
  HeroAppsImageContainer,
  heroAppsStrapline,
  heroAppsTitle,
  HeroAppsCol,
  heroSubMinHeight,
} from './__styles__'
import { cx } from '@linaria/core'

interface HeroAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const HeroAppsCollection: FC<HeroAppsCollectionProps> = ({ configItem }) => {
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
  const iconUri = media?.find((item) => item.type === 'icon')?.uri ?? 'https://fakeimg.pl/72x72/fff?text=-'

  return (
    <HeroAppsCol>
      <FlexContainer isFlexColumn>
        {content?.title && (
          <Subtitle className={heroSubMinHeight} hasBoldText hasNoMargin>
            {content.title}
          </Subtitle>
        )}
        <HeroAppsContainer style={{ backgroundColor: content?.brandColour ? `${content?.brandColour}1a` : '#fff' }}>
          <FlexContainer className={cx(elHFull, heroAppsFlexToggle)}>
            <HeroAppsContentContainer>
              <HeroAppsIcon src={iconUri} alt={name} />
              <BodyText className={heroAppsTitle} hasBoldText hasNoMargin>
                {name}
              </BodyText>
              <HeroAppsChip>{category?.name}</HeroAppsChip>
              <BodyText className={heroAppsStrapline} hasGreyText>
                {summary}
              </BodyText>
            </HeroAppsContentContainer>
            <HeroAppsImageContainer>
              <HeroAppsImage src={content?.imageUrl} alt={name} />
            </HeroAppsImageContainer>
          </FlexContainer>
        </HeroAppsContainer>
      </FlexContainer>
    </HeroAppsCol>
  )
}
