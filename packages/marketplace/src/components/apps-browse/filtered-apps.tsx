import React, { FC, useMemo } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
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
import { navigateRoute } from '../../utils/navigation'
import { RoutePaths } from '../../constants/routes'
import { useNavigate } from 'react-router-dom'
import { BrowseAppsSubtitle, cardCursor, IsFreeNotice } from './__styles__'
import { checkHasFilters } from './apps-browse'
import { useAppsBrowseState } from '../../core/use-apps-browse-state'
import { filterRestrictedAppsList } from '../../utils/browse-app'

export interface FiltersAppsCollectionProps {
  collectionId: string | null
}

export const FilteredAppsCollection: FC<FiltersAppsCollectionProps> = ({ collectionId }) => {
  const { appsBrowseFilterState, appsBrowseConfigState } = useAppsBrowseState()
  const navigate = useNavigate()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const product = connectSession?.loginIdentity.orgProduct ?? 'agencyCloud'
  const hasFilters = useMemo(checkHasFilters(appsBrowseFilterState), [appsBrowseFilterState])
  const queryParams = hasFilters ? { ...appsBrowseFilterState, clientId, pageSize: 100, product } : {}
  const title = appsBrowseConfigState?.items.find((item) => item.id === collectionId)?.content?.title

  const [unfilteredApps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [hasFilters],
  })

  const apps = useMemo(filterRestrictedAppsList(unfilteredApps, connectSession), [unfilteredApps])

  if (appsLoading) return <Loader />

  return (
    <>
      {title && <BrowseAppsSubtitle>{title}</BrowseAppsSubtitle>}
      <Grid>
        {apps?.data?.map(({ id, name, summary, developer, isDirectApi, iconUri, isFree }) => (
          <Col key={id}>
            <Card
              className={cx(elFadeIn, cardCursor)}
              onClick={navigateRoute(navigate, `${RoutePaths.APPS_BROWSE}/${id}`)}
              hasMainCard
              mainCardHeading={name}
              mainCardSubHeading={
                <FlexContainer isFlexJustifyBetween isFlexAlignCenter>
                  {developer} {isFree && <IsFreeNotice className={elMl5}>FREE</IsFreeNotice>}
                </FlexContainer>
              }
              mainCardSubHeadingAdditional={isDirectApi ? 'Integration' : ''}
              mainCardBody={summary}
              mainCardAvatarUrl={iconUri ?? <PlaceholderImage placeholder="placeholderSmall" size={50} />}
            />
          </Col>
        ))}
      </Grid>
      {!appsLoading && apps?.data && Boolean(!apps.data.length) && (
        <PersistentNotification isInline isExpanded isFullWidth intent="primary">
          Unfortunately, there are &lsquo;No Results&rsquo; matching your search term or filtering options. Some of our
          categories have been recently added and our developers are updating their listings so, please come back and
          check again. Alternately, you could try searching by app or developer name.
        </PersistentNotification>
      )}
    </>
  )
}
