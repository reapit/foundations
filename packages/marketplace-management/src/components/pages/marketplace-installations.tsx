import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  InstallationMetadataModel,
  InstallationModel,
  InstallationModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import {
  PageContainer,
  Loader,
  Title,
  FormLayout,
  elMb11,
  InputWrap,
  InputGroup,
  Table,
  Pagination,
  InputWrapFull,
  Label,
  SearchableDropdown,
  ToggleRadio,
  FlexContainer,
  ButtonGroup,
  Button,
} from '@reapit/elements'
import { useForm, UseFormWatch } from 'react-hook-form'
import dayjs from 'dayjs'
import { SearchableMultiSelect } from '@reapit/utils-react'
import { combineAddress } from '@reapit/utils-common'
import { GetActionNames, getActions, objectToQuery, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import debounce from 'just-debounce-it'
import { fetchOfficeList } from './fetch-offices'
import { MarketplaceSidebar } from './marketplace-sidebar'
import { getPlatformApiUrl } from '@reapit/use-reapit-data/src/api-regions'
import { useReapitConnect } from '@reapit/connect-session'

export interface InstallationFilters {
  installedDateFrom?: string
  installedDateTo?: string
  appIds?: string
  officeName?: string
  clientId?: string
  isChargedConsumption?: string
  isInstalled?: string
}

const defaultValues: InstallationFilters = {
  appIds: '',
  isInstalled: 'true',
}

export const formatFilters = (installationsFilters: InstallationFilters) => {
  const { installedDateTo, installedDateFrom, isInstalled, appIds, clientId, officeName, isChargedConsumption } =
    installationsFilters

  const appIdQuery = appIds ? { appId: appIds.split(',').filter(Boolean) } : {}
  const clientIdQuery = clientId ? { clientId } : {}
  const officeNameQuery = officeName ? { officeName } : {}
  const includeOfficeGroupsQuery = clientId ? { includeOfficeGroups: true } : {}

  return objectToQuery({
    installedDateTo: installedDateTo ? dayjs(installedDateTo).format('YYYY-MM-DDTHH:mm:ss') : undefined,
    installedDateFrom: installedDateFrom ? dayjs(installedDateFrom).format('YYYY-MM-DDTHH:mm:ss') : undefined,
    isChargedConsumption,
    isInstalled,
    ...appIdQuery,
    ...clientIdQuery,
    ...officeNameQuery,
    ...includeOfficeGroupsQuery,
  })
}

export const handleSetInstallationsFilters =
  (setInstallationsFilters: Dispatch<SetStateAction<InstallationFilters>>, watch: UseFormWatch<InstallationFilters>) =>
  () => {
    const subscription = watch(debounce(setInstallationsFilters, 500))
    return () => subscription.unsubscribe()
  }

export const handleInstallIdConsumption =
  (setInstallIdConsumption: Dispatch<SetStateAction<string | null>>, installId?: string) => () => {
    if (installId) {
      setInstallIdConsumption(installId)
    }
  }

const DownloadCsv: FC<{ filters: InstallationFilters }> = ({ filters }) => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const getPage = async (
    page: number,
  ): Promise<{ page: number; items: InstallationModel[]; totalPageCount: number }> => {
    const query = new URLSearchParams({
      ...filters,
      pageSize: '100',
      pageNumber: page.toString(),
    })
    const result = await fetch(`${getPlatformApiUrl()}/marketplace/installations?${query.toString()}`, {
      headers: {
        Authorization: `Bearer ${connectSession?.accessToken}`,
        'api-version': 'latest',
      },
    })

    const body = await result.json()

    const items = body.data
    const totalPageCount = body.totalPageCount

    return {
      page: page + 1,
      items,
      totalPageCount,
    }
  }

  const handleDownloadCSVClick = async () => {
    const data: InstallationModel[] = []
    let page = 1
    let totalPageCount = 2

    setIsDownloading(true)

    do {
      const { items, page: newPage, totalPageCount: newTotalPageCount } = await getPage(page)
      items.forEach((item) => data.push(item))

      totalPageCount = newTotalPageCount
      page = newPage
    } while (page <= totalPageCount)

    setIsDownloading(false)

    const dataForDownload = data.map((row) => [
      row.customerName,
      row.appName,
      row.client,
      row.created,
      row.installedBy,
      row.terminatesOn,
      row.uninstalledBy,
    ])

    dataForDownload.unshift([
      'Customer Name',
      'App Name',
      'Client',
      'Created',
      'Installed By',
      'Terminates On',
      'Uninstalled By',
    ])

    const csv = dataForDownload
      .map((row) =>
        row
          .map(String)
          .map((value) => value.replaceAll('"', '""'))
          .map((value) => `"${value}"`)
          .join(','),
      )
      .join('\r\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const button = document.createElement('a')
    button.href = url
    button.setAttribute('download', 'installations.csv')
    button.click()
  }

  return (
    <div className={elMb11}>
      <ButtonGroup>
        <Button
          disabled={isDownloading}
          loading={isDownloading}
          type="button"
          intent="primary"
          onClick={() => handleDownloadCSVClick()}
        >
          Download CSV
        </Button>
      </ButtonGroup>
    </div>
  )
}

export const MarketplaceInstallations: FC = () => {
  const [installationsFilters, setInstallationsFilters] = useState<InstallationFilters>(defaultValues)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)

  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm<InstallationFilters>({
    mode: 'onChange',
    defaultValues,
  })

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const agencyCloudId = connectSession?.loginIdentity.agencyCloudId

  useEffect(handleSetInstallationsFilters(setInstallationsFilters, watch), [])

  const [installations, installationsLoading, , installationsRefresh] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: {
      ...formatFilters(installationsFilters),
      pageNumber,
      pageSize,
      clientId: agencyCloudId,
    },
    fetchWhenTrue: [agencyCloudId],
  })

  return (
    <FlexContainer>
      <MarketplaceSidebar />
      <PageContainer>
        <Title>Installations</Title>
        <form>
          <FormLayout className={elMb11}>
            <InputWrapFull>
              <SearchableMultiSelect
                id="app-ids-select"
                label="Search Apps"
                errorString={errors.appIds?.message ?? ''}
                defaultList={[]}
                currentValues={getValues().appIds?.split(',')?.filter(Boolean) ?? []}
                reapitConnectBrowserSession={reapitConnectBrowserSession}
                valueKey="id"
                nameKey="name"
                searchKey="appName"
                dataListKey="data"
                action={getActions[GetActionNames.getApps]}
                queryParams={{ pageSize: 100 }}
                noneSelectedLabel="No apps selected"
                {...register('appIds')}
              />
            </InputWrapFull>
            <InputWrap>
              <SearchableDropdown
                label="Office"
                id="office-search-box"
                {...register('officeName')}
                getResults={(name: string) => fetchOfficeList({ name }).then((offices) => offices?._embedded ?? [])}
                getResultLabel={(result) => `${result.name} -  ${result.name}`}
                getResultValue={(result) => result.name ?? ''}
                placeholder="Search Offices"
              />
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('installedDateFrom')} label="Installed Date From" type="date" />
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('installedDateTo')} label="Installed Date To" type="date" />
            </InputWrap>
            <InputWrap>
              <InputGroup>
                <Label>Status</Label>
                <ToggleRadio
                  {...register('isInstalled')}
                  hasGreyBg
                  options={[
                    {
                      id: 'option-is-active',
                      value: 'true',
                      text: 'Active',
                      isChecked: true,
                    },
                    {
                      id: 'option-is-terminated',
                      value: 'false',
                      text: 'Terminated',
                      isChecked: false,
                    },
                  ]}
                />
              </InputGroup>
            </InputWrap>
          </FormLayout>
        </form>
        {installationsLoading ? (
          <Loader />
        ) : (
          <>
            <DownloadCsv filters={installationsFilters} />
            <Table
              className={elMb11}
              rows={installations?.data?.map(
                ({
                  customerName,
                  client,
                  customerAddress,
                  created,
                  installedBy,
                  uninstalledBy,
                  terminatesOn,
                  appName,
                }) => ({
                  cells: [
                    {
                      label: 'Customer Name',
                      value: customerName,
                      icon: 'property',
                      cellHasDarkText: true,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'App Name',
                      value: appName,
                      icon: 'insights',
                      cellHasDarkText: true,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Reapit Customer Code',
                      value: client,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Customer Address',
                      value: combineAddress(customerAddress),
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Date Installed',
                      value: dayjs(created).format('DD-MM-YYYY'),
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Installed By',
                      value: installedBy,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Date Uninstalled',
                      value: terminatesOn ? dayjs(terminatesOn).format('DD-MM-YYYY') : '-',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Uninstalled By',
                      value: uninstalledBy ?? '-',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                  ],
                }),
              )}
            />
            <Pagination
              callback={setPageNumber}
              currentPage={pageNumber}
              numberPages={Math.ceil((installations?.totalCount ?? 1) / 12)}
            />
          </>
        )}
      </PageContainer>
    </FlexContainer>
  )
}

export default MarketplaceInstallations
