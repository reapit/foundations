import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { Payments, Platform } from '@reapit/foundations-ts-definitions'
import { statusOptions } from '../../constants/filter-options'
import { navigateRoute } from '@reapit/payments-ui'
import { PaymentsFilterControls } from './payments-filter-controls'
import { combineAddress, DATE_TIME_FORMAT, isTruthy, toLocalTime } from '@reapit/utils-common'
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
  elMb7,
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { openNewPage } from '../../core/nav'
import { RoutePaths } from '../../constants/routes'
import { PaymentRequestModal } from './payment-request-modal'
import { getActions, useReapitGet, GetActionNames, objectToQuery } from '@reapit/use-reapit-data'
import { cx } from '@linaria/core'
import dayjs from 'dayjs'
import { useConfigState } from '../../core/use-config-state'
import ErrorBoundary from '../error-boundary'
import { useNavigate } from 'react-router'

export interface CellProps {
  properties?: Platform.PropertyModelPagedResult | null
  status?: string
  propertyId?: string
}

export interface PaymentsFilters {
  createdFrom?: string
  createdTo?: string
  description?: string
  status?: string
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

export const handleGetPropertyIds = (payments: Payments.PaymentModelPagedResult | null) => () =>
  payments?._embedded?.map((payment) => payment.propertyId).filter(isTruthy)

export const handleOpenModal =
  (
    openModal: () => void,
    setSelectedPayment: Dispatch<SetStateAction<Payments.PaymentModel | null>>,
    payment: Payments.PaymentModel,
  ) =>
  () => {
    setSelectedPayment(payment)
    openModal()
  }

export const PaymentsPage: FC = () => {
  const navigate = useNavigate()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [selectedPayment, setSelectedPayment] = useState<Payments.PaymentModel | null>(null)
  const [paymentsFilters, setPaymentsFilters] = useState<PaymentsFilters>({
    createdFrom: dayjs().subtract(1, 'month').format(DATE_TIME_FORMAT.YYYY_MM_DD),
    createdTo: dayjs().add(1, 'day').format(DATE_TIME_FORMAT.YYYY_MM_DD),
  })
  const { Modal, openModal, closeModal } = useModal()
  const { config, configLoading } = useConfigState()
  const configNotConfigured = !config?.isConfigured

  const queryParams = objectToQuery({
    ...paymentsFilters,
    pageSize: 12,
    pageNumber,
  })

  const [payments, paymentsLoading, , refreshPayments] = useReapitGet<Payments.PaymentModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getPayments],
    queryParams,
  })

  const propertyIds = useMemo(handleGetPropertyIds(payments), [payments])

  const [properties] = useReapitGet<Platform.PropertyModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getProperties],
    queryParams: {
      id: propertyIds,
    },
    fetchWhenTrue: [propertyIds?.length],
  })

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
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
        <PaymentsFilterControls paymentsFilters={paymentsFilters} setPaymentsFilters={setPaymentsFilters} />
        <Button intent="neutral" onClick={openNewPage('')}>
          View Docs
        </Button>
      </SecondaryNavContainer>
      <PageContainer>
        <ErrorBoundary>
          <Title>Payments Dashboard</Title>
          {configNotConfigured && !configLoading && (
            <PersistentNotification className={cx(elMb7, elFadeIn)} intent="danger" isFullWidth isInline isExpanded>
              The app cannnot currently process client payments. This is likely because your payment provider has not
              been configured. Please contact your Reapit Organisation Administrator or if you are an Admin, use the
              dedicated page in the main navigation.
            </PersistentNotification>
          )}
          {paymentsLoading && <Loader />}
          {payments?._embedded?.length ? (
            <>
              <Table
                className={cx(elMb11, elFadeIn)}
                rows={payments?._embedded?.map((payment) => {
                  const { id, propertyId, amount, customer, description, clientAccountName, status, created } = payment
                  return {
                    cells: [
                      {
                        label: 'Property',
                        value: null,
                        children: <PropertyCell propertyId={propertyId} properties={properties} />,
                        icon: 'property',
                        cellHasDarkText: true,
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                      {
                        label: 'Amount',
                        value: `£${amount ? amount.toFixed(2) : 0}`,
                        icon: 'pound',
                        cellHasDarkText: true,
                        narrowTable: {
                          showLabel: true,
                        },
                      },
                      {
                        label: 'Customer',
                        value: customer?.name ?? '-',
                        icon: 'contact',
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
                            disabled={status === 'posted' || configNotConfigured}
                            onClick={handleOpenModal(openModal, setSelectedPayment, payment)}
                          >
                            Email Request
                          </Button>
                          <Button
                            intent="primary"
                            disabled={status === 'posted' || configNotConfigured}
                            onClick={navigateRoute(navigate, `${RoutePaths.PAYMENTS}/${id}`)}
                          >
                            Take Payment
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
          ) : !paymentsLoading ? (
            <PersistentNotification className={elFadeIn} intent="primary" isExpanded isFullWidth isInline>
              No payments match your search criteria
            </PersistentNotification>
          ) : null}
          <Modal
            title={`Request Payment of £${selectedPayment?.amount ? selectedPayment?.amount.toFixed(2) : 0} for ${
              selectedPayment?.id
            }`}
          >
            <PaymentRequestModal
              closeModal={closeModal}
              refreshPayments={refreshPayments}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          </Modal>
        </ErrorBoundary>
      </PageContainer>
    </FlexContainer>
  )
}

export default PaymentsPage
