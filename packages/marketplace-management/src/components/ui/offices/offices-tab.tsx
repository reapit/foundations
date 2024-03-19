import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation, NavigateFunction } from 'react-router'
import { OfficeModelPagedResult, OfficeModel } from '@reapit/foundations-ts-definitions'
import { cleanObject, DATE_TIME_FORMAT, setQueryParams, toLocalTime } from '@reapit/utils-common'
import { combineAddress } from '@reapit/utils-common'
import Routes from '../../../constants/routes'
import OfficesFilterForm, { OfficesFormSchema } from '../../../components/ui/offices/offices-tab-filter'
import {
  elFadeIn,
  Loader,
  Pagination,
  RowProps,
  Title,
  Table,
  elMb11,
  PersistentNotification,
  Button,
  ButtonGroup,
  FlexContainer,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { isEmptyObject } from '@reapit/utils-react'
import { cx } from '@linaria/core'
import { useOrgId } from '../../../utils/use-org-id'
import { getOfficesService } from '../../../services/office'
import { OrgIdSelect } from '../../hocs/org-id-select'
import ErrorBoundary from '../../error-boundary'

export const buildFilterValues = (queryParams: URLSearchParams): OfficesFormSchema => {
  const name = queryParams.get('name') || []
  return { name } as OfficesFormSchema
}

export const onPageChangeHandler = (navigate: NavigateFunction, queryParams: OfficesFormSchema) => (page: number) => {
  const query = setQueryParams(queryParams)
  let queryString = `?pageNumber=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return navigate(`${Routes.OFFICES}${queryString}`)
}

export const onSearchHandler = (navigate: NavigateFunction) => (queryParams: OfficesFormSchema) => {
  const cleanedValues = cleanObject(queryParams)

  if (isEmptyObject(cleanedValues)) {
    navigate(`${Routes.OFFICES}`)
    return
  }

  const query = setQueryParams(cleanedValues)
  if (query && query !== '') {
    const queryString = `?page=1&${query}`
    navigate(`${Routes.OFFICES}${queryString}`)
  }
}

export const handleSortTableData = (offices: OfficeModel[]) => (): RowProps[] => {
  return offices.map((office: OfficeModel) => ({
    cells: [
      {
        label: 'Office ID',
        value: office.id,
        narrowTable: {
          showLabel: false,
        },
      },
      {
        label: 'Office Name',
        value: office.name ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Address',
        value: combineAddress(office.address),
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Last Updated',
        value: toLocalTime(office.modified ?? office.created, DATE_TIME_FORMAT.DATE_TIME_FORMAT),
        narrowTable: {
          showLabel: true,
        },
      },
    ],
  }))
}

export const handleFetchOffices =
  (
    setOfficesResponse: Dispatch<SetStateAction<OfficeModelPagedResult | undefined>>,
    setOfficesLoading: Dispatch<SetStateAction<boolean>>,
    search: string,
    orgClientId: string | null,
  ) =>
  () => {
    const fetchOffices = async () => {
      if (!orgClientId) return
      setOfficesLoading(true)
      const fetchedOffices = await getOfficesService(search, orgClientId)
      if (fetchedOffices) {
        setOfficesResponse(fetchedOffices)
      }
      setOfficesLoading(false)
    }

    fetchOffices().catch((error) => console.error(error))
  }

const OfficesTab: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
  const search = location.search
  const queryParams = new URLSearchParams(search)
  const filterValues = buildFilterValues(queryParams)
  const onSearch = useCallback(onSearchHandler(navigate), [navigate])
  const onPageChange = useCallback(onPageChangeHandler(navigate, filterValues), [navigate, filterValues])
  const [officesResponse, setOfficesResponse] = useState<OfficeModelPagedResult>()
  const [officesLoading, setOfficesLoading] = useState<boolean>(false)
  const {
    orgIdState: { orgName, orgClientId },
  } = useOrgId()

  useEffect(handleFetchOffices(setOfficesResponse, setOfficesLoading, search, orgClientId), [
    setOfficesResponse,
    search,
    setOfficesLoading,
    orgClientId,
  ])

  const offices = officesResponse?._embedded ?? []
  const totalPageCount = officesResponse?.totalPageCount ?? 0
  const pageNumber = officesResponse?.pageNumber ?? 0

  const rows = useMemo(handleSortTableData(offices), [offices])

  return (
    <ErrorBoundary>
      <FlexContainer isFlexJustifyBetween>
        {!orgName ? <Title>Offices</Title> : <Title>{orgName} Offices</Title>}
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={openModal}>
              Select Org
            </Button>
            <Modal title="Select Organisation">
              <OrgIdSelect />
              <ButtonGroup alignment="center">
                <Button intent="primary" onClick={closeModal}>
                  Close
                </Button>
              </ButtonGroup>
            </Modal>
          </ButtonGroup>
        )}
      </FlexContainer>
      <OfficesFilterForm filterValues={filterValues} onSearch={onSearch} />
      {officesLoading ? (
        <Loader />
      ) : offices.length && orgClientId ? (
        <>
          <Table className={cx(elFadeIn, elMb11)} rows={rows} />
          <Pagination callback={onPageChange} numberPages={totalPageCount} currentPage={pageNumber} />
        </>
      ) : orgClientId ? (
        <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
          No results found for your office search
        </PersistentNotification>
      ) : (
        <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
          No organisation selected. You need to select an organisation to view offices.
        </PersistentNotification>
      )}
    </ErrorBoundary>
  )
}

export default OfficesTab
