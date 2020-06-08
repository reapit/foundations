import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { Dispatch } from 'redux'
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
  DatePicker,
  toLocalTime,
} from '@reapit/elements'
import { selectAdminAppsData, selectAdminAppsLoading } from '@/selector/admin'
import { adminAppsRequestFeatured } from '@/actions/admin-apps'
import AppDeleteModal from '@/components/ui/app-delete'
import { addQuery, stringifyObjectIntoQueryString, getParamsFromPath } from '@/utils/client-url-params'
import styles from '@/styles/pages/admin-apps.scss?mod'

export type DeleteModalData = {
  visible: boolean
  appId: string
  appName: string
  developerName: string
}

export const renderIsFeature = (dispatch: Dispatch<any>) => ({ row, cell }) => {
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
        onChange={evt => dispatch(adminAppsRequestFeatured({ id, isFeatured: evt.target.checked }))}
      />
      <label className="label" htmlFor={id}></label>
    </div>
  )
}

export const renderCreatedAt = ({ cell: { value } }) => {
  return <p>{toLocalTime(value)}</p>
}

export type RenderDeleteActionParams = {
  setDataDeleteModal: React.Dispatch<React.SetStateAction<DeleteModalData>>
  deleteModalData: DeleteModalData
}

export const renderDeleteAction = ({ setDataDeleteModal, deleteModalData }: RenderDeleteActionParams) => ({ row }) => (
  <Button
    type="button"
    variant="danger"
    onClick={() =>
      setDataDeleteModal({ ...deleteModalData, visible: true, appId: row.original.id, appName: row.original.name })
    }
  >
    Delete
  </Button>
)

export type GenerateColumnsParams = RenderDeleteActionParams & {
  dispatch: Dispatch<any>
}

export const generateColumns = ({ dispatch, setDataDeleteModal, deleteModalData }: GenerateColumnsParams) => () => {
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
      Header: 'Company Name',
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
      Header: 'Created',
      accessor: 'created',
      Cell: renderCreatedAt,
    },
    {
      Header: 'Featured',
      accessor: 'isFeatured',
      Cell: renderIsFeature(dispatch),
    },
    {
      id: 'Delete',
      Cell: renderDeleteAction({ setDataDeleteModal, deleteModalData }),
    },
  ]
}

export const refreshForm = (onSubmit: Function, resetForm: Function) => () => {
  resetForm()
  onSubmit({ appName: '', companyName: '', developerName: '' })
}

export const renderForm = onSubmit => ({ values, resetForm }) => {
  const isDisabledSubmitButton =
    !values.appName && !values.companyName && !values.developerName && !values.registeredFrom && !values.registeredTo

  const startDate = values.registeredFrom ? new Date(values.registeredFrom) : ''
  const endDate = values.registeredTo ? new Date(values.registeredTo) : ''

  return (
    <Form>
      <FormSection>
        <Content className={styles.contentBlock}>
          <FormHeading>Admin Apps Filter Form</FormHeading>
          <FormSubHeading>Filter the result by App, Developer and Company</FormSubHeading>
          <Grid>
            <GridItem>
              <Input type="text" name="appName" id="appName" labelText="App Name" maxLength={100} />
            </GridItem>
            <GridItem>
              <Input type="text" name="developerName" id="developerName" labelText="Developer Name" maxLength={100} />
            </GridItem>
            <GridItem>
              <Input type="text" name="companyName" id="companyName" labelText="Company Name" maxLength={100} />
            </GridItem>
          </Grid>
          <Grid>
            <GridItem>
              <DatePicker
                name="registeredFrom"
                labelText="Registered From"
                id="registeredFrom"
                reactDatePickerProps={{
                  selectsStart: true,
                  startDate,
                  endDate,
                }}
              />
            </GridItem>
            <GridItem>
              <DatePicker
                name="registeredTo"
                labelText="Registered To"
                id="registeredTo"
                reactDatePickerProps={{
                  selectsEnd: true,
                  startDate,
                  endDate,
                  minDate: startDate,
                }}
              />
            </GridItem>
            <GridItem className={styles.filterButton}>
              <Button type="submit" variant="primary" disabled={isDisabledSubmitButton}>
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

export const handleCloseAppDeleteModal = ({ setDataDeleteModal }) => () => {
  setDataDeleteModal({ visible: false, appId: '', appName: '' })
}

export type FormValues = {
  appName: string
  companyName: string
  developerName: string
  registeredFrom: string
  registeredTo: string
}

export const handleOnSubmit = (history, page: number) => (formValues: FormValues) => {
  const submitValues = Object.keys(formValues).reduce((newObj, key) => {
    const value = formValues[key]
    if (value) {
      newObj[key] = value
    }
    return newObj
  }, {})
  const queryString = stringifyObjectIntoQueryString({ ...submitValues, page })
  history.push(`apps?${queryString}`)
}

export const handleChangePage = history => (page: number) => {
  history.push(addQuery({ page }))
}

export const renderContent = ({ adminAppsData, columns }) => {
  if (adminAppsData?.data && adminAppsData?.data?.length < 1) {
    return <Alert message="You currently have no apps listed " type="info" />
  }
  return (
    <div className="mb-5">
      <Table scrollable={true} loading={false} data={adminAppsData?.data || []} columns={columns} />
    </div>
  )
}

export const AdminApps: React.FC = () => {
  const [deleteModalData, setDataDeleteModal] = React.useState<DeleteModalData>({
    visible: false,
    appId: '',
    appName: '',
    developerName: '',
  })
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const loading = useSelector(selectAdminAppsLoading)
  const adminAppsData = useSelector(selectAdminAppsData)
  const queryParams = getParamsFromPath(location.search) as any
  const page = parseInt(queryParams.page, 10) || 1
  const columns = React.useMemo(generateColumns({ dispatch, setDataDeleteModal, deleteModalData }), [
    adminAppsData?.data,
  ])
  const formInitValues = {
    ...queryParams,
    registeredFrom: queryParams.registeredFrom || '',
    registeredTo: queryParams.registeredTo || '',
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <FlexContainerBasic hasPadding flexColumn hasBackground data-test="revision-list-container">
        <div className="mb-5">
          <H3>App Management</H3>
          <Formik initialValues={formInitValues} onSubmit={handleOnSubmit(history, page)}>
            {renderForm(handleOnSubmit(history, page))}
          </Formik>
        </div>
        <div className={styles.contentBlock}>
          <FlexContainerBasic hasPadding>
            <span>Total apps: {adminAppsData?.totalCount || 0}</span>
          </FlexContainerBasic>
          {renderContent({ adminAppsData, columns })}
        </div>
        <Pagination
          onChange={handleChangePage(history)}
          totalCount={adminAppsData?.totalCount || 0}
          pageSize={adminAppsData?.pageSize || 0}
          pageNumber={page}
        />
      </FlexContainerBasic>
      <AppDeleteModal
        appId={deleteModalData.appId}
        appName={deleteModalData.appName}
        afterClose={handleCloseAppDeleteModal({ setDataDeleteModal })}
        visible={deleteModalData.visible}
        onDeleteSuccess={handleCloseAppDeleteModal({ setDataDeleteModal })}
      />
    </div>
  )
}

export default AdminApps
