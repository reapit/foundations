import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import {
  Loader,
  Pagination,
  Table,
  Button,
  FlexContainerResponsive,
  Alert,
  Input,
  H3,
  Grid,
  GridItem,
  Formik,
  Form
} from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { AdminAppsState } from '@/reducers/admin-apps'
import styles from '@/styles/pages/admin-apps.scss?mod'
import { selectAdminAppsState } from '@/selector/admin'
import { Dispatch } from 'redux'
import {
  adminAppsRequestData,
  AdminAppsFilter,
  AdminAppsParams,
  adminAppsRequestFeatured,
  AdminAppsFeaturedParams
} from '@/actions/admin-apps'
import AppDeleteModal from '../ui/app-delete'

export interface AdminAppsMappedActions {
  fetchApps: (filter: AdminAppsParams) => () => void
  onChangeFeatured: (params: AdminAppsFeaturedParams) => void
}

export interface AdminAppsMappedProps {
  adminAppsState: AdminAppsState
}

export type AdminAppsProps = AdminAppsMappedActions & AdminAppsMappedProps

export const refreshForm = (setFilter, resetForm) => () => {
  setFilter({ appName: '', companyName: '' })
  resetForm()
}

export const handleDeleteSuccess = ({ setDeleteModal, fetchApps, filter, pageNumber }) => () => {
  setDeleteModal({ visible: false, appId: '', appName: '' })
  fetchApps({ ...filter, pageNumber })
}

export const handleAfterClose = ({ setDeleteModal }) => () => {
  setDeleteModal({ visible: false, appId: '', appName: '' })
}

export const handleFormStateSuccess = ({ formState, fetchApps, filter, pageNumber }) => () => {
  if (formState === 'SUCCESS') {
    fetchApps({ ...filter, pageNumber })
  }
}

export const generateColumns = ({ onChangeFeatured, setDeleteModal, deleteModal }) => () => {
  return [
    {
      Header: 'AppID',
      accessor: 'id'
    },
    {
      Header: 'App Name',
      accessor: 'name'
    },
    {
      Header: 'App Summary',
      accessor: 'summary'
    },
    {
      Header: 'Developer Name',
      accessor: 'developer'
    },
    {
      Header: 'Is Listed',
      accessor: 'isListed'
    },
    {
      Header: 'Pending Revisions',
      accessor: 'pendingRevisions'
    },
    {
      Header: 'External App',
      accessor: () => 'TBC'
    },
    {
      Header: 'Featured',
      Cell: ({ row }) => {
        const { id, isFeatured } = row.original
        return (
          <div className="field field-checkbox">
            <input
              className="checkbox"
              type="checkbox"
              id={id}
              name={id}
              checked={isFeatured}
              onChange={evt => onChangeFeatured({ id, isFeatured: evt.target.checked })}
            />
            <label className="label" htmlFor={id}></label>
          </div>
        )
      }
    },
    {
      id: 'Delete',
      Cell: ({ row }) => (
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
    }
  ]
}

export const renderForm = (setFilter: (filter: AdminAppsFilter) => void) => ({ values, resetForm }) => {
  const disabled = !values.appName && !values.companyName
  return (
    <Form>
      <Grid>
        <GridItem className={styles.filterBlock}>
          <Input type="text" name="appName" id="appName" labelText="App Name" />
        </GridItem>
        <GridItem className={styles.filterBlock}>
          <Input type="text" name="companyName" id="companyName" labelText="Developer Name" />
        </GridItem>
        <GridItem className={styles.filterButton}>
          <Button type="submit" variant="primary" disabled={disabled}>
            Search
          </Button>
          <Button type="button" variant="primary" onClick={refreshForm(setFilter, resetForm)}>
            Refresh
          </Button>
        </GridItem>
      </Grid>
    </Form>
  )
}

export const AdminApps: React.FunctionComponent<AdminAppsProps> = ({ adminAppsState, fetchApps, onChangeFeatured }) => {
  const unfetched = !adminAppsState.adminAppsData
  const { loading, formState } = adminAppsState
  const { data = [], totalCount, pageSize } = adminAppsState.adminAppsData || {}

  const [filter, setFilter] = React.useState<AdminAppsFilter>({ appName: '', companyName: '' })
  const [pageNumber, setPageNumber] = React.useState<number>(1)
  const [deleteModal, setDeleteModal] = React.useState({ visible: false, appId: '', appName: '' })

  React.useEffect(fetchApps({ ...filter, pageNumber }), [pageNumber, filter])

  React.useEffect(handleFormStateSuccess({ formState, fetchApps, filter, pageNumber }), [formState])

  const columns = React.useMemo(generateColumns({ onChangeFeatured, setDeleteModal, deleteModal }), [data])

  if (unfetched) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <FlexContainerResponsive flexColumn data-test="revision-list-container">
        {loading && (
          <div className="pin absolute flex items-center justify-center">
            <Loader />
          </div>
        )}
        <div className="mb-5">
          <H3>Admin Apps</H3>
          <Formik initialValues={{ appName: '', companyName: '' }} onSubmit={setFilter}>
            {renderForm(setFilter)}
          </Formik>
        </div>
        {!loading && !data.length ? (
          <Alert message="You currently have no apps listed " type="info" />
        ) : (
          <div className="mb-5">
            <Table loading={false} data={data} columns={columns} />
          </div>
        )}
        <Pagination onChange={setPageNumber} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
      </FlexContainerResponsive>
      <AppDeleteModal
        appId={deleteModal.appId}
        appName={deleteModal.appName}
        afterClose={handleAfterClose({ setDeleteModal })}
        visible={deleteModal.visible}
        onDeleteSuccess={handleDeleteSuccess({ setDeleteModal, fetchApps, filter, pageNumber })}
      />
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): AdminAppsMappedProps => ({
  adminAppsState: selectAdminAppsState(state)
})

export const mapDispatchToProps = (dispatch: Dispatch): AdminAppsMappedActions => ({
  fetchApps: (params: AdminAppsParams) => () => {
    dispatch(adminAppsRequestData(params))
  },
  onChangeFeatured: (params: AdminAppsFeaturedParams) => dispatch(adminAppsRequestFeatured(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminApps)
