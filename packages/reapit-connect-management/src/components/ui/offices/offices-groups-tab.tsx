import React, { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { OfficeGroupModelPagedResult, OfficeGroupModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Loader,
  Section,
  FadeIn,
  Helper,
  toLocalTime,
  DATE_TIME_FORMAT,
  Button,
  H5,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import OfficeListCell from './office-list-cell'
import { tabTopContent, tableTitle } from '../__styles__'
import CreateOfficeGroupModal from './create-office-group'
import EditOfficeGroupModal from './edit-office-group'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.OFFICES_GROUPS}${queryString}`)
}

const OfficesGroupsTab: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(history), [history])

  const [isOpenCreateGroupModal, setOpenCreateGroupModal] = React.useState<boolean>(false)
  const onOpenCreateModel = () => setOpenCreateGroupModal(true)
  const [editingGroup, setEditingGroup] = useState<OfficeGroupModel>()

  const [orgId, setOrgId] = useState<string | null>(null)
  useEffect(() => {
    if (!orgId) {
      getOrgId()
    }
  }, [])

  const getOrgId = async () => {
    const session = await reapitConnectBrowserSession.connectSession()
    if (!session) throw new Error('No Reapit Connect Session is present')

    setOrgId(session.loginIdentity.orgId)
  }

  const { data, mutate }: any = useSWR(
    !orgId
      ? null
      : `${URLS.ORGANISATIONS}/${orgId}${URLS.OFFICES_GROUPS}/${search ? search + '&pageSize=12' : '?pageSize=12'}`,
  )
  const onRefetchData = React.useCallback(mutate(), [])

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
    <Button type="button" variant="info" onClick={() => setEditingGroup(original)}>
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
      <Section>
        <div className={tabTopContent}>
          <div className={tableTitle}>
            <H5>Office groups</H5>
            <Button onClick={onOpenCreateModel}>Create office group</Button>
          </div>
          <p className="hepler-text">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web
            designs.
          </p>
          {orgId && (
            <>
              <CreateOfficeGroupModal
                visible={isOpenCreateGroupModal}
                setOpenCreateGroupModal={setOpenCreateGroupModal}
                orgId={orgId}
                onRefetchData={onRefetchData}
              />
              <EditOfficeGroupModal
                setEditingGroup={setEditingGroup}
                orgId={orgId}
                editingGroup={editingGroup}
                onRefetchData={onRefetchData}
              />
            </>
          )}
        </div>
      </Section>
      {!data ? <Loader /> : <OfficeGroupsContent data={data} columns={columns} onPageChange={onPageChange} />}
    </ErrorBoundary>
  )
}

export const OfficeGroupsContent: React.FC<{
  data: OfficeGroupModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ data, columns, onPageChange }) => {
  const { _embedded: listGroup, totalCount, pageSize, pageNumber = 1 } = data
  return (
    <>
      <Section>{renderResult(columns, listGroup)}</Section>
      <Section>
        <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
      </Section>
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
