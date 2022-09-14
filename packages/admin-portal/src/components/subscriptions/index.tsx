import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import ErrorBoundary from '../../components/hocs/error-boundary'
import { GetActionNames, getActions, isTruthy, toLocalTime } from '@reapit/utils-common'
import { PageContainer, Loader, Title, Pagination, Table, elMb11 } from '@reapit/elements'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import {
  AppSummaryModelPagedResult,
  SubscriptionModel,
  SubscriptionModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { FilterForm } from './filter-form'
import { Statistics } from '../statistics'

export interface SubscriptionsFilters {
  type?: string
  organisationName?: string
  userEmail?: string
  status?: string
}

export interface SubsWithAppName extends SubscriptionModelPagedResult {
  data: (SubscriptionModel & { appName: string })[]
}

export const handleSetAppNames =
  (
    setInstallationsWithAppName: Dispatch<SetStateAction<SubsWithAppName | null>>,
    subscriptions: SubscriptionModelPagedResult | null,
    apps: AppSummaryModelPagedResult | null,
  ) =>
  () => {
    if (apps && subscriptions) {
      const subscriptionsWithAppName = {
        ...subscriptions,
        data: subscriptions.data?.map((sub) => {
          const appName = apps.data?.find((app) => app.id === sub.applicationId)?.name ?? ''

          return {
            ...sub,
            appName,
          }
        }),
      } as SubsWithAppName

      setInstallationsWithAppName(subscriptionsWithAppName)
    }
  }

const Subscriptions: FC = () => {
  const [subscriptionsFilters, setSubscriptionsFilters] = useState<SubscriptionsFilters>({})
  const [subsWithAppName, setSubsWithAppName] = useState<SubsWithAppName | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  // const [cancelSubId, setCancelSubId] = useState<string | null>(null)

  const [subscriptions, subscriptionsLoading] = useReapitGet<SubscriptionModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getSubscriptions],
    queryParams: {
      ...objectToQuery(subscriptionsFilters),
      pageSize,
      pageNumber,
    },
  })

  const appIds = subscriptions?.data?.map((sub) => sub.applicationId).filter(isTruthy)

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: {
      id: appIds,
      pageSize: 999,
    },
    fetchWhenTrue: [appIds?.length],
  })

  useEffect(handleSetAppNames(setSubsWithAppName, subscriptions, apps), [apps, subscriptions])

  return (
    <ErrorBoundary>
      <PageContainer>
        <Title>Subscriptions</Title>
        <FilterForm setSubscriptionsFilters={setSubscriptionsFilters} />
        <Statistics area="SUBSCRIPTIONS" data={subsWithAppName} setPageSize={setPageSize} />
        {subscriptionsLoading ? (
          <Loader />
        ) : (
          <>
            <Table
              className={elMb11}
              rows={subsWithAppName?.data?.map(
                ({ type, summary, organisationName, user, appName, created, renews, frequency, cost, cancelled }) => ({
                  cells: [
                    {
                      label: 'Subcription Type',
                      value: type,
                      cellHasDarkText: true,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Summary',
                      value: summary,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'App Name',
                      value: appName,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Company Name',
                      value: organisationName,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'User Email',
                      value: user,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Start Date',
                      value: toLocalTime(created),
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Renews',
                      value: renews ? toLocalTime(renews) : '-',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Frequency',
                      value: frequency,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Cost',
                      value: `£${cost}`,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Cancelled',
                      value: cancelled ? toLocalTime(cancelled) : '-',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                  ],
                }),
              )}
            />
            <Pagination
              callback={setPageNumber}
              currentPage={pageNumber}
              numberPages={Math.ceil((subscriptions?.totalCount ?? 1) / 12)}
            />
          </>
        )}
      </PageContainer>
    </ErrorBoundary>
  )
}

export default Subscriptions
