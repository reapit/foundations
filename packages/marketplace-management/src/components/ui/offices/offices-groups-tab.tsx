import React, { useState, useEffect, useCallback, FC, useMemo } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { OfficeGroupModelPagedResult, OfficeGroupModel, OfficeGroupModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Loader, toLocalTime, DATE_TIME_FORMAT } from '@reapit/elements-legacy'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import EditOfficeGroupModal from './office-group-edit-form'
import { orgIdEffectHandler } from '../../../utils/org-id-effect-handler'
import { OfficeGroupsContent } from './office-groups-content'
import { RowProps, Table, Title } from '@reapit/elements'
import { OfficeModel } from '@reapit/foundations-ts-definitions'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.OFFICES_GROUPS}${queryString}`)
}

export const handleSortTableData = (offices: OfficeModel[], officeGroups: OfficeGroupModel[]) => (): RowProps[] => {
  return officeGroups.map((officeGroup: OfficeGroupModel) => ({
    cells: [
      {
        label: 'Group Name',
        value: officeGroup.name ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Office List',
        value: officeGroup.officeIds
          ?.split('')
          .map(({ name }: OfficeModel) => name)
          .join(' '),
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
    expandableContent: {
      content: 'Edit form here',
    },
  }))
}

const OfficesGroupsTab: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const [editingGroup, setEditingGroup] = useState<OfficeGroupModel>()
  const [orgId, setOrgId] = useState<string | null>(null)
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)

  useEffect(orgIdEffectHandler(orgId, setOrgId), [])

  const { data, mutate } = useSWR<OfficeGroupModelPagedResult>(
    !orgId
      ? null
      : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}${search ? search + '&pageSize=12' : '?pageSize=12'}`,
  )

  const officeGroups = data?._embedded ?? []

  const rows = useMemo(handleSortTableData(offices, officeGroups), [offices, officeGroups])

  return (
    <ErrorBoundary>
      <Title>Office Groups</Title>
      {orgId && (
        <>
          <EditOfficeGroupModal
            setEditingGroup={setEditingGroup}
            orgId={orgId}
            editingGroup={editingGroup}
            onRefetchData={mutate}
          />
        </>
      )}

      {!officeGroups ? (
        <Loader />
      ) : (
        <Table rows={rows} indexExpandedRow={indexExpandedRow} setIndexExpandedRow={setIndexExpandedRow} />
      )}
    </ErrorBoundary>
  )
}

export default OfficesGroupsTab
