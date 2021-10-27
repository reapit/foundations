import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import Routes from '../../constants/routes'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { getAppsService } from '../../services/apps'
import AppCard from '../ui/apps/app-card'
import {
  BodyText,
  Col,
  elHFull,
  elMb5,
  FlexContainer,
  Grid,
  Icon,
  Loader,
  PageContainer,
  Pagination,
  PersistantNotification,
  SecondaryNavContainer,
  Subtitle,
  Title,
} from '@reapit/elements'
import { useOrgId } from '../../utils/use-org-id'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OrgIdSelect } from '../hocs/org-id-select'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}&pageSize=12`
  return history.push(`${Routes.MARKETPLACE}${queryString}`)
}

export const handleFetchApps =
  (
    setApps: Dispatch<SetStateAction<AppSummaryModelPagedResult | undefined>>,
    setAppsLoading: Dispatch<SetStateAction<boolean>>,
    search: string,
    orgClientId: string | null,
    connectSession: ReapitConnectSession | null,
  ) =>
  () => {
    const fetchApps = async () => {
      if (!orgClientId || !connectSession) return
      setAppsLoading(true)
      const fetchedAppApps = await getAppsService(search, orgClientId)
      if (fetchedAppApps) {
        setApps(fetchedAppApps)
      }
      setAppsLoading(false)
    }

    fetchApps()
  }

export const MarketplacePage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const [apps, setApps] = useState<AppSummaryModelPagedResult>()
  const [appsLoading, setAppsLoading] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const search = location.search
  const {
    orgIdState: { orgName, orgClientId },
  } = useOrgId()

  useEffect(handleFetchApps(setApps, setAppsLoading, search, orgClientId, connectSession), [
    setApps,
    search,
    setAppsLoading,
    orgClientId,
    connectSession,
  ])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Apps</Title>
        <Icon className={elMb5} icon="appInfographicAlt" iconSize="large" />
        <Subtitle>AppMarket Visibility and Installation Management</Subtitle>
        <BodyText hasGreyText>
          To set the visibility of an app in the AppMarket or to manage installations for your organisation or specific
          office groups, please select an app.
        </BodyText>
        <OrgIdSelect />
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>{orgName} AppMarket</Title>
        {!orgClientId ? (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            No organisation selected. You need to select an organisation to view available apps.
          </PersistantNotification>
        ) : appsLoading ? (
          <Loader />
        ) : (
          <>
            <Grid>
              {apps?.data?.map((app) => (
                <Col key={app.id}>
                  <AppCard app={app} />
                </Col>
              ))}
            </Grid>
            <Pagination
              callback={onPageChange}
              numberPages={Math.ceil((apps?.totalCount ?? 0) / (apps?.pageSize ?? 0))}
              currentPage={apps?.pageNumber ?? 0}
            />
          </>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default MarketplacePage
