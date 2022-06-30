import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import { BodyText, FlexContainer, PlaceholderImage } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { AppsBrowseConfigItem, AppsBrowseConfigItemFilters } from './use-apps-browse-state'
import { AppIcon, appTitleOneLine, FeaturedAppsCol } from './__styles__'
import { useReapitConnect } from '@reapit/connect-session'

interface FeaturedAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const FeaturedAppsCollection: FC<FeaturedAppsCollectionProps> = ({ configItem }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const { filters } = configItem
  const queryParams = filters ? { ...objectToQuery<AppsBrowseConfigItemFilters>(filters), clientId } : { clientId }

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [filters],
  })

  return (
    <>
      {apps?.data?.map(({ id, name, summary, iconUri }) => (
        <FeaturedAppsCol key={id}>
          <FlexContainer isFlexJustifyBetween>
            <FlexContainer isFlexColumn isFlexJustifyCenter>
              <FlexContainer>
                {iconUri ? (
                  <AppIcon src={iconUri} alt={name} />
                ) : (
                  <PlaceholderImage placeholder="placeholderSmall" size={24} />
                )}
                <BodyText className={appTitleOneLine} hasBoldText hasNoMargin>
                  {name}
                </BodyText>
              </FlexContainer>
              <BodyText className={appTitleOneLine} hasGreyText hasNoMargin>
                {summary}
              </BodyText>
            </FlexContainer>
          </FlexContainer>
        </FeaturedAppsCol>
      ))}
    </>
  )
}
