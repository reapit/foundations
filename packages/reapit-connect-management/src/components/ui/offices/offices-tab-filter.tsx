import React from 'react'
import { useFormikContext } from 'formik'
import debounce from 'just-debounce-it'

import { FormFieldInfo } from '@reapit/utils'
import { Grid, GridItem, Formik, Form, Input } from '@reapit/elements'

type FieldType = 'name'

export const formFields: Record<FieldType, FormFieldInfo> = {
  name: {
    name: 'name',
    label: 'Name',
  },
}

export interface OfficesFilterFormValues {
  name: string
}

export interface OfficesFormProps {
  filterValues: OfficesFilterFormValues
  onSearch: any
}

const FormSearchEffect = ({ debounceMs }) => {
  const formik = useFormikContext()
  const debouncedSubmit = React.useCallback(
    debounce(() => formik.submitForm(), debounceMs),
    [debounceMs, formik.submitForm],
  )

  React.useEffect(() => {
    debouncedSubmit()
  }, [debouncedSubmit, formik.values])

  return null
}

const PaymentsFilterForm: React.FC<OfficesFormProps> = ({ filterValues, onSearch }) => {
  const { name } = formFields
  return (
    <Formik initialValues={filterValues} onSubmit={onSearch}>
      {() => {
        return (
          <Form noValidate={true}>
            <Grid>
              <GridItem>
                <Input type="text" labelText={name.label} id={name.name} name={name.name} />
                <FormSearchEffect debounceMs={500} />
              </GridItem>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default PaymentsFilterForm
