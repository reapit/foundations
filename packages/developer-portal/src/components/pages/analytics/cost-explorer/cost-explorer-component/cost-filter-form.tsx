import React, { useMemo } from 'react'
import {
  Formik,
  Form,
  DatePicker,
  DATE_TIME_FORMAT,
  GridItem,
  Grid,
  SelectOption,
  SelectBox,
} from '@reapit/elements-legacy'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import { CostFilterFormValues } from './cost-explorer'
import { useSelector } from 'react-redux'
import { selectMyIdentity } from '@/selector'
import { useReapitGet } from '@reapit/utils-react'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

export type CostFilterFormProps = {
  initialValues: CostFilterFormValues
  onSave: (values: CostFilterFormValues) => void
  clientOptions: SelectOption[]
}

export const handleAutoSave = (onSave: (values: CostFilterFormValues) => void) => {
  return (values: CostFilterFormValues) => {
    onSave(values)
  }
}

const defaultAppOption = {
  label: 'All',
  value: '',
}

const CostFilterForm: React.FC<CostFilterFormProps> = ({ initialValues, clientOptions, onSave }) => {
  const myIdentity = useSelector(selectMyIdentity)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25 },
    fetchWhenTrue: [developerId],
  })

  const minDate = myIdentity.created && new Date(myIdentity?.created)
  const maxDate = new Date()
  const customerOptions = useMemo(() => clientOptions.filter((option) => option.value !== 'SBOX'), [clientOptions])
  const appOptions = useMemo(
    () =>
      apps?.data?.map(({ id, name }) => ({
        label: name ?? '',
        value: id ?? '',
      })),
    [apps],
  )

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>
        <GridItem>
          <Grid>
            <GridItem>
              <DatePicker
                id="createdMonth"
                name="createdMonth"
                useCustomInput={false}
                labelText="Month"
                reactDatePickerProps={{
                  showMonthYearPicker: true,
                  dateFormat: DATE_TIME_FORMAT.MMMM_YYYY,
                  showMonthDropdown: true,
                  minDate: minDate,
                  maxDate: maxDate,
                }}
              />
            </GridItem>
            <GridItem>
              <SelectBox name="customerId" options={customerOptions} labelText="Client" id="customerId" />
            </GridItem>
            <GridItem>
              <SelectBox
                name="applicationId"
                options={[defaultAppOption, ...(appOptions ?? [])]}
                labelText="App"
                id="applicationId"
              />
            </GridItem>
          </Grid>
        </GridItem>
        <FormikAutoSave onSave={handleAutoSave(onSave)} />
      </Form>
    </Formik>
  )
}
export default CostFilterForm
