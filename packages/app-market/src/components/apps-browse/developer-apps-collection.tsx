import React, { FC, Fragment } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { BodyText, elMr3, FlexContainer, Icon, Subtitle, PlaceholderImage } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  AppIcon,
  appTitleOneLine,
  appTitleThreeLine,
  DeveloperAppsCol,
  DeveloperAppsColHelper,
  DeveloperAppsGrid,
  heroSubMinHeight,
} from './__styles__'

export const DeveloperAppsCollection: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 100, pageNumber: 1 },
    fetchWhenTrue: [developerId],
  })

  return (
    <>
      {apps?.data?.length ? (
        <>
          <Subtitle className={heroSubMinHeight} hasBoldText hasNoMargin>
            My Apps
          </Subtitle>
          <DeveloperAppsGrid>
            <DeveloperAppsColHelper>
              <FlexContainer isFlexAlignCenter>
                <Icon className={elMr3} icon="developerAppsInfographic" fontSize="5rem" />
                <BodyText className={appTitleThreeLine} hasGreyText hasNoMargin>
                  Apps you are currently developing show here. These will not be visible to users until approved for
                  public listing.
                </BodyText>
              </FlexContainer>
            </DeveloperAppsColHelper>
            {apps.data.map(({ id, name, iconUri }) => (
              <DeveloperAppsCol key={id}>
                <FlexContainer isFlexAlignCenter>
                  {iconUri ? (
                    <AppIcon src={iconUri} alt={name} />
                  ) : (
                    <PlaceholderImage placeholder="placeholderSmall" size={24} />
                  )}
                  <BodyText className={appTitleOneLine} hasBoldText hasNoMargin>
                    {name}
                  </BodyText>
                </FlexContainer>
              </DeveloperAppsCol>
            ))}
          </DeveloperAppsGrid>
        </>
      ) : null}
    </>
  )
}
