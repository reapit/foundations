import * as React from 'react'
import { H5, GridItem, Grid, Section } from '@reapit/elements'
import CostCalculatorForm, { CostCalculatorFormValues } from './cost-calculator-form'
import TotalCostTable from './total-cost-table'

export type CostCalculatorProps = {}

export const prepareInitialValues = (endpointsUsed: string, apiCalls: string) => {
  return () => {
    return {
      endpointsUsed,
      apiCalls,
    } as CostCalculatorFormValues
  }
}

export const handleOnSubmit = (
  setEndpointsUsed: (endpointsUsed: string) => void,
  setApiCalls: (apiCalls: string) => void,
) => {
  return (values: CostCalculatorFormValues) => {
    const { endpointsUsed, apiCalls } = values
    setEndpointsUsed(endpointsUsed)
    setApiCalls(apiCalls)
  }
}

export const handleOnClear = (
  setEndpointsUsed: (endpointsUsed: string) => void,
  setApiCalls: (apiCalls: string) => void,
) => {
  return () => {
    setEndpointsUsed('')
    setApiCalls('')
  }
}

const CostCalculator: React.FC<CostCalculatorProps> = () => {
  const [endpointsUsed, setEndpointsUsed] = React.useState('')
  const [apiCalls, setApiCalls] = React.useState('')
  const formValues = React.useMemo(prepareInitialValues(endpointsUsed, apiCalls), [endpointsUsed, apiCalls])
  const onSubmit = React.useCallback(handleOnSubmit(setEndpointsUsed, setApiCalls), [])
  const onClear = React.useCallback(handleOnClear(setEndpointsUsed, setApiCalls), [])

  return (
    <Section>
      <H5>API Cost Calculator</H5>
      <Grid>
        <GridItem className="is-half-desktop">
          <p className="is-italic">
            You can calculate the estimated monthly cost below using our Cost Calculator. Just select the number of
            endpoints and enter the amount of API calls below. To see the full Foundations Pricing, please click{' '}
            <a
              href="http://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/foundations-pricing.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </p>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem className="is-half-desktop">
          <CostCalculatorForm initialValues={formValues} onSubmit={onSubmit} onClear={onClear} />
        </GridItem>
      </Grid>
      <TotalCostTable formValues={formValues} />
    </Section>
  )
}

export default CostCalculator
