import * as React from 'react'
import { Formik, Form } from 'formik'
import {
  Input,
  Button,
  Grid,
  GridItem,
  FlexContainerBasic,
  FormSection,
  FormHeading,
  FormSubHeading,
  LevelRight,
  FlexContainerResponsive
} from '@reapit/elements'
import styles from '@/styles/pages/admin-dev-management.scss?mod'

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
  onSearch
}) => (
  <FlexContainerBasic flexColumn className="pb-4">
    <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.mx0}>
      <Formik
        initialValues={filterValues}
        onSubmit={formValues => onSearch(formValues)}
        render={() => {
          return (
            <Form noValidate={true}>
              <FormSection>
                <FormHeading>Developer Management Filter Form</FormHeading>
                <FormSubHeading>Filter the result by Name and Company</FormSubHeading>
                <Grid>
                  <GridItem>
                    <Input type="text" labelText="Name" id="name" name="name" />
                  </GridItem>
                  <GridItem>
                    <Input type="text" labelText="Company" id="company" name="company" />
                  </GridItem>
                </Grid>
              </FormSection>

              <FormSection>
                <LevelRight>
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </LevelRight>
              </FormSection>
            </Form>
          )
        }}
      />
    </FlexContainerResponsive>
  </FlexContainerBasic>
)

export default AdminDevManagementFilterForm
