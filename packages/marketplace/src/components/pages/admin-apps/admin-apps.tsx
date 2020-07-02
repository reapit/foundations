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
  DatePicker,
  toLocalTime,
  isEmptyObject,
  Section,
  FlexContainerBasic,
} from '@reapit/elements'
import { selectAdminAppsData, selectAdminAppsLoading } from '@/selector/admin'
import { adminAppsRequestFeatured } from '@/actions/admin-apps'
import AppDeleteModal from '@/components/ui/app-delete'
import { addQuery, stringifyObjectIntoQueryString, getParamsFromPath } from '@/utils/client-url-params'
import { cleanObject } from '@reapit/utils'
import Routes from '@/constants/routes'
import { FaCheck } from 'react-icons/fa'

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

export const renderChecked = ({ cell: { value } }) => {
  return value ? <FaCheck /> : null
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
      Cell: renderChecked,
    },
    {
      Header: 'Pending Revisions',
      accessor: 'pendingRevisions',
      Cell: renderChecked,
    },
    {
      Header: 'Direct API',
      accessor: 'isDirectApi',
      Cell: renderChecked,
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

export const refreshForm = history => () => {
  history.push(Routes.ADMIN_APPS)
}

export const renderForm = ({ values, status }) => {
  const startDate = values.registeredFrom ? new Date(values.registeredFrom) : ''
  const endDate = values.registeredTo ? new Date(values.registeredTo) : ''

  return (
    <Form>
      <FormSection>
        <FormHeading>Admin Apps Filter Form</FormHeading>
        <FormSubHeading>Filter the result by App, Developer and Company</FormSubHeading>
        <Grid>
          <GridItem>
            <Input type="text" name="appName" id="appName" labelText="App Name" maxLength={256} />
          </GridItem>
          <GridItem>
            <Input type="text" name="developerName" id="developerName" labelText="Developer Name" maxLength={256} />
          </GridItem>
          <GridItem>
            <Input type="text" name="companyName" id="companyName" labelText="Company Name" maxLength={256} />
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
          <GridItem>
            <FlexContainerBasic className="mt-5 pt-2">
              <Button type="submit" variant="primary">
                Search
              </Button>
              <Button type="reset" variant="primary">
                Refresh
              </Button>
            </FlexContainerBasic>
          </GridItem>
        </Grid>
        {status && <p className="has-text-danger">{status}</p>}
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

export const handleOnSubmit = history => (formValues: FormValues, { setStatus }) => {
  const cleanedValues = cleanObject(formValues)

  if (isEmptyObject(cleanedValues)) {
    setStatus('Please enter at least one search criteria')
    return
  }

  const queryString = stringifyObjectIntoQueryString({ ...cleanedValues, page: 1 })
  history.push(`${Routes.ADMIN_APPS}?${queryString}`)
}

export const handleChangePage = history => (page: number) => {
  history.push(addQuery({ page }))
}

export const renderContent = ({ adminAppsData, columns }) => {
  if (adminAppsData?.data && adminAppsData?.data?.length < 1) {
    return <Alert message="No Results " type="info" />
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
  const { page = 1, ...queryParams } = getParamsFromPath(location.search) as any

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
    <>
      <H3 isHeadingSection>App Management</H3>
      <Formik initialValues={formInitValues} onSubmit={handleOnSubmit(history)} onReset={refreshForm(history)}>
        {renderForm}
      </Formik>
      <Section>
        <span>Total apps: {adminAppsData?.totalCount || 0}</span>
      </Section>
      <Section>{renderContent({ adminAppsData, columns })}</Section>
      <Pagination
        onChange={handleChangePage(history)}
        totalCount={adminAppsData?.totalCount || 0}
        pageSize={adminAppsData?.pageSize || 0}
        pageNumber={page}
      />
      <AppDeleteModal
        appId={deleteModalData.appId}
        appName={deleteModalData.appName}
        afterClose={handleCloseAppDeleteModal({ setDataDeleteModal })}
        visible={deleteModalData.visible}
        onDeleteSuccess={handleCloseAppDeleteModal({ setDataDeleteModal })}
      />
    </>
  )
}

export default AdminApps
