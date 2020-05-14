import * as React from 'react'
import { Form, Formik } from 'formik'
import { EndpointsUsedRange } from './cost-calculator'
import {
  Grid,
  GridItem,
  SelectBox,
  Input,
  FlexContainerResponsive,
  Button,
  FormikErrors,
  isNumberOnly,
} from '@reapit/elements'
import styles from '@/styles/pages/developer-analytics.scss?mod'

export type CostCalculatorFormProps = {
  initialValues: CostCalculatorFormValues
  endpointsUsedRange: EndpointsUsedRange
  onSubmit: (values: CostCalculatorFormValues) => void
  onClear: () => void
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

export const validate = (values: CostCalculatorFormValues): FormikErrors<CostCalculatorFormValues> => {
  const errors = {} as FormikErrors<CostCalculatorFormValues>
  if (!values.endpointsUsed) {
    errors.endpointsUsed = 'Endpoints Used is required'
  }

  if (!isNumberOnly(values.apiCalls)) {
    errors.apiCalls = 'Invalid Monthly API calls'
  }
  return errors
}

const CostCalculatorForm: React.FC<CostCalculatorFormProps> = ({
  initialValues,
  endpointsUsedRange,
  onSubmit,
  onClear,
}) => {
  return (
    <div className={styles.costCalculatorFormContainer}>
      <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} enableReinitialize>
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
            <Button variant="danger" type="button" onClick={onClear}>
              clear
            </Button>
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
