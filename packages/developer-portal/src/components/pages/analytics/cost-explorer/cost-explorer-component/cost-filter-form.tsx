import React, { useMemo } from 'react'
import { Formik, Form, DatePicker, DATE_TIME_FORMAT, GridItem, Grid, SelectOption, SelectBox } from '@reapit/elements'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import { CostFilterFormValues } from './cost-explorer'
import { useSelector } from 'react-redux'
import { selectMyIdentity } from '@/selector'

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

const CostFilterForm: React.FC<CostFilterFormProps> = ({ initialValues, clientOptions, onSave }) => {
  const myIdentity = useSelector(selectMyIdentity)

  const minDate = myIdentity.created && new Date(myIdentity?.created)
  const maxDate = new Date()
  const filteredOptions = useMemo(() => clientOptions.filter((option) => option.value !== 'SBOX'), [clientOptions])

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
              <SelectBox name="customerId" options={filteredOptions} labelText="Client" id="customerId" />
            </GridItem>
          </Grid>
        </GridItem>
        <FormikAutoSave onSave={handleAutoSave(onSave)} />
      </Form>
    </Formik>
  )
}
export default CostFilterForm
