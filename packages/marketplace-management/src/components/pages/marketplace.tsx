import React, { FC, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import Routes from '../../constants/routes'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
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
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OrgIdSelect } from '../hocs/org-id-select'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames } from '@reapit/utils-common'
import qs from 'qs'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}&pageSize=12`
  return history.push(`${Routes.MARKETPLACE}${queryString}`)
}

export const MarketplacePage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const searchParams = qs.parse(location.search, { ignoreQueryPrefix: true })

  const {
    orgIdState: { orgName, orgClientId },
  } = useOrgId()

  const [appData, appLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: GetActionNames.getApps,
    queryParams: { showHiddenApps: 'true', clientId: orgClientId, ...searchParams },
    fetchWhenTrue: [orgClientId],
  })

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
        ) : appLoading ? (
          <Loader />
        ) : (
          <>
            <Grid>
              {appData?.data?.map((app) => (
                <Col key={app.id}>
                  <AppCard app={app} />
                </Col>
              ))}
            </Grid>
            <Pagination
              callback={onPageChange}
              numberPages={Math.ceil((appData?.totalCount ?? 0) / (appData?.pageSize ?? 0))}
              currentPage={appData?.pageNumber ?? 0}
            />
          </>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default MarketplacePage
