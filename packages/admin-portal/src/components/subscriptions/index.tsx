import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import ErrorBoundary from '../error-boundary'
import { toLocalTime } from '@reapit/utils-common'
import {
  PageContainer,
  Loader,
  Title,
  Pagination,
  Table,
  elMb11,
  useModal,
  BodyText,
  ButtonGroup,
  Button,
} from '@reapit/elements'
import {
  objectToQuery,
  SendFunction,
  useReapitGet,
  useReapitUpdate,
  UpdateActionNames,
  updateActions,
  GetActionNames,
  getActions,
} from '@reapit/use-reapit-data'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { FilterForm } from './filter-form'
import { Statistics } from '../statistics'
import { usePermissionsState } from '../../core/use-permissions-state'

export interface SubscriptionsFilters {
  subscriptionType?: string
  organisationName?: string
  userEmail?: string
  status?: string
}

export const handleCancelSub =
  (cancelSub: SendFunction<void, boolean | null>, setCancelSubId: Dispatch<SetStateAction<string | null>>) =>
  async () => {
    const cancelled = await cancelSub()
    if (cancelled) {
      setCancelSubId(null)
    }
  }

export const handleCancelSubSuccess = (refetchSubs: () => void, closeModal: () => void, success?: boolean) => () => {
  if (success) {
    refetchSubs()
    closeModal()
  }
}

export const handleSetSubId =
  (setCancelSubId: Dispatch<SetStateAction<string | null>>, openModal: () => void, cancelSubId?: string) => () => {
    if (cancelSubId) {
      openModal()
      setCancelSubId(cancelSubId)
    }
  }

const Subscriptions: FC = () => {
  const [subscriptionsFilters, setSubscriptionsFilters] = useState<SubscriptionsFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [cancelSubId, setCancelSubId] = useState<string | null>(null)
  const { Modal, openModal, closeModal } = useModal()
  const { hasReadAccess } = usePermissionsState()

  const [subscriptions, subscriptionsLoading, , refetchSubs] = useReapitGet<Marketplace.SubscriptionModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getSubscriptions],
    queryParams: {
      ...objectToQuery(subscriptionsFilters),
      userEmail: subscriptionsFilters.userEmail ? encodeURIComponent(subscriptionsFilters.userEmail ?? '') : undefined,
      pageSize,
      pageNumber,
    },
  })

  const [, , cancelSub, cancelSubSuccess] = useReapitUpdate<void, null>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteSubscription],
    method: 'DELETE',
    uriParams: {
      subscriptionId: cancelSubId,
    },
  })

  useEffect(handleCancelSubSuccess(refetchSubs, closeModal, cancelSubSuccess), [cancelSubSuccess])

  return (
    <ErrorBoundary>
      <PageContainer>
        <Title>Subscriptions</Title>
        <FilterForm setSubscriptionsFilters={setSubscriptionsFilters} />
        <Statistics area="SUBSCRIPTIONS" data={subscriptions} setPageSize={setPageSize} />
        {subscriptionsLoading ? (
          <Loader />
        ) : (
          <>
            <Table
              className={elMb11}
              numberColumns={10}
              rows={subscriptions?.data?.map(
                ({ id, type, summary, organisationName, user, created, renews, frequency, cost, cancelled }) => ({
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
                  ctaContent: {
                    headerContent: 'Cancel',
                    icon: cancelled || hasReadAccess ? undefined : 'trash',
                    onClick: cancelled || hasReadAccess ? undefined : handleSetSubId(setCancelSubId, openModal, id),
                  },
                }),
              )}
            />
            <Pagination
              callback={setPageNumber}
              currentPage={pageNumber}
              numberPages={Math.ceil((subscriptions?.totalCount ?? 1) / 12)}
            />
            <Modal title="Cancel Subscription">
              <BodyText>Please confirm you wish to cancel this subscription</BodyText>
              <ButtonGroup alignment="right">
                <Button type="button" onClick={closeModal}>
                  Close
                </Button>
                <Button intent="danger" onClick={handleCancelSub(cancelSub, setCancelSubId)}>
                  Cancel
                </Button>
              </ButtonGroup>
            </Modal>
          </>
        )}
      </PageContainer>
    </ErrorBoundary>
  )
}

export default Subscriptions
