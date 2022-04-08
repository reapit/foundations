import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { elMb11, elSpan2, Loader, Pagination, StatusIndicator, Table, Title } from '@reapit/elements'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useReapitConnect } from '@reapit/connect-session'
import dayjs from 'dayjs'

export const handleRefreshSubscriptions =
  (
    refreshMembers: () => void,
    updateMemberSuccess?: boolean,
    deleteMemberSuccess?: boolean,
    reinviteMemberSuccess?: boolean,
  ) =>
  () => {
    if (updateMemberSuccess || deleteMemberSuccess || reinviteMemberSuccess) {
      refreshMembers()
    }
  }

export const handleDeleteSubscription =
  (
    deleteSubscription: SendFunction<undefined, boolean>,
    setSubscriptionId: Dispatch<SetStateAction<string | null>>,
    subscriptionId: string | null,
  ) =>
  () => {
    if (subscriptionId) {
      deleteSubscription(undefined)
      setSubscriptionId(null)
    }
  }

export const handleSetSubscriptionId =
  (setSubscriptionId: Dispatch<SetStateAction<string | null>>, subscriptionId: string | null) => () => {
    setSubscriptionId(subscriptionId)
  }

export const SettingsSubscriptionsPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const developerId = connectSession?.loginIdentity.developerId

  const [subscriptions, subscriptionsLoading, , refreshSubscriptions] = useReapitGet<SubscriptionModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getSubscriptions],
    queryParams: { pageSize: 12, pageNumber },
    uriParams: { developerId },
    fetchWhenTrue: [developerId],
  })

  const [, , deleteSubscription, deleteSubscriptionSuccess] = useReapitUpdate<undefined, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteSubscription],
    method: 'DELETE',
    uriParams: {
      subscriptionId,
    },
  })

  useEffect(handleDeleteSubscription(deleteSubscription, setSubscriptionId, subscriptionId), [subscriptionId])

  useEffect(handleRefreshSubscriptions(refreshSubscriptions, deleteSubscriptionSuccess), [deleteSubscriptionSuccess])

  return (
    <>
      <Title>Subscriptions</Title>
      {subscriptionsLoading && <Loader />}
      <Table
        className={elMb11}
        numberColumns={8}
        rows={subscriptions?.data?.map((subscription) => ({
          cells: [
            {
              label: 'Type',
              value: subscription.summary ?? '',
              className: elSpan2,
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Start Date',
              value: dayjs(subscription.created).format('DD MMM YYYY'),
              icon: 'calendarSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Renewal Date',
              value: dayjs(subscription.renews).format('DD MMM YYYY'),
              icon: 'calendarSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Frequency',
              value: subscription.frequency
                ? `${subscription.frequency.charAt(0).toUpperCase()}${subscription.frequency.slice(1).toLowerCase()}`
                : '',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Cost',
              value: `£${subscription.cost}`,
              icon: 'paymentSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Status',
              value: '',
              children: (
                <>
                  <StatusIndicator intent={subscription.cancelled ? 'danger' : 'success'} />{' '}
                  {subscription.cancelled ? 'Cancelled' : 'Active'}
                </>
              ),
              narrowTable: {
                showLabel: true,
              },
            },
          ],
          ctaContent: {
            icon: 'trashSystem',
            headerContent: 'Cancel Subscription',
            isCallToAction: true,
            onClick: handleSetSubscriptionId(setSubscriptionId, subscription.id ?? null),
          },
        }))}
      />
      <Pagination
        callback={setPageNumber}
        currentPage={pageNumber}
        numberPages={Math.ceil((subscriptions?.totalCount ?? 1) / (subscriptions?.pageSize ?? 1))}
      />
    </>
  )
}

export default SettingsSubscriptionsPage
