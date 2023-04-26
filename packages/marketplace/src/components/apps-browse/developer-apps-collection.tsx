import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
import { elMr3, FlexContainer, Icon, PlaceholderImage, elFadeIn, elMr5, useMediaQuery } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import {
  AppIcon,
  BrowseAppsSubtitle,
  DeveloperAppsCol,
  DeveloperAppsColHelper,
  DeveloperAppsGrid,
  DeveloperMainStrapline,
  DeveloperSubtitle,
} from './__styles__'
import { useNavigate } from 'react-router-dom'
import { navigateRoute } from '../../utils/navigation'
import { RoutePaths } from '../../constants/routes'

export const DeveloperAppsCollection: FC = () => {
  const navigate = useNavigate()
  const { isMobile } = useMediaQuery()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const product = connectSession?.loginIdentity.orgProduct ?? 'agencyCloud'
  const iconSize = isMobile ? '2.5em' : '3.75rem'

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 100, pageNumber: 1, product },
    fetchWhenTrue: [developerId],
  })

  return (
    <>
      {apps?.data?.length ? (
        <>
          <BrowseAppsSubtitle>My Apps</BrowseAppsSubtitle>
          <DeveloperAppsGrid>
            <DeveloperAppsColHelper>
              <FlexContainer isFlexAlignCenter>
                <Icon className={elMr3} icon="developerAppsInfographic" fontSize={iconSize} />
                <DeveloperMainStrapline>
                  Apps you are currently developing show here. These will not be visible to users until approved for
                  public listing.
                </DeveloperMainStrapline>
              </FlexContainer>
            </DeveloperAppsColHelper>
            {apps.data.map(({ id, name, iconUri }) => (
              <DeveloperAppsCol
                className={elFadeIn}
                key={id}
                onClick={navigateRoute(navigate, `${RoutePaths.APPS_BROWSE}/${id}`)}
              >
                <FlexContainer isFlexAlignCenter>
                  {iconUri ? (
                    <AppIcon className={elMr5} src={iconUri} alt={name} />
                  ) : (
                    <PlaceholderImage className={elMr5} placeholder="placeholderSmall" size={32} />
                  )}
                  <DeveloperSubtitle>{name}</DeveloperSubtitle>
                </FlexContainer>
              </DeveloperAppsCol>
            ))}
          </DeveloperAppsGrid>
        </>
      ) : null}
    </>
  )
}
