import * as React from 'react'
import { useSelector } from 'react-redux'
import { H4, Grid, GridItem, H6, fetcherWithBlob, Loader, setQueryParams } from '@reapit/elements'
import styles from '@/styles/pages/developer-analytics.scss?mod'
import { selectDeveloperApps } from '@/selector/developer'
import { ReduxState } from '@/types/core'
import lodashIsEqual from 'lodash.isequal'
import { formatRenderDate, formatRequestDate, generatePreviousTransactionDate } from './utils'
import dayjs, { Dayjs } from 'dayjs'
import { URLS, generateHeader } from '@/constants/api'

export type TransactionHistoryProps = {}

export type MapState = {
  isLoadingDeveloperDetail: boolean
  developerCreatedDate: string
  developerAppIds: string[]
}

export const selectTransactionHistoryState: (state: ReduxState) => MapState = state => {
  const developerApps = selectDeveloperApps(state)

  const developerAppIds = developerApps
    .map(developerApp => developerApp.id)
    .filter(id => typeof id === 'string') as string[]

  return {
    developerCreatedDate: state.developer.myIdentity?.created || '',
    developerAppIds: developerAppIds,
    isLoadingDeveloperDetail: state.developer.loading,
  }
}

export const createHandleDownLoadButtonOnClickFn = ({
  month,
  developerAppIds,
}: {
  month: string
  developerAppIds: string[]
}) => async e => {
  e.preventDefault()

  const params = setQueryParams({ applicationId: developerAppIds })
  const blob = await fetcherWithBlob({
    url: `${URLS.trafficEventBilling}/${month}/download?${params.toString()}`,
    api: window.reapit.config.marketplaceApiUrl,
    method: 'GET',
    headers: generateHeader(window.reapit.config.marketplaceApiKey),
  })

  //https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
  let url = window.URL.createObjectURL(blob)

  let a = document.createElement('a')
  a.href = url
  a.download = `reapit-billing-data-${month}.csv`

  document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox

  a.click()
  a.remove() //afterwards we remove the element again
}

export const renderTransactionHistoryItem = ({ date, developerAppIds }: { date: Dayjs; developerAppIds: string[] }) => {
  return (
    <Grid>
      <GridItem className="is-one-third">{formatRenderDate(date)}</GridItem>
      <GridItem>
        <a
          onClick={createHandleDownLoadButtonOnClickFn({
            month: formatRequestDate(date),
            developerAppIds,
          })}
          href="#"
        >
          Download
        </a>
      </GridItem>
    </Grid>
  )
}

export const renderPreviousTransactionHistoryList = ({
  dates,
  developerAppIds,
}: {
  dates: Dayjs[]
  developerAppIds: string[]
}) => {
  if (dates.length === 0) {
    return <p>No previous transactions in the past</p>
  }

  return dates.map(date =>
    renderTransactionHistoryItem({
      date,
      developerAppIds,
    }),
  )
}

const currentDate = dayjs()

const TransactionHistory: React.FC<TransactionHistoryProps> = () => {
  const { developerAppIds, isLoadingDeveloperDetail, developerCreatedDate } = useSelector(
    selectTransactionHistoryState,
    lodashIsEqual,
  )

  const today = dayjs()

  const previousTransactionDates = generatePreviousTransactionDate({
    currentDate,
    developerCreateDate: dayjs(developerCreatedDate),
  })

  if (isLoadingDeveloperDetail) {
    return <Loader />
  }

  return (
    <div>
      <div className={styles.transactionTitle}>
        <H4>Transaction History</H4>
      </div>
      <div className={styles.transactionSection}>
        <H6>This Months Transactions</H6>
        {renderTransactionHistoryItem({ date: today, developerAppIds })}
      </div>
      <div>
        <H6>Previous Transactions</H6>
        {renderPreviousTransactionHistoryList({
          dates: previousTransactionDates,
          developerAppIds,
        })}
      </div>
    </div>
  )
}

export default TransactionHistory
