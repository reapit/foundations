import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { GroupModelPagedResult, GroupModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Pagination, Table, Loader, Section, FadeIn, Helper, Formik, Form } from '@reapit/elements'
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

  const { data }: any = useSWR(`${URLS.USERS}/${search ? search + '&pageSize=12' : '?pageSize=12'}`)

  const columns = [
    { Header: 'Group Name', accessor: 'id' },
    { Header: 'Members', accessor: '' },
    { Header: 'Manage', Cell: <div>Manage</div> },
  ]

  return (
    <ErrorBoundary>
      <div className={tabTopContent}>
        <p>
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web
          designs.
        </p>
        <div className={tableTitle}>Existing user groups</div>
      </div>
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
      {renderResult(columns, listGroup)}
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
    <Formik initialValues={{ selectedGroup: [] }} onSubmit={values => console.log(values)}>
      <Form>
        <Section>
          <Table expandable scrollable={true} data={listGroup || []} columns={columns} />
        </Section>
      </Form>
    </Formik>
  )
}

export default UserGroupsTab
