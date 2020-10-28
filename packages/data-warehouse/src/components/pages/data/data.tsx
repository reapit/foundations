import React, { useContext, useEffect, useState } from 'react'
import { H3, H5, Section, Content, Helper, Loader } from '@reapit/elements'
import { ErrorContext } from '../../../context/error-context'
import { serverError } from '../../ui/toast-error'
import { PagedApiResponse } from '../../../types/core'
import { DataSetModel } from '../../../types/data-sets'
import { SharesModel } from '../../../types/shares'
import { getSharesService } from '../../../services/shares'
import { getDataSetsService } from '../../../services/data-sets'
import FadeIn from '../../../styles/fade-in'
import DataSetsTable from './data-sets-table'
import SharesTable from './shares-table'

export type DataProps = {}

export const Data: React.FC<DataProps> = () => {
  const [dataSets, setDataSets] = useState<PagedApiResponse<DataSetModel>>()
  const [dataSetsLoading, setDataSetsLoading] = useState<boolean>(false)
  const [shares, setShares] = useState<PagedApiResponse<SharesModel>>()
  const [sharesLoading, setSharesLoading] = useState<boolean>(false)

  const { setServerErrorState } = useContext(ErrorContext)

  useEffect(() => {
    const getDataSets = async () => {
      setDataSetsLoading(true)
      const dataSetsFetched = await getDataSetsService()
      setDataSetsLoading(false)
      if (dataSetsFetched) {
        return setDataSets(dataSetsFetched)
      }
      return setServerErrorState(serverError('Something went wrong fetching data sets, please try again'))
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
      return setServerErrorState(serverError('Something went wrong fetching data shares, please try again'))
    }
    getShares()
  }, [setShares, setSharesLoading])

  return (
    <>
      <Content>
        <H3 isHeadingSection>Data</H3>
        <Section>
          <H5>Data Sets</H5>
          {dataSetsLoading ? (
            <Loader />
          ) : dataSets?._embedded.length ? (
            <FadeIn>
              <DataSetsTable dataSets={dataSets._embedded} setShares={setShares} />
            </FadeIn>
          ) : (
            <Helper variant="info">No datasets available for your organisation</Helper>
          )}
        </Section>
        <Section>
          <H5>Data Shares</H5>
          {sharesLoading ? (
            <Loader />
          ) : shares?._embedded.length ? (
            <FadeIn>
              <SharesTable shares={shares._embedded} setShares={setShares} />
            </FadeIn>
          ) : (
            <Helper variant="info">No data shares available for your organisation</Helper>
          )}
        </Section>
      </Content>
    </>
  )
}

export default Data
