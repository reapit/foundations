import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Papa from 'papaparse'
import { ServiceItemBillingV2Model, Marketplace, Organisations } from '@reapit/foundations-ts-definitions'
import FileSaver from 'file-saver'
import { ButtonGroup, Button, elMb11 } from '@reapit/elements'
import { toLocalTime } from '@reapit/utils-common'

export type Area = 'APPS' | 'DEVELOPERS' | 'INSTALLATIONS' | 'BILLING' | 'SUBSCRIPTIONS' | 'SERVICES' | 'OFFICE_GROUPS'
export type PagedData =
  | Marketplace.AppSummaryModelPagedResult
  | Marketplace.DeveloperModelPagedResult
  | Marketplace.InstallationModelPagedResult
  | Marketplace.SubscriptionModelPagedResult
export type StatsDataType = PagedData | ServiceItemBillingV2Model[] | Organisations.OfficeGroupModelPagedResult | null

export type CSVDataType =
  | Marketplace.AppSummaryModel[]
  | Marketplace.DeveloperModel[]
  | Marketplace.InstallationModel[]
  | ServiceItemBillingV2Model[]
  | Organisations.OfficeGroupModel[]
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
      const apps = data as Marketplace.AppSummaryModel[]
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
        data: apps.map((item: Marketplace.AppSummaryModel) => {
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
      const installs = data as (Marketplace.InstallationModel & { appName: string })[]

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
          'Fixed Consumption',
        ],
        data: installs.map((item) => {
          const {
            appName,
            client,
            customerName,
            created,
            terminatesOn,
            status,
            installedBy,
            uninstalledBy,
            fixedApiConsumptionCost,
          } = item
          return [
            appName,
            client,
            customerName,
            created,
            terminatesOn,
            status,
            installedBy,
            uninstalledBy,
            fixedApiConsumptionCost,
          ]
        }),
      })

      handleSaveFile(csv, 'installs.csv')
      return setPageSize && setPageSize(12)
    }

    if (data && area === 'DEVELOPERS') {
      const developers = data as Marketplace.DeveloperModel[]

      const csv = Papa.unparse({
        fields: ['Name', 'Company', 'Created', 'Job Title', 'Email', 'Telephone', 'Is Inactive', 'Status'],
        data: developers.map((item: Marketplace.DeveloperModel) => {
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
      const apiCalls = data as Marketplace.SubscriptionModel[]

      const csv = Papa.unparse({
        fields: [
          'Subcription Type',
          'Summary',
          'Company Name',
          'User Email',
          'Start Date',
          'Renews',
          'Frequency',
          'Cost',
          'Cancelled',
        ],
        data: apiCalls.map((item) => {
          const { type, summary, organisationName, user, created, renews, frequency, cost, cancelled } = item

          return [
            type,
            summary,
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

      handleSaveFile(csv, 'subscriptions.csv')
      return setPageSize && setPageSize(12)
    }

    if (data && area === 'OFFICE_GROUPS') {
      const officeGroups = data as Organisations.OfficeGroupModel[]

      const csv = Papa.unparse({
        fields: ['Customer Id', 'Group Name', 'Office Ids', 'Status'],
        data: officeGroups.map((item) => {
          const { customerId, name, officeIds, status } = item

          return [customerId, name, officeIds, status]
        }),
      })

      handleSaveFile(csv, 'office-groups.csv')
      return setPageSize && setPageSize(12)
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
    if (data && area !== 'BILLING' && area !== 'OFFICE_GROUPS') {
      const pagedData = data as PagedData

      if (pagedData.data && pagedData.pageSize === 9999) {
        setCsvData(pagedData.data)
      }
    }

    if (data && area === 'OFFICE_GROUPS') {
      const pagedData = data as Organisations.OfficeGroupModelPagedResult

      if (pagedData && pagedData.pageSize === 9999) {
        setCsvData(pagedData._embedded ?? [])
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
