import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { H3, Section, H5, Pagination, GridFourCol, GridFourColItem, FadeIn, Loader } from '@reapit/elements'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import Routes from '../../constants/routes'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { getAppsService } from '../../services/apps'
import AppCard from '../ui/apps/app-card'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}&pageSize=12`
  return history.push(`${Routes.MARKETPLACE}${queryString}`)
}

export const handleFetchApps = (
  setApps: Dispatch<SetStateAction<AppSummaryModelPagedResult | undefined>>,
  setAppsLoading: Dispatch<SetStateAction<boolean>>,
  search: string,
) => () => {
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

const MarketplacePage: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const [apps, setApps] = useState<AppSummaryModelPagedResult>()
  const [appsLoading, setAppsLoading] = useState<boolean>(false)
  const search = location.search

  useEffect(handleFetchApps(setApps, setAppsLoading, search), [setApps, search, setAppsLoading])

  return (
    <>
      <H3>Marketplace Apps</H3>
      <Section hasPadding={false}>
        <H5>Marketplace Visibility and Installation Management</H5>
        <p className="mb-4">
          To set the visibility of app in the Marketplace or manage installations, for your organisation or specific
          office groups, please select an app from the list below:
        </p>
      </Section>
      {appsLoading ? (
        <Loader />
      ) : (
        <GridFourCol>
          {apps?.data?.map((app) => (
            <GridFourColItem key={app.id}>
              <FadeIn>
                <AppCard app={app} />
              </FadeIn>
            </GridFourColItem>
          ))}
        </GridFourCol>
      )}

      <Pagination
        onChange={onPageChange}
        totalCount={apps?.totalCount ?? 0}
        pageSize={apps?.pageSize ?? 0}
        pageNumber={apps?.pageNumber ?? 1}
      />
    </>
  )
}

export default MarketplacePage
