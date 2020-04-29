import * as React from 'react'
import { Formik, Form, DatePicker, DATE_TIME_FORMAT } from '@reapit/elements'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import { CostFilterFormValues } from './cost-explorer'

export type CostFilterFormProps = {
  initialValues: CostFilterFormValues
  onSave: (values: CostFilterFormValues) => void
}

export const handleAutoSave = (onSave: (values: CostFilterFormValues) => void) => {
  return (values: CostFilterFormValues) => {
    onSave(values)
  }
}

const CostFilterForm: React.FC<CostFilterFormProps> = ({ initialValues, onSave }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>
        <DatePicker
          id="createdMonth"
          name="createdMonth"
          useCustomInput={false}
          reactDatePickerProps={{
            showMonthYearPicker: true,
            dateFormat: DATE_TIME_FORMAT.MMMM_YYYY,
            showMonthDropdown: true,
          }}
        />
        <FormikAutoSave onSave={handleAutoSave(onSave)} />
      </Form>
    </Formik>
  )
}
export default CostFilterForm
