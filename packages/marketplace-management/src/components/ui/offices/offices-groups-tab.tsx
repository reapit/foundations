import React, { useState, useCallback, FC, useMemo, Dispatch, SetStateAction, useEffect } from 'react'
import useSWR from 'swr'
import { useNavigate, useLocation, NavigateFunction } from 'react-router'
import { OfficeGroupModelPagedResult, OfficeGroupModel } from '@reapit/foundations-ts-definitions'
import {
  Button,
  ButtonGroup,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrap,
  Loader,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { toLocalTime, DATE_TIME_FORMAT } from '@reapit/utils-common'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import EditOfficeGroupForm from './office-group-edit-form'
import { elFadeIn, elMb11, Pagination, PersistentNotification, RowProps, Table, Title } from '@reapit/elements'
import { OfficeModel, OfficeModelPagedResult } from '@reapit/foundations-ts-definitions'
import { cx } from '@linaria/core'
import { useOrgId } from '../../../utils/use-org-id'
import { OrgIdSelect } from '../../hocs/org-id-select'
import { fetcherWithClientCode } from '../../../utils/fetcher'
import debounce from 'just-debounce-it'
import { useForm } from 'react-hook-form'
import qs from 'qs'
import ErrorBoundary from '../../error-boundary'

export interface OfficeGroupFilters {
  name?: string
  pageNumber?: string
  pageSize?: string
  customerId?: string
}

export interface OfficeGroupWithOfficesModel extends OfficeGroupModel {
  offices?: OfficeModel[]
}

export const onPageChangeHandler =
  (setOfficeGroupFilters: Dispatch<SetStateAction<OfficeGroupFilters>>) => (page: number) => {
    setOfficeGroupFilters((currentFilters) => ({
      ...currentFilters,
      pageNumber: String(page),
    }))
  }

export const onFilterChangeHandler = (navigate: NavigateFunction, officeGroupFilters: OfficeGroupFilters) => () => {
  const queryString = qs.stringify(officeGroupFilters)
  return navigate(`${Routes.OFFICES_GROUPS}?${queryString}`)
}

export const mergeOfficesGroups = (officeModels: OfficeModel[], officeGroupModels: OfficeGroupModel[]) =>
  officeGroupModels.map((group) => {
    const groupIds = group.officeIds?.split(',')
    if (groupIds?.length) {
      const officeModelsMatched = groupIds
        .map((groupId) => officeModels.find((office) => office.id === groupId))
        .filter((office) => !!office)
      return {
        ...group,
        offices: officeModelsMatched,
      }
    }
  }) as OfficeGroupWithOfficesModel[]

export const getOfficeQueryFromGroups = (officeGroupModels?: OfficeGroupModel[]): string => {
  if (!officeGroupModels) return ''
  const officeIds = officeGroupModels
    ?.map((group) => {
      const ids = group?.officeIds?.split(',')
      if (ids?.length) return ids
    })
    .flat()
  return (
    officeIds?.reduce((query, id, index) => {
      return `${query}${index ? '&id' : 'id'}=${id}`
    }, '') ?? ''
  )
}

export const handleSortTableData =
  (officeGroups: OfficeGroupWithOfficesModel[], offices: OfficeModel[], onComplete: () => void) => (): RowProps[] => {
    return officeGroups.map((officeGroup: OfficeGroupWithOfficesModel) => ({
      cells: [
        {
          label: 'Group Name',
          value: officeGroup.name ?? '',
          narrowTable: {
            showLabel: true,
          },
        },
        {
          label: 'Office Group Id',
          value: officeGroup.customerId ?? '',
          narrowTable: {
            showLabel: true,
          },
        },
        {
          label: 'Office List',
          value: officeGroup.offices?.map((office) => office.name).join(', ') ?? '',
          narrowTable: {
            showLabel: true,
          },
        },
        {
          label: 'Last Updated',
          value: toLocalTime(officeGroup.modified ?? officeGroup.created, DATE_TIME_FORMAT.DATE_TIME_FORMAT),
          narrowTable: {
            showLabel: true,
          },
        },
      ],
      expandableContent: {
        content: <EditOfficeGroupForm offices={offices} officeGroup={officeGroup} onComplete={onComplete} />,
      },
    }))
  }

const OfficesGroupsTab: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
  const [officeGroupFilters, setOfficeGroupFilters] = useState<OfficeGroupFilters>({ pageSize: '12' })
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(setOfficeGroupFilters), [history])
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const {
    orgIdState: { orgId, orgName, orgClientId },
  } = useOrgId()

  const { data, mutate } = useSWR<OfficeGroupModelPagedResult>(
    !orgId || !search ? null : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}${search}`,
  )

  const officeGroups = data?._embedded ?? []
  const totalPageCount = data?.totalPageCount ?? 0
  const pageNumber = data?.pageNumber ?? 0

  const officeIdsQuery = getOfficeQueryFromGroups(officeGroups)

  const { data: officesResponse } = useSWR<OfficeModelPagedResult>(
    !orgClientId || !officeIdsQuery
      ? null
      : `${URLS.OFFICES}/?${
          officeIdsQuery ? getOfficeQueryFromGroups(officeGroups) + '&pageSize=500' : 'pageSize=500'
        }`,
    fetcherWithClientCode(orgClientId as string),
  )

  const offices = officesResponse?._embedded ?? []

  const groupsWithOffices: OfficeGroupWithOfficesModel[] =
    officeGroups.length && offices?.length ? mergeOfficesGroups(offices, officeGroups) : officeGroups

  const onComplete = () => {
    // Set timeout as a workaround for RDS replication error.
    setTimeout(() => {
      mutate()
    }, 1000)
    setIndexExpandedRow(null)
  }

  const { register, handleSubmit } = useForm<OfficeGroupFilters>({
    mode: 'onChange',
  })

  useEffect(onFilterChangeHandler(navigate, officeGroupFilters), [officeGroupFilters])

  const rows = useMemo(handleSortTableData(groupsWithOffices, offices, onComplete), [groupsWithOffices, offices])

  return (
    <ErrorBoundary>
      <FlexContainer isFlexJustifyBetween>
        {!orgName ? <Title>Office Groups</Title> : <Title>{orgName} Office Groups</Title>}
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
      {orgId && (
        <form onChange={handleSubmit(debounce(setOfficeGroupFilters, 500))}>
          <FormLayout className={elMb11}>
            <InputWrap>
              <InputGroup {...register('name')} label="Office Group Name" type="search" />
            </InputWrap>
            <InputWrap>
              <InputGroup {...register('customerId')} label="Office Group Id" type="search" />
            </InputWrap>
          </FormLayout>
        </form>
      )}
      {!data && orgId ? (
        <Loader />
      ) : officeGroups.length && orgId ? (
        <>
          <Table
            className={cx(elFadeIn, elMb11)}
            rows={rows}
            indexExpandedRow={indexExpandedRow}
            setIndexExpandedRow={setIndexExpandedRow}
          />
          <Pagination callback={onPageChange} numberPages={totalPageCount} currentPage={pageNumber} />
        </>
      ) : orgId ? (
        <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
          No results found for your office groups search
        </PersistentNotification>
      ) : (
        <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
          No organisation selected. You need to select an organisation to view ofice groups.
        </PersistentNotification>
      )}
    </ErrorBoundary>
  )
}

export default OfficesGroupsTab
