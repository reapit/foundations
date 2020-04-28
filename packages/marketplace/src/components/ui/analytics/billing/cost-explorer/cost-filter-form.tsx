import * as React from 'react'
import { Formik, Form, DatePicker } from '@reapit/elements'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import { CostFilterFormValues } from './cost-explorer'

export type CostFilterFormProps = {
  initialValues: CostFilterFormValues
  onSave: (values: CostFilterFormValues) => void
}

export const handleAutoSave = (onSave: (values: CostFilterFormValues) => void) => {
  return values => {
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
          reactDatePickerProps={{
            showMonthYearPicker: true,
            dateFormat: 'MMMM YYYY',
            showMonthDropdown: true,
          }}
        />
        <FormikAutoSave onSave={handleAutoSave(onSave)} />
      </Form>
    </Formik>
  )
}
export default CostFilterForm
