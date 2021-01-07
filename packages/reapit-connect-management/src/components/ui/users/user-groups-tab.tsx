import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { GroupModelPagedResult, GroupModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Pagination, Table, Loader, Section, FadeIn, Helper, H5, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { tabTopContent, tableTitle } from '../__styles__'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.USERS_GROUPS}${queryString}`)
}

const UserGroupsTab: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const onPageChange = React.useCallback(onPageChangeHandler(history), [history])

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

  const { data }: any = useSWR(`${URLS.USERS_GROUPS}/${search ? search + '&pageSize=12' : '?pageSize=12'}`)

  const ManageButton = ({
    cell: {
      row: { original },
    },
  }) => (
    <Button type="button" variant="info" onClick={() => original}>
      Manage
    </Button>
  )

  const columns = [
    { Header: 'Group Name', accessor: 'id' },
    { Header: 'Members', accessor: '' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Manage', Cell: ManageButton },
  ]

  return (
    <ErrorBoundary>
      <Section>
        <div className={tabTopContent}>
          <H5 className={tableTitle}>User groups</H5>
          <p className="helper-text">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web
            designs.
          </p>
        </div>
      </Section>
      {!data ? <Loader /> : <UserGroupsContent data={data} columns={columns} onPageChange={onPageChange} />}
    </ErrorBoundary>
  )
}

export const UserGroupsContent: React.FC<{
  data: GroupModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ data, columns, onPageChange }) => {
  const { _embedded: listGroup, totalCount, pageSize, pageNumber = 1 } = data
  return (
    <>
      <Section>{renderResult(columns, listGroup)}</Section>
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}

export const renderResult = (columns: any[], listGroup?: GroupModel[]) => {
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

export default UserGroupsTab
