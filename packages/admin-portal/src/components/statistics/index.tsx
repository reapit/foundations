import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Papa from 'papaparse'
import {
  AppSummaryModel,
  AppSummaryModelPagedResult,
  DeveloperModel,
  DeveloperModelPagedResult,
  InstallationModel,
  ServiceItemBillingV2Model,
  SubscriptionModel,
} from '@reapit/foundations-ts-definitions'
import FileSaver from 'file-saver'
import { ButtonGroup, Button, elMb11 } from '@reapit/elements'
import { InstallationsWithAppName } from '../installations'
import { SubsWithAppName } from '../subscriptions'
import { toLocalTime } from '@reapit/utils-common'

export type Area = 'APPS' | 'DEVELOPERS' | 'INSTALLATIONS' | 'BILLING' | 'SUBSCRIPTIONS'
export type PagedData =
  | AppSummaryModelPagedResult
  | DeveloperModelPagedResult
  | InstallationsWithAppName
  | SubsWithAppName
export type StatsDataType = PagedData | ServiceItemBillingV2Model[] | null

export type CSVDataType =
  | AppSummaryModel[]
  | DeveloperModel[]
  | InstallationModel[]
  | ServiceItemBillingV2Model[]
  | null

export interface StatisticsProps {
  area: Area
  data: StatsDataType
  setPageSize?: Dispatch<SetStateAction<number>>
}

export const handleSaveFile = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'data:text/csv;charset=utf-8,' })
  FileSaver.saveAs(blob, filename)
}

export const handleDownloadCSV =
  (area: Area, data: CSVDataType, setPageSize?: Dispatch<SetStateAction<number>>) => () => {
    if (data && area === 'APPS') {
      const apps = data as AppSummaryModel[]
      const csv = Papa.unparse({
        fields: [
          'App Name',
          'Developer',
          'Created',
          'Summary',
          'Is Listed',
          'Is Integration',
          'Free App',
          'Auth Flow',
          'Publicly Listed',
        ],
        data: apps.map((item: AppSummaryModel) => {
          const { name, developer, created, summary, isListed, isDirectApi, isFree, authFlow, publicListedDate } = item
          return [
            name,
            developer,
            toLocalTime(created),
            summary,
            isListed,
            isDirectApi,
            isFree,
            authFlow,
            publicListedDate ? toLocalTime(publicListedDate) : '-',
          ]
        }),
      })

      handleSaveFile(csv, 'apps.csv')
      return setPageSize && setPageSize(12)
    }

    if (data && area === 'INSTALLATIONS') {
      const installs = data as (InstallationModel & { appName: string })[]

      const csv = Papa.unparse({
        fields: [
          'App Name',
          'Client',
          'Customer Name',
          'Created On',
          'Uninstalled On',
          'Status',
          'Installed By',
          'Uninstalled By',
        ],
        data: installs.map((item) => {
          const { appName, client, customerName, created, terminatesOn, status, installedBy, uninstalledBy } = item
          return [appName, client, customerName, created, terminatesOn, status, installedBy, uninstalledBy]
        }),
      })

      handleSaveFile(csv, 'installs.csv')
      return setPageSize && setPageSize(12)
    }

    if (data && area === 'DEVELOPERS') {
      const developers = data as DeveloperModel[]

      const csv = Papa.unparse({
        fields: ['Name', 'Company', 'Created', 'Job Title', 'Email', 'Telephone', 'Is Inactive', 'Status'],
        data: developers.map((item: DeveloperModel) => {
          const { name, company, created, jobTitle, email, telephone, isInactive, status } = item
          return [name, company, created, jobTitle, email, telephone, isInactive, status]
        }),
      })

      handleSaveFile(csv, 'developers.csv')
      return setPageSize && setPageSize(12)
    }

    if (data && area === 'BILLING') {
      const apiCalls = data as ServiceItemBillingV2Model[]

      const csv = Papa.unparse({
        fields: ['Entity Name', 'Total Number Calls', 'Total Cost'],

        data: apiCalls.map((item: ServiceItemBillingV2Model) => {
          const { name, amount, cost } = item
          const formattedCost = cost ? `${cost.toFixed(2).padStart(2, '0')}` : '0'
          return [name, amount, formattedCost]
        }),
      })

      return handleSaveFile(csv, 'billing.csv')
    }

    if (data && area === 'SUBSCRIPTIONS') {
      const apiCalls = data as (SubscriptionModel & { appName: string })[]

      const csv = Papa.unparse({
        fields: [
          'Subcription Type',
          'Summary',
          'App Name',
          'Company Name',
          'User Email',
          'Start Date',
          'Renews',
          'Frequency',
          'Cost',
          'Cancelled',
        ],
        data: apiCalls.map((item) => {
          const { type, summary, appName, organisationName, user, created, renews, frequency, cost, cancelled } = item

          return [
            type,
            summary,
            appName,
            organisationName,
            user,
            toLocalTime(created),
            renews ? toLocalTime(renews) : '-',
            frequency,
            `£${cost}`,
            cancelled ? toLocalTime(cancelled) : '-',
          ]
        }),
      })

      return handleSaveFile(csv, 'subscriptions.csv')
    }
  }

export const handleDownloadCSVClick =
  (
    area: Area,
    data: StatsDataType,
    setCsvData: Dispatch<SetStateAction<CSVDataType | null>>,
    setPageSize?: Dispatch<SetStateAction<number>>,
  ) =>
  () => {
    if (data && area === 'BILLING') {
      const billing = data as ServiceItemBillingV2Model[]
      setCsvData(billing)
    } else if (setPageSize) {
      setPageSize(9999)
    }
  }

export const handleDataChange =
  (area: Area, data: StatsDataType, setCsvData: Dispatch<SetStateAction<CSVDataType | null>>) => () => {
    if (data && area !== 'BILLING') {
      const pagedData = data as PagedData

      if (pagedData.data && pagedData.pageSize === 9999) {
        setCsvData(pagedData.data)
      }
    }
  }

export const Statistics: FC<StatisticsProps> = ({ area, data, setPageSize }) => {
  const [csvData, setCsvData] = useState<CSVDataType | null>(null)

  useEffect(handleDownloadCSV(area, csvData, setPageSize), [csvData, area])
  useEffect(handleDataChange(area, data, setCsvData), [data, area])

  return (
    <div className={elMb11}>
      <ButtonGroup>
        <Button type="button" intent="primary" onClick={handleDownloadCSVClick(area, data, setCsvData, setPageSize)}>
          Download CSV
        </Button>
      </ButtonGroup>
    </div>
  )
}
