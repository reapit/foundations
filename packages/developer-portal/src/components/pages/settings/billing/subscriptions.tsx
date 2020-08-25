import React, { useState, SetStateAction } from 'react'
import { H5, Table, getDate, Loader, Section } from '@reapit/elements'
import { useSelector, useDispatch } from 'react-redux'
import { developerFetchSubscriptions, developerDeleteSubscription } from '@/actions/developer-subscriptions'
import { selectSubscriptions, selectSubscriptionsLoading } from '@/selector/developer-subscriptions'
import styles from '@/styles/elements/link.scss?mod'
import { SubscriptionModel } from '@reapit/foundations-ts-definitions'
import { Dispatch } from 'redux'
import ConfirmModal from './delete-confirm'
import { formatCurrency } from '@/utils/number-formatter'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getDeveloperIdFromConnectSession } from '@/utils/session'

export const TimeCell = ({ cell: { value } }) => <p>{getDate(value)}</p>
export const StatusCell = ({ cell: { value } }) => <p>{value ? 'Cancelled' : 'Active'}</p>

export const columns = [
  {
    Header: 'Type',
    accessor: 'summary',
  },
  {
    Header: 'Start Date',
    accessor: 'created',
    Cell: TimeCell,
  },
  {
    Header: 'Renewal Date',
    accessor: 'renews',
    Cell: TimeCell,
  },
  {
    Header: 'Frequency',
    accessor: 'frequency',
    columnProps: {
      className: 'capitalize',
    },
  },
  {
    Header: 'Cost',
    accessor: row => formatCurrency(row.cost),
  },
  {
    Header: 'Status',
    accessor: 'cancelled',
    Cell: StatusCell,
  },
  {
    accessor: 'cancel',
    columnProps: {
      width: '60px',
    },
  },
]

export const genarateTableData = (subscriptions: SubscriptionModel[] = [], onCancel) => {
  return subscriptions.map(subscription => ({
    ...subscription,
    cancel: !subscription.cancelled && (
      <a className={styles.hyperlinked} data-test="button-cancel" onClick={() => onCancel(subscription.id)}>
        Cancel
      </a>
    ),
  }))
}

export const handleFetchSubscriptions = (dispatch: Dispatch, developerId: string) => () => {
  developerId && dispatch(developerFetchSubscriptions({ developerId }))
}

export const handleDeleteSubscription = (dispatch: Dispatch, id: string, handleCloseModal: () => void) => () => {
  dispatch(developerDeleteSubscription(id))
  handleCloseModal()
}

export const handleOpenConfirmModal = (
  setIsConfirmModalOpen: React.Dispatch<SetStateAction<boolean>>,
  setSubscriptionIdToCancel: React.Dispatch<SetStateAction<string>>,
) => (id: string) => {
  setIsConfirmModalOpen(true)
  setSubscriptionIdToCancel(id)
}

export const handleCloseConfirmModal = setIsConfirmModalOpen => () => {
  setIsConfirmModalOpen(false)
}

export const Subcriptions: React.FC = () => {
  const dispatch = useDispatch()

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [subscriptionIdToCancel, setSubscriptionIdToCancel] = useState('')

  const handleCloseModal = handleCloseConfirmModal(setIsConfirmModalOpen)

  const subscriptions = useSelector(selectSubscriptions)
  const loading = useSelector(selectSubscriptionsLoading)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = getDeveloperIdFromConnectSession(connectSession)

  React.useEffect(handleFetchSubscriptions(dispatch, developerId), [dispatch, developerId])

  const { data } = subscriptions
  const subscriptionsData = genarateTableData(
    data,
    handleOpenConfirmModal(setIsConfirmModalOpen, setSubscriptionIdToCancel),
  )

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Section>
          <H5>Subscriptions</H5>
          <p className="is-italic mb-4">
            The subscriptions table below is just for reference whilst we are in Beta. When we move out of the Beta
            Phase you can use the table below to view and manage your Developer Portal Subscriptions.
          </p>
          <Table scrollable columns={columns} data={subscriptionsData} loading={false} bordered />
        </Section>
      )}
      <ConfirmModal
        visible={isConfirmModalOpen}
        title="Confirm Cancellation"
        subtitle="Are you sure you want to cancel this subscription?"
        onCancel={handleCloseModal}
        onConfirm={handleDeleteSubscription(dispatch, subscriptionIdToCancel, handleCloseModal)}
      />
    </>
  )
}

export default Subcriptions
