import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { UserModelPagedResult, UserModel } from '@reapit/foundations-ts-definitions'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Pagination, Table, Loader, Section, Alert, Formik, Form } from '@reapit/elements'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { tabTopContent, tableTitle } from '../__styles__'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.USERS}${queryString}`)
}

const UsersTab: React.FC = () => {
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

  const UserGroupCell = ({ cell: { value } }) => (
    <span>
      {value.map((group: string) => (
        <div key={group}>{group}</div>
      ))}
    </span>
  )

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'User Groups', accessor: 'groups', Cell: UserGroupCell },
    { Header: 'Edit', Cell: <div>Edit</div> },
  ]

  return (
    <ErrorBoundary>
      <div className={tabTopContent}>
        <p>
          Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web
          designs.
        </p>
        <div className={tableTitle}>Existing users</div>
      </div>
      {!data ? <Loader /> : <UsersContent data={data} columns={columns} onPageChange={onPageChange} />}
    </ErrorBoundary>
  )
}

const UsersContent: React.FC<{
  data: UserModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ data, columns, onPageChange }) => {
  const { _embedded: listUser, totalCount, pageSize, pageNumber = 1 } = data
  return (
    <>
      {renderResult(columns, listUser)}
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}

export const renderResult = (columns: any[], listUser?: UserModel[]) => {
  if (listUser?.length === 0) {
    return <Alert message="No Results " type="info" />
  }

  return (
    <Formik initialValues={{ selectedGroup: [] }} onSubmit={values => console.log(values)}>
      <Form>
        <Section>
          <Table expandable scrollable={true} data={listUser || []} columns={columns} />
        </Section>
      </Form>
    </Formik>
  )
}

export default UsersTab
