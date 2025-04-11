import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
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
  ToggleRadio,
} from '@reapit/elements'
import { useForm, UseFormWatch } from 'react-hook-form'
import dayjs from 'dayjs'
import { SearchableMultiSelect } from '@reapit/utils-react'
import { combineAddress } from '@reapit/utils-common'
import { GetActionNames, getActions, objectToQuery, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Statistics } from '../statistics'
import { fetchDevelopersList } from '../../services/developers'
import { fetchCustomersList } from '../../services/customers'
import { usePermissionsState } from '../../core/use-permissions-state'
import { ToggleConsumption } from './toggle-consumption'
import debounce from 'just-debounce-it'
import { UninstallModal } from './uninstall-modal'

export interface InstallationFilters {
  installedDateFrom?: string
  installedDateTo?: string
  appIds?: string
  isInstalled?: 'ALL' | 'INSTALLED' | 'UNINSTALLED'
  companyName?: string
  clientId?: string
  isChargedConsumption?: string
}

const defaultValues: InstallationFilters = {
  appIds: '',
  isInstalled: 'ALL',
}

export const formatFilters = (installationsFilters: InstallationFilters) => {
  const { installedDateTo, installedDateFrom, isInstalled, appIds, clientId, companyName, isChargedConsumption } =
    installationsFilters

  const isInstaledQuery =
    isInstalled === 'INSTALLED' ? { isInstalled: true } : isInstalled === 'UNINSTALLED' ? { isInstalled: true } : {}

  const appIdQuery = appIds ? { appId: appIds.split(',').filter(Boolean) } : {}
  const clientIdQuery = clientId ? { clientId } : {}
  const companyNameQuery = companyName ? { companyName } : {}

  return objectToQuery({
    installedDateTo: installedDateTo ? dayjs(installedDateTo).format('YYYY-MM-DDTHH:mm:ss') : undefined,
    installedDateFrom: installedDateFrom ? dayjs(installedDateFrom).format('YYYY-MM-DDTHH:mm:ss') : undefined,
    isChargedConsumption,
    ...isInstaledQuery,
    ...appIdQuery,
    ...clientIdQuery,
    ...companyNameQuery,
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

export const Installations: FC = () => {
  const [installationsFilters, setInstallationsFilters] = useState<InstallationFilters>(defaultValues)
  const { hasReadAccess } = usePermissionsState()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)
  const [installIdConsumption, setInstallIdConsumption] = useState<string | null>(null)
  const [selectedInstallation, setSelectedInstallation] = useState<
    { appId: string; installationId: string } | { appId: undefined; installationId: undefined }
  >({
    appId: undefined,
    installationId: undefined,
  })

  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm<InstallationFilters>({
    mode: 'onChange',
    defaultValues,
  })

  useEffect(handleSetInstallationsFilters(setInstallationsFilters, watch), [])

  const [installations, installationsLoading, , installationsRefresh] =
    useReapitGet<Marketplace.InstallationModelPagedResult>({
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
              label="Company"
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
            <SearchableDropdown
              label="Client"
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
          <InputWrap>
            <InputGroup>
              <Label>Is Charged Consumption</Label>
              <ToggleRadio
                {...register('isChargedConsumption')}
                hasGreyBg
                options={[
                  {
                    id: 'option-consumption-all',
                    value: '',
                    text: 'All',
                    isChecked: true,
                  },
                  {
                    id: 'option-consumption-true',
                    value: 'true',
                    text: 'Charged',
                    isChecked: false,
                  },
                  {
                    id: 'option-consumption-false',
                    value: 'false',
                    text: 'Free',
                    isChecked: false,
                  },
                ]}
              />
            </InputGroup>
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
                appId,
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
                        <Button
                          onClick={() =>
                            setSelectedInstallation({
                              installationId: id as string,
                              appId: appId as string,
                            })
                          }
                          disabled={uninstalledBy !== null && uninstalledBy !== ''}
                          intent="danger"
                        >
                          Uninstall
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
      <UninstallModal
        appId={selectedInstallation.appId}
        installationId={selectedInstallation.installationId}
        onClose={() =>
          setSelectedInstallation({
            appId: undefined,
            installationId: undefined,
          })
        }
        installationRefresh={installationsRefresh}
      />
    </PageContainer>
  )
}

export default Installations
