import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
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
  ButtonGroup,
  Button,
} from '@reapit/elements'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { SearchableMultiSelect } from '@reapit/utils-react'
import { combineAddress } from '@reapit/utils-common'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Statistics } from '../statistics'
import { fetchDevelopersList } from '../../services/developers'
import { fetchCustomersList } from '../../services/customers'
import { usePermissionsState } from '../../core/use-permissions-state'
import { ToggleConsumption } from './toggle-consumption'

export interface InstallationFilters {
  installedDateFrom?: string
  installedDateTo?: string
  appIds: string
  isInstalled: 'ALL' | 'INSTALLED' | 'UNINSTALLED'
  companyName?: string
  clientId?: string
}

const defaultValues: InstallationFilters = {
  appIds: '',
  isInstalled: 'ALL',
}

export const formatFilters = (installationsFilters: InstallationFilters) => {
  const { installedDateTo, installedDateFrom, isInstalled, appIds, clientId, companyName } = installationsFilters

  const isInstaledQuery =
    isInstalled === 'INSTALLED' ? { isInstalled: true } : isInstalled === 'UNINSTALLED' ? { isInstalled: true } : {}

  const appIdQuery = appIds ? { appId: appIds.split(',').filter(Boolean) } : {}
  const clientIdQuery = clientId ? { clientId } : {}
  const companyNameQuery = companyName ? { companyName } : {}

  return {
    installedDateTo: installedDateTo ? dayjs(installedDateTo).format('YYYY-MM-DDTHH:mm:ss') : undefined,
    installedDateFrom: installedDateFrom ? dayjs(installedDateFrom).format('YYYY-MM-DDTHH:mm:ss') : undefined,
    ...isInstaledQuery,
    ...appIdQuery,
    ...clientIdQuery,
    ...companyNameQuery,
  }
}

export const handleInstallIdConsumption =
  (setInstallIdConsumption: Dispatch<SetStateAction<string | null>>, installId?: string) => () => {
    if (installId) {
      setInstallIdConsumption(installId)
    }
  }

export const Installations: FC = () => {
  const [installationsFilters, setInstallationsFilters] = useState<InstallationFilters>(defaultValues)
  const { hasReadAccess } = usePermissionsState()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [installIdConsumption, setInstallIdConsumption] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InstallationFilters>({
    mode: 'onChange',
    defaultValues,
  })

  const [installations, installationsLoading, , installationsRefresh] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: {
      ...formatFilters(installationsFilters),
      includeOfficeGroups: true,
      pageNumber,
      pageSize,
    },
  })

  return (
    <PageContainer>
      <Title>Installations</Title>
      <form onChange={handleSubmit(setInstallationsFilters)}>
        <FormLayout className={elMb11}>
          <InputWrapFull>
            <SearchableMultiSelect
              id="app-ids-select"
              label="Search Apps"
              errorString={errors.appIds?.message ?? ''}
              defaultList={[]}
              currentValues={getValues().appIds?.split(',')?.filter(Boolean)}
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
            <Label>Company</Label>
            <SearchableDropdown
              id="developer-search-box"
              {...register('companyName')}
              getResults={(company: string) =>
                fetchDevelopersList({ company, status: 'confirmed' }).then((developers) => developers?.data ?? [])
              }
              getResultLabel={(result) => `${result.company} -  ${result.name}`}
              getResultValue={(result) => result.company ?? ''}
              placeholder="Search developer organisations"
            />
          </InputWrap>
          <InputWrap>
            <Label>Client</Label>
            <SearchableDropdown
              id="client-search-box"
              {...register('clientId')}
              getResults={(name: string) => fetchCustomersList({ name }).then((customers) => customers?.data ?? [])}
              getResultLabel={(result) => result.name ?? ''}
              getResultValue={(result) => result.agencyCloudId ?? ''}
              placeholder="Search customers"
            />
          </InputWrap>
          <InputWrap>
            <InputGroup {...register('installedDateFrom')} label="Installed Date From" type="date" />
          </InputWrap>
          <InputWrap>
            <InputGroup {...register('installedDateTo')} label="Installed Date To" type="date" />
          </InputWrap>
        </FormLayout>
      </form>
      <Statistics area="INSTALLATIONS" data={installations} setPageSize={setPageSize} />
      {installationsLoading ? (
        <Loader />
      ) : (
        <>
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
                id,
              }) => ({
                cells: [
                  {
                    label: 'Customer Name',
                    value: customerName,
                    icon: 'flatInfographic',
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'App Name',
                    value: appName,
                    icon: 'appInfographic',
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
                expandableContent: {
                  content: (
                    <>
                      <ButtonGroup alignment="center">
                        <Button
                          intent="primary"
                          disabled={hasReadAccess}
                          onClick={handleInstallIdConsumption(setInstallIdConsumption, id)}
                        >
                          Togggle API Consumption
                        </Button>
                      </ButtonGroup>
                      {installIdConsumption && installIdConsumption === id && (
                        <ToggleConsumption
                          installIdConsumption={installIdConsumption}
                          installations={installations}
                          installationsRefresh={installationsRefresh}
                        />
                      )}
                    </>
                  ),
                },
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
  )
}

export default Installations
