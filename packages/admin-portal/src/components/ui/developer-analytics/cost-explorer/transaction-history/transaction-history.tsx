import * as React from 'react'
import { useSelector } from 'react-redux'
import { H5, Grid, GridItem, H6, fetcherWithBlob, Loader, setQueryParams, Section, Content } from '@reapit/elements'
import styles from '@/styles/pages/developer-analytics.scss?mod'
import { selectDeveloperApps } from '@/selector/developer'
import { ReduxState } from '@/types/core'
import lodashIsEqual from 'lodash.isequal'
import {
  formatRenderDate,
  formatRequestDate,
  generatePreviousTransactionDate,
  MAX_NUMBER_TRANSACTION_FIRST_PAGE,
  MAX_NUMBER_TRANSACTION_PER_PAGE,
} from './utils'
import dayjs, { Dayjs } from 'dayjs'
import { URLS } from '@/services/constants'
import { generateHeader } from '@/services/utils'
import { isIE } from '@/utils/browser'

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
  const fileName = `reapit-billing-data-${month}.csv`
  if (isIE()) {
    window.navigator.msSaveBlob(blob, fileName)
    return
  }
  //https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
  let url = window.URL.createObjectURL(blob)
  let a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
  a.click()
  a.remove() //afterwards we remove the element again
}

export const renderTransactionHistoryItem = ({ date, developerAppIds }: { date: Dayjs; developerAppIds: string[] }) => {
  return (
    <Grid key={date.toString()}>
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
  startIndex,
  endIndex,
}: {
  dates: Dayjs[]
  developerAppIds: string[]
  startIndex: number
  endIndex: number
}) => {
  if (dates.length === 0) {
    return <p>No previous transactions in the past</p>
  }
  const subDates = dates.slice(startIndex, endIndex)
  return subDates.map(date =>
    renderTransactionHistoryItem({
      date,
      developerAppIds,
    }),
  )
}

export const renderFirstPage = ({
  developerAppIds,
  previousTransactionDates,
}: {
  developerAppIds: string[]
  previousTransactionDates: Dayjs[]
}) => {
  const today = dayjs()

  return (
    <>
      <Content>
        <H6>This Months Transactions To Date</H6>
        {renderTransactionHistoryItem({ date: today, developerAppIds })}
      </Content>
      <Content>
        <H6>Previous Transactions</H6>
        {renderPreviousTransactionHistoryList({
          dates: previousTransactionDates,
          developerAppIds,
          startIndex: 0,
          endIndex: MAX_NUMBER_TRANSACTION_FIRST_PAGE,
        })}
      </Content>
    </>
  )
}

export const handleLaterClick = (setCurrentPage: React.Dispatch<React.SetStateAction<number>>) => {
  setCurrentPage(currentPage => currentPage + 1)
}

export const handleEarlierClick = (setCurrentPage: React.Dispatch<React.SetStateAction<number>>) => {
  setCurrentPage(currentPage => currentPage - 1)
}

const currentDate = dayjs()

const TransactionHistory: React.FC<TransactionHistoryProps> = () => {
  const { developerAppIds, isLoadingDeveloperDetail, developerCreatedDate } = useSelector(
    selectTransactionHistoryState,
    lodashIsEqual,
  )
  const [currentPage, setCurrentPage] = React.useState<number>(1)

  const previousTransactionDates = generatePreviousTransactionDate({
    currentDate,
    developerCreateDate: dayjs(developerCreatedDate),
  })

  const startIndex =
    currentPage === 1 ? 0 : (currentPage - 2) * MAX_NUMBER_TRANSACTION_PER_PAGE + MAX_NUMBER_TRANSACTION_FIRST_PAGE
  const endIndex =
    startIndex + (currentPage === 1 ? MAX_NUMBER_TRANSACTION_FIRST_PAGE : MAX_NUMBER_TRANSACTION_PER_PAGE)
  const isShowLaterButton = previousTransactionDates.length > 0 && endIndex < previousTransactionDates.length
  const isShowEarlierButton = previousTransactionDates.length > 0 && currentPage > 1

  if (isLoadingDeveloperDetail) {
    return <Loader />
  }

  return (
    <Section hasMargin={false}>
      <H5>Transaction History</H5>
      {currentPage === 1
        ? renderFirstPage({ developerAppIds, previousTransactionDates })
        : renderPreviousTransactionHistoryList({
            dates: previousTransactionDates,
            developerAppIds,
            startIndex: startIndex,
            endIndex: endIndex,
          })}
      <Grid>
        <GridItem>
          {isShowLaterButton && (
            <a
              onClick={event => {
                event?.preventDefault()
                handleLaterClick(setCurrentPage)
              }}
              className={styles.paginationButton}
              href="/"
            >
              {'Later >>'}
            </a>
          )}
          {isShowEarlierButton && (
            <a
              onClick={event => {
                event?.preventDefault()
                handleEarlierClick(setCurrentPage)
              }}
              className={styles.paginationButton}
              href="/"
            >
              {'<< Earlier'}
            </a>
          )}
        </GridItem>
      </Grid>
    </Section>
  )
}

export default TransactionHistory
