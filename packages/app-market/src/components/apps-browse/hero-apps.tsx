import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { BodyText, elFadeIn, elHFull, elMb7, FlexContainer, PlaceholderImage, Subtitle } from '@reapit/elements'
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
import { navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'

interface HeroAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const HeroAppsCollection: FC<HeroAppsCollectionProps> = ({ configItem }) => {
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
    <HeroAppsCol onClick={navigate(history, `${Routes.APPS_BROWSE}/${id}`)}>
      <FlexContainer isFlexColumn>
        {content?.title && (
          <Subtitle className={heroSubMinHeight} hasBoldText hasNoMargin>
            {content.title}
          </Subtitle>
        )}
        <HeroAppsContainer style={{ backgroundColor: content?.brandColour ? `${content?.brandColour}1a` : '#fff' }}>
          <FlexContainer className={cx(elHFull, heroAppsFlexToggle)}>
            <HeroAppsContentContainer>
              {iconUri ? (
                <HeroAppsIcon className={elFadeIn} src={iconUri} alt={name} />
              ) : (
                <PlaceholderImage placeholder="placeholderSmall" size={72} />
              )}
              <BodyText className={heroAppsTitle} hasBoldText hasNoMargin>
                {name}
              </BodyText>
              <HeroAppsChip className={elFadeIn}>{category?.name}</HeroAppsChip>
              <BodyText className={heroAppsStrapline} hasGreyText>
                {summary}
              </BodyText>
            </HeroAppsContentContainer>
            <HeroAppsImageContainer>
              {content?.imageUrl ? (
                <HeroAppsImage src={content.imageUrl} alt={name} />
              ) : (
                <PlaceholderImage className={elMb7} placeholder="placeholderLarge" size={192} fillAvailable />
              )}
            </HeroAppsImageContainer>
          </FlexContainer>
        </HeroAppsContainer>
      </FlexContainer>
    </HeroAppsCol>
  )
}
