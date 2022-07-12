import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { BodyText, elFadeIn, FlexContainer, PlaceholderImage } from '@reapit/elements'
import { AppIcon, appTitleOneLine, appTitleTwoLine, SimpleAppsCol } from './__styles__'
import { useReapitConnect } from '@reapit/connect-session'
import { Routes } from '../../constants/routes'
import { navigate } from '../../utils/navigation'
import { useHistory } from 'react-router-dom'
import { AppsBrowseConfigItem } from '../../core/use-apps-browse-state'

interface SimpleAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const SimpleAppsCollection: FC<SimpleAppsCollectionProps> = ({ configItem }) => {
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const { filters } = configItem
  const queryParams = filters ? { ...filters, clientId } : { clientId }

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [filters],
  })

  return (
    <>
      {apps?.data?.map(({ id, name, summary, iconUri }) => (
        <SimpleAppsCol key={id} onClick={navigate(history, `${Routes.APPS_BROWSE}/${id}`)}>
          <FlexContainer isFlexJustifyBetween>
            <FlexContainer isFlexColumn isFlexJustifyCenter>
              <FlexContainer>
                {iconUri ? (
                  <AppIcon className={elFadeIn} src={iconUri} alt={name} />
                ) : (
                  <PlaceholderImage placeholder="placeholderSmall" size={32} />
                )}
                <BodyText className={appTitleOneLine} hasBoldText hasNoMargin>
                  {name}
                </BodyText>
              </FlexContainer>
              <BodyText className={appTitleTwoLine} hasGreyText hasNoMargin>
                {summary}
              </BodyText>
            </FlexContainer>
          </FlexContainer>
        </SimpleAppsCol>
      ))}
    </>
  )
}
