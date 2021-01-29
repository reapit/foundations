import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { H3, ButtonGroup, Button, H6, Loader, Section, H5 } from '@reapit/elements'
import { StatisticsRequestParams, fetchStatistics } from '@/actions/statistics'
import { getRangeName } from '@/utils/statistics'
import { selectStatistics } from '@/selector/admin'
import Papa from 'papaparse'
import { AppSummaryModel, DeveloperModel, InstallationModel } from '@reapit/foundations-ts-definitions'
import FileSaver from 'file-saver'

export type Area = 'APPS' | 'DEVELOPERS' | 'INSTALLATIONS'
export type Range = 'WEEK' | 'MONTH' | 'ALL'

export interface InstallationModelWithAppName extends InstallationModel {
  appName: string
}

export const handleLoadStats = (dispatch: Dispatch) => (params: StatisticsRequestParams) => {
  dispatch(fetchStatistics(params))
}

export const handleSaveFile = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'data:text/csv;charset=utf-8,' })
  FileSaver.saveAs(blob, filename)
}

const downloadCSV = (area: Area, data: AppSummaryModel[] | DeveloperModel[] | InstallationModelWithAppName[]) => {
  console.log(area)
  console.log(data)
  if (area === 'APPS') {
    const apps = data as AppSummaryModel[]
    const csv = Papa.unparse({
      fields: ['App Name', 'Developer', 'Created', 'Summary', 'Is Listed', 'Is Integration', 'Free App', 'Auth Flow'],
      data: apps.map((item: AppSummaryModel) => {
        const { name, developer, created, summary, isListed, isDirectApi, isFree, authFlow } = item
        return [name, developer, created, summary, isListed, isDirectApi, isFree, authFlow]
      }),
    })

    return handleSaveFile(csv, 'apps.csv')
  }

  if (area === 'INSTALLATIONS') {
    const installs = data as InstallationModelWithAppName[]
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
      data: installs.map((item: InstallationModelWithAppName) => {
        const { appName, client, customerName, created, terminatesOn, status, installedBy, uninstalledBy } = item
        return [appName, client, customerName, created, terminatesOn, status, installedBy, uninstalledBy]
      }),
    })

    return handleSaveFile(csv, 'installs.csv')
  }

  if (area === 'DEVELOPERS') {
    const developers = data as DeveloperModel[]

    const csv = Papa.unparse({
      fields: ['Name', 'Company', 'Created', 'Job Title', 'Email', 'Telephone', 'Is Inactive', 'Status'],
      data: developers.map((item: DeveloperModel) => {
        const { name, company, created, jobTitle, email, telephone, isInactive, status } = item
        return [name, company, created, jobTitle, email, telephone, isInactive, status]
      }),
    })

    return handleSaveFile(csv, 'developers.csv')
  }
}

export const Statistics: React.FC = () => {
  const dispatch = useDispatch()
  const adminStats = useSelector(selectStatistics)

  const { isLoading, data = [] } = adminStats

  const loadStats = handleLoadStats(dispatch)

  const [area, setArea] = React.useState<Area>('APPS')
  const [range, setRange] = React.useState<Range>('WEEK')

  useEffect(() => {
    loadStats({ area, range })
  }, [area, range])

  return (
    <>
      <H3 isHeadingSection>Stats</H3>
      <Section>
        <H6>Please select an area:</H6>
        <ButtonGroup>
          <Button
            className="ml-0"
            type="button"
            dataTest="area-apps-btn"
            variant={area === 'APPS' ? 'primary' : 'secondary'}
            onClick={() => setArea('APPS')}
          >
            Apps
          </Button>
          <Button
            type="button"
            dataTest="area-developers-btn"
            variant={area === 'DEVELOPERS' ? 'primary' : 'secondary'}
            onClick={() => setArea('DEVELOPERS')}
          >
            Developers
          </Button>
          <Button
            type="button"
            dataTest="area-installations-btn"
            variant={area === 'INSTALLATIONS' ? 'primary' : 'secondary'}
            onClick={() => setArea('INSTALLATIONS')}
          >
            Installations
          </Button>
        </ButtonGroup>
        <H6>Please select a time range:</H6>
        <ButtonGroup>
          <Button
            className="ml-0"
            type="button"
            dataTest="range-week-btn"
            variant={range === 'WEEK' ? 'primary' : 'secondary'}
            onClick={() => setRange('WEEK')}
          >
            Last week
          </Button>
          <Button
            type="button"
            dataTest="range-month-btn"
            variant={range === 'MONTH' ? 'primary' : 'secondary'}
            onClick={() => setRange('MONTH')}
          >
            Last Month
          </Button>
          <Button
            type="button"
            dataTest="range-all-btn"
            variant={range === 'ALL' ? 'primary' : 'secondary'}
            onClick={() => setRange('ALL')}
          >
            All time
          </Button>
        </ButtonGroup>
        <H6>
          Showing results for ‘{area}’ and ‘{getRangeName(range)}’
        </H6>
      </Section>
      <Section>
        <H5>Download as CSV</H5>
        {isLoading ? (
          <Loader />
        ) : (
          <Button type="button" variant="primary" onClick={() => downloadCSV(area, data)}>
            Download
          </Button>
        )}
      </Section>
    </>
  )
}

export default Statistics
