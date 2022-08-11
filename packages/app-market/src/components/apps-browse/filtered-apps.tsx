import React, { FC, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import {
  Card,
  Col,
  elFadeIn,
  FlexContainer,
  Grid,
  Loader,
  PersistentNotification,
  PlaceholderImage,
  elMl5,
} from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { cx } from '@linaria/core'
import { navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import { cardCursor, IsFreeNotice } from './__styles__'
import { checkHasFilters } from './apps-browse'
import { useAppsBrowseState } from '../../core/use-apps-browse-state'
import { filterRestrictedAppsList } from '../../utils/browse-app'

export const FilteredAppsCollection: FC = () => {
  const { appsBrowseFilterState } = useAppsBrowseState()
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const hasFilters = useMemo(checkHasFilters(appsBrowseFilterState), [appsBrowseFilterState])
  const queryParams = hasFilters ? { ...appsBrowseFilterState, clientId, pageSize: 100 } : {}

  const [unfilteredApps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [hasFilters],
  })

  const apps = useMemo(filterRestrictedAppsList(unfilteredApps, connectSession), [unfilteredApps])

  if (appsLoading) return <Loader />

  return (
    <>
      <Grid>
        {apps?.data?.map(({ id, name, summary, developer, isDirectApi, iconUri, isFree }) => (
          <Col key={id}>
            <Card
              className={cx(elFadeIn, cardCursor)}
              onClick={navigate(history, `${Routes.APPS_BROWSE}/${id}`)}
              hasMainCard
              mainCardHeading={name}
              mainCardSubHeading={
                <FlexContainer isFlexJustifyBetween isFlexAlignCenter>
                  {developer} {isFree && <IsFreeNotice className={elMl5}>FREE</IsFreeNotice>}
                </FlexContainer>
              }
              mainCardSubHeadingAdditional={isDirectApi ? 'Integration' : ''}
              mainCardBody={summary}
              mainCardImgUrl={iconUri ?? <PlaceholderImage placeholder="placeholderSmall" size={56} />}
            />
          </Col>
        ))}
      </Grid>
      {!appsLoading && apps?.data && Boolean(!apps.data.length) && (
        <PersistentNotification isInline isExpanded isFullWidth intent="secondary">
          No apps match your criteria. Please adjust your search query and filters.
        </PersistentNotification>
      )}
    </>
  )
}
