import React, { useState, SetStateAction } from 'react'
import { H5, Table, getDate } from '@reapit/elements-legacy'
import { useSelector, useDispatch } from 'react-redux'
import { developerDeleteSubscription } from '@/actions/developer-subscriptions'
import { selectSubscriptions } from '@/selector/developer-subscriptions'
import { hyperlinked } from '@/styles/elements/link'
import { SubscriptionModel } from '@reapit/foundations-ts-definitions'
import { Dispatch } from 'redux'
import ConfirmModal from './delete-confirm'
import { formatCurrency } from '@/utils/number-formatter'
import FadeIn from '../../../../styles/fade-in'

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
    accessor: (row) => formatCurrency(row.cost),
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
  return subscriptions.map((subscription) => ({
    ...subscription,
    cancel: !subscription.cancelled && (
      <a className={hyperlinked} data-test="button-cancel" onClick={() => onCancel(subscription.id)}>
        Cancel
      </a>
    ),
  }))
}

export const handleDeleteSubscription = (dispatch: Dispatch, id: string, handleCloseModal: () => void) => () => {
  dispatch(developerDeleteSubscription(id))
  handleCloseModal()
}

export const handleOpenConfirmModal =
  (
    setIsConfirmModalOpen: React.Dispatch<SetStateAction<boolean>>,
    setSubscriptionIdToCancel: React.Dispatch<SetStateAction<string>>,
  ) =>
  (id: string) => {
    setIsConfirmModalOpen(true)
    setSubscriptionIdToCancel(id)
  }

export const handleCloseConfirmModal = (setIsConfirmModalOpen) => () => {
  setIsConfirmModalOpen(false)
}

export const Subcriptions: React.FC = () => {
  const dispatch = useDispatch()

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [subscriptionIdToCancel, setSubscriptionIdToCancel] = useState('')

  const handleCloseModal = handleCloseConfirmModal(setIsConfirmModalOpen)

  const subscriptions = useSelector(selectSubscriptions)

  const { data } = subscriptions
  const subscriptionsData = genarateTableData(
    data,
    handleOpenConfirmModal(setIsConfirmModalOpen, setSubscriptionIdToCancel),
  )

  return (
    <>
      <H5>Subscriptions</H5>
      <FadeIn>
        <p className="mb-4">Please use the table below to view and manage your Developer Portal Subscriptions.</p>
        <Table scrollable columns={columns} data={subscriptionsData} loading={false} bordered />
      </FadeIn>
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
