import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { useHistory } from 'react-router'
import { PaymentModel, PaymentModelPagedResult, PropertyModelPagedResult } from '@reapit/foundations-ts-definitions'
import { statusOptions } from '../../constants/filter-options'
import { PaymentLogo } from '../payment/payment-logo'
import { PaymentsFilterControls } from './payments-filter-controls'
import {
  combineAddress,
  DATE_TIME_FORMAT,
  GetActionNames,
  getActions,
  isTruthy,
  toLocalTime,
} from '@reapit/utils-common'
import ErrorBoundary from '../../core/error-boundary'
import {
  Button,
  elFadeIn,
  elMb11,
  elMb5,
  FlexContainer,
  Icon,
  Loader,
  PageContainer,
  Pagination,
  PersistentNotification,
  SecondaryNavContainer,
  SmallText,
  StatusIndicator,
  Table,
  Title,
  Intent,
  ButtonGroup,
  useModal,
} from '@reapit/elements'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { usePaymentsState } from '../../core/use-payments-state'
import { navigate, openNewPage } from '../../core/nav'
import { Routes } from '../../constants/routes'
import PaymentRequestModal from './payment-request-modal'

export interface CellProps {
  properties?: PropertyModelPagedResult | null
  status?: string
  propertyId?: string
}

export const PropertyCell: FC<CellProps> = ({ properties, propertyId }) => {
  const property = properties?._embedded?.find(({ id }) => id === propertyId)

  return property ? <div className={elFadeIn}>{combineAddress(property?.address)}</div> : null
}

export const StatusCell: FC<CellProps> = ({ status }) => {
  const statusItem = statusOptions.find((item) => item.value === status)
  return statusItem ? (
    <>
      <StatusIndicator intent={statusItem?.intent as Intent} /> {statusItem?.label}
    </>
  ) : null
}

export const handleGetPropertyIds = (payments: PaymentModelPagedResult | null) => () =>
  payments?._embedded?.map((payment) => payment.propertyId).filter(isTruthy)

export const handleOpenModal =
  (openModal: () => void, setSelectedPayment: Dispatch<SetStateAction<PaymentModel | null>>, payment: PaymentModel) =>
  () => {
    setSelectedPayment(payment)
    openModal()
  }

export const PaymentsPage: FC = () => {
  const history = useHistory()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { paymentsFilterState, paymentsDataState } = usePaymentsState()
  const { Modal, openModal, closeModal } = useModal()

  const { paymentsFilters } = paymentsFilterState
  const { setSelectedPayment, selectedPayment } = paymentsDataState
  const queryParams = {
    ...paymentsFilters,
    status: paymentsFilters.status ? [paymentsFilters.status] : undefined,
    pageSize: 12,
    pageNumber,
  }

  const [payments, paymentsLoading, , refreshPayments] = useReapitGet<PaymentModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPayments],
    queryParams,
  })

  const propertyIds = useMemo(handleGetPropertyIds(payments), [payments])

  const [properties] = useReapitGet<PropertyModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getProperties],
    queryParams: {
      id: propertyIds,
    },
    fetchWhenTrue: [propertyIds],
  })

  return (
    <>
      <SecondaryNavContainer>
        <Title>Payments</Title>
        <Icon className={elMb5} iconSize="large" icon="newCustomerInfographic" />
        <SmallText hasGreyText>
          From this dashboard you can use the below filters to locate payments held by Reapit.
        </SmallText>
        <SmallText hasGreyText>
          When you have located your desired payment, you can either send an email request for payment to the customer,
          or take a payment in person using our payment form.
        </SmallText>
        <SmallText hasGreyText>
          Both options are available from the slide down on each payment item in the table.
        </SmallText>
        <PaymentsFilterControls />
        <Button intent="neutral" onClick={openNewPage('')}>
          View Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer>
        <ErrorBoundary>
          <FlexContainer isFlexJustifyBetween>
            <Title>Payments Dashboard</Title>
            <PaymentLogo />
          </FlexContainer>
          {paymentsLoading ? (
            <Loader />
          ) : payments?._embedded?.length ? (
            <>
              <Table
                className={elMb11}
                rows={payments?._embedded?.map((payment) => {
                  const { id, propertyId, amount, customer, description, clientAccountName, status, created } = payment
                  return {
                    cells: [
                      {
                        label: 'Property',
                        value: null,
                        children: <PropertyCell propertyId={propertyId} properties={properties} />,
                        icon: 'houseInfographic',
                        cellHasDarkText: true,
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                      {
                        label: 'Amount',
                        value: `£${amount ? amount.toFixed(2) : 0}`,
                        icon: 'poundSystem',
                        cellHasDarkText: true,
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                      {
                        label: 'Customer',
                        value: customer?.name ?? '-',
                        icon: 'usernameSystem',
                        cellHasDarkText: true,
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                      {
                        label: 'Description',
                        value: description ?? '-',
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                      {
                        label: 'Client A/C',
                        value: clientAccountName,
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                      {
                        label: 'Status',
                        value: null,
                        children: <StatusCell status={status} />,
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                      {
                        label: 'Request Date',
                        value: toLocalTime(created, DATE_TIME_FORMAT.DATE_FORMAT),
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                    ],
                    expandableContent: {
                      content: (
                        <ButtonGroup alignment="center">
                          <Button
                            intent="primary"
                            disabled={status === 'posted'}
                            onClick={navigate(history, `${Routes.PAYMENTS}/${id}`)}
                          >
                            Take Payment
                          </Button>
                          <Button
                            intent="secondary"
                            disabled={status === 'posted'}
                            onClick={handleOpenModal(openModal, setSelectedPayment, payment)}
                          >
                            Request Payment
                          </Button>
                        </ButtonGroup>
                      ),
                    },
                  }
                })}
              />
              <Pagination
                callback={setPageNumber}
                currentPage={pageNumber}
                numberPages={Math.ceil((payments?.totalCount ?? 1) / 12)}
              />
            </>
          ) : (
            <PersistentNotification intent="secondary" isExpanded isFullWidth isInline>
              No payments match your search criteria
            </PersistentNotification>
          )}
          <Modal
            title={`Request Payment of £${selectedPayment?.amount ? selectedPayment?.amount.toFixed(2) : 0} for ${
              selectedPayment?.id
            }`}
          >
            <PaymentRequestModal closeModal={closeModal} refreshPayments={refreshPayments} />
          </Modal>
        </ErrorBoundary>
      </PageContainer>
    </>
  )
}

export default PaymentsPage
