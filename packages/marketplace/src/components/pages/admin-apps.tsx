import React from 'react'
import { connect } from 'react-redux'
import qs from 'query-string'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import {
  Loader,
  Pagination,
  Table,
  Button,
  Alert,
  Input,
  H3,
  Grid,
  GridItem,
  Formik,
  Form,
  FormSection,
  FormHeading,
  FormSubHeading,
  Content,
  FlexContainerBasic,
} from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { AdminAppsState } from '@/reducers/admin-apps'
import styles from '@/styles/pages/admin-apps.scss?mod'
import { selectAdminAppsState } from '@/selector/admin'
import { Dispatch, compose } from 'redux'
import { adminAppsRequestFeatured, AdminAppsFeaturedParams } from '@/actions/admin-apps'
import AppDeleteModal from '../ui/app-delete'
import { addQuery } from '@/utils/client-url-params'

export const generateColumns = ({ onChangeFeatured, setDeleteModal, deleteModal }) => () => {
  const FeaturedCell = ({ row, cell }) => {
    const { id } = row.original
    const { value } = cell
    return (
      <div className="field field-checkbox">
        <input
          className="checkbox"
          type="checkbox"
          id={id}
          name={id}
          checked={value}
          onChange={evt => onChangeFeatured({ id, isFeatured: evt.target.checked })}
        />
        <label className="label" htmlFor={id}></label>
      </div>
    )
  }
  const DeleteCell = ({ row }) => (
    <Button
      type="button"
      variant="danger"
      onClick={() =>
        setDeleteModal({ ...deleteModal, visible: true, appId: row.original.id, appName: row.original.name })
      }
    >
      Delete
    </Button>
  )
  return [
    {
      Header: 'AppID',
      accessor: 'id',
    },
    {
      Header: 'App Name',
      accessor: 'name',
    },
    {
      Header: 'App Summary',
      accessor: 'summary',
    },
    {
      Header: 'Developer Name',
      accessor: 'developer',
    },
    {
      Header: 'Is Listed',
      accessor: 'isListed',
    },
    {
      Header: 'Pending Revisions',
      accessor: 'pendingRevisions',
    },
    {
      Header: 'Direct API',
      accessor: 'isDirectApi',
    },
    {
      Header: 'Featured',
      accessor: 'isFeatured',
      Cell: FeaturedCell,
    },
    {
      id: 'Delete',
      Cell: DeleteCell,
    },
  ]
}

export const refreshForm = (onSubmit, resetForm) => () => {
  resetForm()
  onSubmit({ appName: '', companyName: '', developerName: '' })
}

export const renderForm = onSubmit => ({ values, resetForm }) => {
  const disabled = !values.appName && !values.companyName && !values.developerName
  return (
    <Form>
      <FormSection>
        <Content className={styles.contentBlock}>
          <FormHeading>Admin Apps Filter Form</FormHeading>
          <FormSubHeading>Filter the result by App, Developer and Company</FormSubHeading>
          <Grid>
            <GridItem>
              <Input type="text" name="appName" id="appName" labelText="App Name" />
            </GridItem>
            <GridItem>
              <Input type="text" name="developerName" id="developerName" labelText="Developer Name" />
            </GridItem>
            <GridItem>
              <Input type="text" name="companyName" id="companyName" labelText="Company Name" />
            </GridItem>
            <GridItem className={styles.filterButton}>
              <Button type="submit" variant="primary" disabled={disabled}>
                Search
              </Button>
              <Button type="button" variant="primary" onClick={refreshForm(onSubmit, resetForm)}>
                Refresh
              </Button>
            </GridItem>
          </Grid>
        </Content>
      </FormSection>
    </Form>
  )
}

export const handleCloseAppDeleteModal = ({ setDeleteModal }) => () => {
  setDeleteModal({ visible: false, appId: '', appName: '' })
}

export type FormValues = {
  appName: string
  companyName: string
  developerName: string
}

export const handleOnSubmit = (history, pageNumber: number) => (formValues: FormValues) => {
  const submitValues = Object.keys(formValues).reduce((newObj, key) => {
    const value = formValues[key]
    if (value) {
      newObj[key] = value
    }
    return newObj
  }, {})
  const queryString = qs.stringify({ ...submitValues, pageNumber })
  history.push(`apps?${queryString}`)
}

export const handleChangePageNumber = history => (pageNumber: number) => {
  history.push(addQuery({ pageNumber }))
}

export type AdminAppsProps = DispatchProps & StateProps

export const AdminApps: React.FunctionComponent<AdminAppsProps> = ({
  adminAppsState,
  onChangeFeatured,
  history,
  location,
}) => {
  const queryParams = qs.parse(location.search) as any
  const pageNumber = parseInt(queryParams.pageNumber, 10) || 1
  const unfetched = !adminAppsState.adminAppsData
  const { loading } = adminAppsState
  const { data = [], totalCount, pageSize } = adminAppsState.adminAppsData || {}
  const [deleteModal, setDeleteModal] = React.useState({ visible: false, appId: '', appName: '', developerName: '' })
  const columns = React.useMemo(generateColumns({ onChangeFeatured, setDeleteModal, deleteModal }), [data])

  if (unfetched) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn hasBackground data-test="revision-list-container">
        {loading && (
          <div className="pin absolute flex items-center justify-center">
            <Loader />
          </div>
        )}
        <div className="mb-5">
          <H3>App Management</H3>
          <Formik initialValues={queryParams} onSubmit={handleOnSubmit(history, pageNumber)}>
            {renderForm(handleOnSubmit(history, pageNumber))}
          </Formik>
        </div>
        <div className={styles.contentBlock}>
          {!loading && !data.length ? (
            <Alert message="You currently have no apps listed " type="info" />
          ) : (
            <div className="mb-5">
              <Table scrollable={true} loading={false} data={data} columns={columns} />
            </div>
          )}
        </div>
        <Pagination
          onChange={handleChangePageNumber(history)}
          totalCount={totalCount}
          pageSize={pageSize}
          pageNumber={pageNumber}
        />
      </FlexContainerBasic>
      <AppDeleteModal
        appId={deleteModal.appId}
        appName={deleteModal.appName}
        afterClose={handleCloseAppDeleteModal({ setDeleteModal })}
        visible={deleteModal.visible}
        onDeleteSuccess={handleCloseAppDeleteModal({ setDeleteModal })}
      />
    </ErrorBoundary>
  )
}

export type StateProps = RouteComponentProps & {
  adminAppsState: AdminAppsState
}

export const mapStateToProps = (state: ReduxState, ownProps: RouteComponentProps): StateProps => ({
  adminAppsState: selectAdminAppsState(state),
  ...ownProps,
})

export type DispatchProps = {
  onChangeFeatured: (params: AdminAppsFeaturedParams) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  onChangeFeatured: (params: AdminAppsFeaturedParams) => dispatch(adminAppsRequestFeatured(params)),
})

export const withRedux = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRouter, withRedux)(AdminApps) as React.LazyExoticComponent<any>
