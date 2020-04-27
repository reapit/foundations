import * as React from 'react'
import { H4 } from '@reapit/elements'
import CostCalculatorForm, { CostCalculatorFormValues } from './cost-calculator-form'
import TotalCostTable from './total-cost-table'

export type CostCalculatorProps = {}

export type EndpointsUsedRange = { [key: string]: string }

export type TierPriceLimit = {
  limit: number
  price: number
}

export type TierPrice = {
  [key: string]: {
    maxPrice: number
    priceRange: TierPriceLimit[]
  }
}

export const endpointsUsedRange: EndpointsUsedRange = {
  tier1: '1-5',
  tier2: '6-10',
  tier3: '11-20',
  tier4: '21-30',
  tier5: '31-40',
  tier6: '41-50',
  tier7: '50+',
}

export const foundationPricing: TierPrice = {
  tier1: {
    maxPrice: 0.001,
    priceRange: [
      {
        limit: 1000,
        price: 0.01,
      },
      {
        limit: 1500,
        price: 0.008,
      },
      {
        limit: 2500,
        price: 0.006,
      },
      {
        limit: 5000,
        price: 0.005,
      },
      {
        limit: 15000,
        price: 0.004,
      },
      {
        limit: 25000,
        price: 0.0025,
      },
    ],
  },
  tier2: {
    maxPrice: 0.0011,
    priceRange: [
      {
        limit: 1000,
        price: 0.011,
      },
      {
        limit: 1500,
        price: 0.0088,
      },
      {
        limit: 2500,
        price: 0.0066,
      },
      {
        limit: 5000,
        price: 0.0055,
      },
      {
        limit: 15000,
        price: 0.0044,
      },
      {
        limit: 25000,
        price: 0.00275,
      },
    ],
  },
  tier3: {
    maxPrice: 0.00125,
    priceRange: [
      {
        limit: 1000,
        price: 0.0125,
      },
      {
        limit: 1500,
        price: 0.01,
      },
      {
        limit: 2500,
        price: 0.0075,
      },
      {
        limit: 5000,
        price: 0.00625,
      },
      {
        limit: 15000,
        price: 0.005,
      },
      {
        limit: 25000,
        price: 0.003125,
      },
    ],
  },
  tier4: {
    maxPrice: 0.00145,
    priceRange: [
      {
        limit: 1000,
        price: 0.0145,
      },
      {
        limit: 1500,
        price: 0.0116,
      },
      {
        limit: 2500,
        price: 0.0087,
      },
      {
        limit: 5000,
        price: 0.00725,
      },
      {
        limit: 15000,
        price: 0.0058,
      },
      {
        limit: 25000,
        price: 0.003625,
      },
    ],
  },
  tier5: {
    maxPrice: 0.0017,
    priceRange: [
      {
        limit: 1000,
        price: 0.017,
      },
      {
        limit: 1500,
        price: 0.0136,
      },
      {
        limit: 2500,
        price: 0.0102,
      },
      {
        limit: 5000,
        price: 0.0085,
      },
      {
        limit: 15000,
        price: 0.0068,
      },
      {
        limit: 25000,
        price: 0.00425,
      },
    ],
  },
  tier6: {
    maxPrice: 0.002,
    priceRange: [
      {
        limit: 1000,
        price: 0.02,
      },
      {
        limit: 1500,
        price: 0.016,
      },
      {
        limit: 2500,
        price: 0.012,
      },
      {
        limit: 5000,
        price: 0.01,
      },
      {
        limit: 15000,
        price: 0.008,
      },
      {
        limit: 25000,
        price: 0.005,
      },
    ],
  },
  tier7: {
    maxPrice: 0.00235,
    priceRange: [
      {
        limit: 1000,
        price: 0.0235,
      },
      {
        limit: 1500,
        price: 0.0188,
      },
      {
        limit: 2500,
        price: 0.0141,
      },
      {
        limit: 5000,
        price: 0.01175,
      },
      {
        limit: 15000,
        price: 0.0094,
      },
      {
        limit: 25000,
        price: 0.005875,
      },
    ],
  },
}

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
    <>
      <H4>Cost Calculator</H4>
      <p className="is-italic">
        You can calculate the estimated monthly cost below using our Cost Calculator. Just select the number of
        endpoints and enter the amount of API calls below. To see the full Foundations Pricing, please click{' '}
        <a
          href="https://www.dropbox.com/s/tstsu2vzskf83by/Foundation%20Pricing_4.pdf?dl=0"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </p>
      <CostCalculatorForm
        initialValues={formValues}
        endpointsUsedRange={endpointsUsedRange}
        onSubmit={onSubmit}
        onClear={onClear}
      />
      <TotalCostTable
        formValues={formValues}
        endpointsUsedRange={endpointsUsedRange}
        foundationPricing={foundationPricing}
      />
    </>
  )
}

export default CostCalculator
