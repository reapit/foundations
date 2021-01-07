import React from 'react'

import { FormFieldInfo } from '@reapit/utils'
import { Grid, GridItem, Formik, Form, Input, Button } from '@reapit/elements'

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

const OfficeTabFilterForm: React.FC<OfficesFormProps> = ({ filterValues, onSearch }) => {
  const { name } = formFields
  return (
    <Formik initialValues={filterValues} onSubmit={onSearch}>
      {() => {
        return (
          <Form noValidate={true}>
            <Grid className="items-center">
              <GridItem>
                <Input type="text" labelText={name.label} id={name.name} name={name.name} />
              </GridItem>
              <GridItem className="mt-4">
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </GridItem>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default OfficeTabFilterForm
