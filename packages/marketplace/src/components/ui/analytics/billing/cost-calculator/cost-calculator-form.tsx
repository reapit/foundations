import * as React from 'react'
import { Form, Formik } from 'formik'
import { EndpointsUsedRange } from './cost-calculator'
import { Grid, GridItem, SelectBox, Input, FlexContainerResponsive, Button } from '@reapit/elements'
import styles from '@/styles/pages/analytics.scss?mod'

export type CostCalculatorFormProps = {
  initialValues: CostCalculatorFormValues
  endpointsUsedRange: EndpointsUsedRange
  onSubmit: (values: CostCalculatorFormValues) => void
}

export type CostCalculatorFormValues = {
  endpointsUsed: string
  apiCalls: string
}

export const renderEndpointsUsedOptions = (endpointsUsedRange: EndpointsUsedRange) => {
  const endpointsUsed = Object.keys(endpointsUsedRange).map(key => ({ value: key, label: endpointsUsedRange[key] }))
  return [
    {
      label: 'Please select',
      value: '',
    },
    ...endpointsUsed.map(item => {
      return {
        value: item.value,
        label: item.label,
      }
    }),
  ]
}

const CostCalculatorForm: React.FC<CostCalculatorFormProps> = ({ initialValues, endpointsUsedRange, onSubmit }) => {
  return (
    <div className={styles.costCalculatorFormContainer}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Grid>
            <GridItem className="is-one-quarter">
              <h6 className="title is-6">Endpoints Used</h6>
            </GridItem>
            <GridItem>
              <SelectBox
                name="endpointsUsed"
                options={renderEndpointsUsedOptions(endpointsUsedRange)}
                id="endpointsUsed"
              />
            </GridItem>
          </Grid>
          <Grid>
            <GridItem className="is-one-quarter">
              <h6 className="title is-6">Monthly API Calls</h6>
            </GridItem>
            <GridItem>
              <Input name="apiCalls" id="apiCalls" type="text" placeholder="Please enter a number" />
            </GridItem>
          </Grid>
          <FlexContainerResponsive>
            <Button variant="primary" type="submit">
              Calculate
            </Button>
          </FlexContainerResponsive>
        </Form>
      </Formik>
    </div>
  )
}

export default CostCalculatorForm
