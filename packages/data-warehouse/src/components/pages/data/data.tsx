import React, { useContext, useEffect, useState } from 'react'
import { H3, H5, Section, Content, Helper, Loader } from '@reapit/elements'
import { MessageContext } from '../../../context/message-context'
import { PagedApiResponse } from '../../../types/core'
import { DataSetModel } from '../../../types/data-sets'
import { SharesModel } from '../../../types/shares'
import { getSharesService } from '../../../services/shares'
import { getDataSetsService } from '../../../services/data-sets'
import FadeIn from '../../../styles/fade-in'
import DataSetsTable from './data-sets-table'
import SharesTable from './shares-table'
import { AccountModel } from '../../../types/accounts'
import { getAccountsService } from '../../../services/accounts'

export type DataProps = {}

export const Data: React.FC<DataProps> = () => {
  const [accounts, setAccounts] = useState<PagedApiResponse<AccountModel>>()
  const [accountsLoading, setAccountsLoading] = useState<boolean>(false)
  const [dataSets, setDataSets] = useState<PagedApiResponse<DataSetModel>>()
  const [dataSetsLoading, setDataSetsLoading] = useState<boolean>(false)
  const [shares, setShares] = useState<PagedApiResponse<SharesModel>>()
  const [sharesLoading, setSharesLoading] = useState<boolean>(false)

  const { setMessageState } = useContext(MessageContext)

  useEffect(() => {
    const getAccounts = async () => {
      setAccountsLoading(true)
      const accounts = await getAccountsService()
      setAccountsLoading(false)
      if (accounts) {
        return setAccounts(accounts)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching accounts, please try again' })
    }
    getAccounts()
  }, [setAccounts, setAccountsLoading])

  useEffect(() => {
    const getDataSets = async () => {
      setDataSetsLoading(true)
      const dataSetsFetched = await getDataSetsService()
      setDataSetsLoading(false)
      if (dataSetsFetched) {
        return setDataSets(dataSetsFetched)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching data sets, please try again' })
    }
    getDataSets()
  }, [setDataSets, setDataSetsLoading])

  useEffect(() => {
    const getShares = async () => {
      setSharesLoading(true)
      const sharesFetched = await getSharesService()
      setSharesLoading(false)
      if (sharesFetched) {
        return setShares(sharesFetched)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching data shares, please try again' })
    }
    getShares()
  }, [setShares, setSharesLoading])

  return (
    <>
      <Content>
        <H3 isHeadingSection>Data</H3>
        <Section>
          <H5>Available Data</H5>
          {dataSetsLoading ? (
            <Loader />
          ) : dataSets?._embedded.length ? (
            <FadeIn>
              <DataSetsTable
                dataSets={dataSets._embedded}
                setShares={setShares}
                hasAccount={Boolean(accounts?._embedded.length)}
              />
            </FadeIn>
          ) : (
            <FadeIn>
              <Helper variant="info">No datasets available for your organisation</Helper>
            </FadeIn>
          )}
        </Section>
        <Section>
          <H5>Data Shares</H5>
          {sharesLoading || accountsLoading ? (
            <Loader />
          ) : !accounts?._embedded.length ? (
            <FadeIn>
              <Helper variant="info">
                You will need to provision an account from the Accounts page before you can share data
              </Helper>
            </FadeIn>
          ) : shares?._embedded.length ? (
            <FadeIn>
              <SharesTable shares={shares._embedded} setShares={setShares} />
            </FadeIn>
          ) : (
            <FadeIn>
              <Helper variant="info">No data shares available for your organisation</Helper>
            </FadeIn>
          )}
        </Section>
      </Content>
    </>
  )
}

export default Data
