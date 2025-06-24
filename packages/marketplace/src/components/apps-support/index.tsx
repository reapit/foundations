import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Button,
  Col,
  elHFull,
  elMb11,
  elMb5,
  FlexContainer,
  Grid,
  Icon,
  Loader,
  PageContainer,
  SecondaryNavContainer,
  SmallText,
  PersistentNotification,
} from '@reapit/elements'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { openNewPage } from '../../utils/navigation'
import { appsSearchContainer, AppsSearchInput, appsSearchInputIcon } from '../apps-browse/__styles__'
import debounce from 'just-debounce-it'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/use-reapit-data'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { AppsSupportItem } from './apps-support-item'
import { cx } from '@linaria/core'
import { filterRestrictedAppsList } from '../../utils/browse-app'
import { trackEventHandler, trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'

export const handleSearch = (setSearch: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
  const search = event.target.value.toLowerCase()

  trackEvent(TrackingEvent.SearchSupport, true, { searchTerm: search })
  setSearch(search)
}

export const AppsSupportPage: FC = () => {
  const [search, setSearch] = useState<string>('')
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const product = connectSession?.loginIdentity.orgProduct ?? 'agencyCloud'
  const debouncedSearch = useCallback(debounce(handleSearch(setSearch), 500), [])

  const [unfilteredApps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: { clientId, searchTerm: search, pageSize: 25, includeHiddenApps: true, onlyInstalled: true, product },
    fetchWhenTrue: [search, clientId],
  })

  const apps = useMemo(filterRestrictedAppsList(unfilteredApps, connectSession), [unfilteredApps])

  useEffect(trackEventHandler(TrackingEvent.LoadSettingsInstalled, true), [])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Icon className={elMb5} icon="userInfographic" iconSize="large" />
        <SmallText hasGreyText>
          For AppMarket support, you will need to contact the app developer directly. You can find the relevant contact
          details by searching by app or developer name.
        </SmallText>
        <SmallText hasGreyText>
          In addition we have provided comprehensive documentation on using the AppMarket at the below link.
        </SmallText>
        <Button
          onClick={openNewPage(
            'https://reapit.atlassian.net/wiki/spaces/RW/pages/2875523105/Use+AppMarket+to+browse+install+uninstall+apps',
          )}
          intent="neutral"
        >
          View Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <FlexContainer className={cx(appsSearchContainer, elMb11)} isFlexAlignCenter>
          <Icon className={appsSearchInputIcon} icon="search" intent="default" />
          <AppsSearchInput type="text" placeholder="Search by App or Developer" onChange={debouncedSearch} />
        </FlexContainer>
        {!search && !appsLoading && (
          <PersistentNotification isInline isExpanded isFullWidth intent="primary">
            Search for an app or developer name to get support contact details
          </PersistentNotification>
        )}
        {appsLoading ? (
          <Loader />
        ) : search ? (
          <Grid>
            {apps?.data?.map((app) => (
              <Col key={app.id}>
                <AppsSupportItem app={app} />
              </Col>
            ))}
          </Grid>
        ) : null}
      </PageContainer>
    </FlexContainer>
  )
}

export default AppsSupportPage
