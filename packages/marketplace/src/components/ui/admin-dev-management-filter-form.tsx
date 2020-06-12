import * as React from 'react'
import dayjs from 'dayjs'
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
  DatePicker,
} from '@reapit/elements'
import styles from '@/styles/pages/admin-apps.scss?mod'

export interface AdminDevManagementFilterFormValues {
  name: string
  company: string
  registeredFrom: string
  registeredTo: string
}

export interface AdminDevManagementFilterFormProps {
  filterValues: AdminDevManagementFilterFormValues
  onSearch: any
}

export const AdminDevManagementFilterForm: React.FC<AdminDevManagementFilterFormProps> = ({
  filterValues,
  onSearch,
}) => (
  <Formik initialValues={filterValues} onSubmit={onSearch}>
    {({ values: { registeredFrom }, status }) => {
      return (
        <Form noValidate={true}>
          <FormSection>
            <Content className={styles.contentBlock}>
              <FormHeading>Developer Management Filter Form</FormHeading>
              <FormSubHeading>Filter the result by Name and Company</FormSubHeading>
              <Grid className="items-center">
                <GridItem>
                  <Input type="text" labelText="Name" id="name" name="name" maxLength={256} />
                </GridItem>
                <GridItem>
                  <Input type="text" labelText="Company" id="company" name="company" maxLength={256} />
                </GridItem>
                <GridItem>
                  <DatePicker
                    name="registeredFrom"
                    labelText="Registered From"
                    id="registeredFrom"
                    reactDatePickerProps={{
                      className: styles.datePicker,
                      maxDate: dayjs()
                        .subtract(1, 'day')
                        .toDate(),
                    }}
                  />
                </GridItem>
                <GridItem>
                  <DatePicker
                    name="registeredTo"
                    labelText="Registered To"
                    id="registeredTo"
                    reactDatePickerProps={{
                      className: styles.datePicker,
                      minDate: dayjs(registeredFrom)
                        .add(1, 'day')
                        .toDate(),
                      maxDate: dayjs()
                        .subtract(1, 'day')
                        .toDate(),
                    }}
                  />
                </GridItem>
                <GridItem className="mt-4">
                  <Button type="submit" variant="primary">
                    Search
                  </Button>
                </GridItem>
              </Grid>
              {status && <p className="has-text-danger">{status}</p>}
            </Content>
          </FormSection>
        </Form>
      )
    }}
  </Formik>
)

export default AdminDevManagementFilterForm
