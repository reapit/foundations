import * as React from 'react'
import {
  Input,
  Button,
  Grid,
  GridItem,
  FormSection,
  FormHeading,
  FormSubHeading,
  Formik,
  Form,
  Content,
} from '@reapit/elements'
import styles from '@/styles/pages/admin-apps.scss?mod'

export interface AdminDevManagementFilterFormValues {
  name: string
  company: string
}

export interface AdminDevManagementFilterFormProps {
  filterValues: AdminDevManagementFilterFormValues
  onSearch: any
}

export const AdminDevManagementFilterForm: React.FC<AdminDevManagementFilterFormProps> = ({
  filterValues,
  onSearch,
}) => (
  <Formik initialValues={filterValues} onSubmit={formValues => onSearch(formValues)}>
    <Form noValidate={true}>
      <FormSection>
        <Content className={styles.contentBlock}>
          <FormHeading>Developer Management Filter Form</FormHeading>
          <FormSubHeading>Filter the result by Name and Company</FormSubHeading>
          <Grid className="items-center">
            <GridItem>
              <Input type="text" labelText="Name" id="name" name="name" />
            </GridItem>
            <GridItem>
              <Input type="text" labelText="Company" id="company" name="company" />
            </GridItem>
            <GridItem className="mt-4">
              <Button type="submit" variant="primary">
                Search
              </Button>
            </GridItem>
          </Grid>
        </Content>
      </FormSection>
    </Form>
  </Formik>
)

export default AdminDevManagementFilterForm
