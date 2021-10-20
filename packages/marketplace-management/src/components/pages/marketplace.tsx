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
  SecondaryNavContainer,
  Subtitle,
  Title,
} from '@reapit/elements'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}&pageSize=12`
  return history.push(`${Routes.MARKETPLACE}${queryString}`)
}

export const handleFetchApps =
  (
    setApps: Dispatch<SetStateAction<AppSummaryModelPagedResult | undefined>>,
    setAppsLoading: Dispatch<SetStateAction<boolean>>,
    search: string,
  ) =>
  () => {
    const fetchApps = async () => {
      setAppsLoading(true)
      const fetchedAppApps = await getAppsService(search)
      if (fetchedAppApps) {
        setApps(fetchedAppApps)
      }
      setAppsLoading(false)
    }

    fetchApps()
  }

const MarketplacePage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const [apps, setApps] = useState<AppSummaryModelPagedResult>()
  const [appsLoading, setAppsLoading] = useState<boolean>(false)
  const search = location.search

  useEffect(handleFetchApps(setApps, setAppsLoading, search), [setApps, search, setAppsLoading])

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Apps</Title>
        <Icon className={elMb5} icon="appInfographicAlt" iconSize="large" />
        <Subtitle>Marketplace Visibility and Installation Management</Subtitle>
        <BodyText hasGreyText>
          To set the visibility of app in the Marketplace or manage installations, for your organisation or specific
          office groups, please select an app from the list.
        </BodyText>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Marketplace Apps</Title>
        {appsLoading ? (
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
