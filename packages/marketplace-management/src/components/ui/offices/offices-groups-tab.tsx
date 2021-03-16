import React, { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { OfficeGroupModelPagedResult, OfficeGroupModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Pagination, Table, Loader, FadeIn, Helper, toLocalTime, DATE_TIME_FORMAT, Button, H5 } from '@reapit/elements'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import OfficeListCell from './office-list-cell'
import CreateOfficeGroupModal from './create-office-group'
import EditOfficeGroupModal from './edit-office-group'
import { orgIdEffectHandler } from '../../../utils/org-id-effect-handler'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.OFFICES_GROUPS}${queryString}`)
}

const OfficesGroupsTab: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(history), [history])

  const [isOpenCreateGroupModal, setOpenCreateGroupModal] = useState<boolean>(false)
  const [editingGroup, setEditingGroup] = useState<OfficeGroupModel>()
  const [orgId, setOrgId] = useState<string | null>(null)
  const onOpenCreateModel = () => setOpenCreateGroupModal(true)

  useEffect(orgIdEffectHandler(orgId, setOrgId), [])

  const { data: officeGroups, mutate } = useSWR<OfficeGroupModelPagedResult>(
    !orgId
      ? null
      : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}${search ? search + '&pageSize=12' : '?pageSize=12'}`,
  )

  const LastUpdatedCell = ({
    cell: {
      row: { original },
    },
  }) => <p>{toLocalTime(original.modified || original.created, DATE_TIME_FORMAT.DATE_TIME_FORMAT)}</p>

  const EditButton = ({
    cell: {
      row: { original },
    },
  }) => (
    <Button type="button" variant="primary" onClick={() => setEditingGroup(original)}>
      Edit
    </Button>
  )

  const columns = [
    { Header: 'Group Name', accessor: 'name' },
    { Header: 'Office List', accessor: 'officeIds', Cell: OfficeListCell },
    { Header: 'Last Updated', Cell: LastUpdatedCell },
    { Header: 'Edit', Cell: EditButton },
  ]

  return (
    <ErrorBoundary>
      <div className="flex justify-between items-center mb-4">
        <H5 className="mb-0">Office groups</H5>
        <Button onClick={onOpenCreateModel}>Create office group</Button>
      </div>
      <p className="mb-4">
        The list below will show you any ‘Office Groups’ that have been created for your Organisation. To create a new
        office group, please click on ‘Create New Office Group’. To add or edit an existing office group, please use
        ‘Edit’ on the associated group.
      </p>
      {orgId && (
        <>
          <CreateOfficeGroupModal
            visible={isOpenCreateGroupModal}
            setOpenCreateGroupModal={setOpenCreateGroupModal}
            orgId={orgId}
            onRefetchData={mutate}
          />
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
        <OfficeGroupsContent officeGroups={officeGroups} columns={columns} onPageChange={onPageChange} />
      )}
    </ErrorBoundary>
  )
}

export const OfficeGroupsContent: React.FC<{
  officeGroups: OfficeGroupModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ officeGroups, columns, onPageChange }) => {
  const { _embedded: listGroup, totalCount, pageSize, pageNumber = 1 } = officeGroups
  return (
    <>
      {renderResult(columns, listGroup)}
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}

export const renderResult = (columns: any[], listGroup?: OfficeGroupModel[]) => {
  if (listGroup?.length === 0) {
    return (
      <FadeIn>
        <Helper variant="info">No Results</Helper>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <Table expandable scrollable={true} data={listGroup || []} columns={columns} />
    </FadeIn>
  )
}

export default OfficesGroupsTab
