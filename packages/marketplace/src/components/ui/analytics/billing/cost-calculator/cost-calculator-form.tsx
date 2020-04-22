import * as React from 'react'

export type CostCalculatorFormProps = {}

export type CostCalculatorFormValues = {
  endpointsUsed: string
  apiCalls: number
}

export const endpointUsedRange = {
  I: '1-5',
  II: '6-10',
  III: '11-20',
  IV: '21-30',
  V: '31-40',
  VI: '41-50',
  VII: '50+',
}

export const data = [
  {
    I: {
      maxPrice: 0.001,
      priceRange: [
        {
          limit: 1000,
          price: 0.01,
        },
        {
          limit: 2500,
          price: 0.008,
        },
        {
          limit: 5000,
          price: 0.006,
        },
        {
          limit: 10000,
          price: 0.005,
        },
        {
          limit: 25000,
          price: 0.004,
        },
        {
          limit: 50000,
          price: 0.0025,
        },
      ],
    },
    II: {
      maxPrice: 0.0011,
      priceRange: [
        {
          limit: 1000,
          price: 0.011,
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
          limit: 10000,
          price: 0.0044,
        },
        {
          limit: 25000,
          price: 0.00275,
        },
        {
          limit: 50000,
          price: 0.0025,
        },
      ],
    },
    III: {
      maxPrice: 0.00125,
      priceRange: [
        {
          limit: 1000,
          price: 0.0125,
        },
        {
          limit: 2500,
          price: 0.01,
        },
        {
          limit: 5000,
          price: 0.0075,
        },
        {
          limit: 10000,
          price: 0.00625,
        },
        {
          limit: 25000,
          price: 0.005,
        },
        {
          limit: 50000,
          price: 0.003125,
        },
      ],
    },
    IV: {
      maxPrice: 0.00145,
      priceRange: [
        {
          limit: 1000,
          price: 0.0145,
        },
        {
          limit: 2500,
          price: 0.0116,
        },
        {
          limit: 5000,
          price: 0.0087,
        },
        {
          limit: 10000,
          price: 0.00725,
        },
        {
          limit: 25000,
          price: 0.0058,
        },
        {
          limit: 50000,
          price: 0.003625,
        },
      ],
    },
    V: {
      maxPrice: 0.00145,
      priceRange: [
        {
          limit: 1000,
          price: 0.0145,
        },
        {
          limit: 2500,
          price: 0.0116,
        },
        {
          limit: 5000,
          price: 0.0087,
        },
        {
          limit: 10000,
          price: 0.00725,
        },
        {
          limit: 25000,
          price: 0.0058,
        },
        {
          limit: 50000,
          price: 0.003625,
        },
      ],
      VI: {
        maxPrice: 0.002,
        priceRange: [
          {
            limit: 1000,
            price: 0.02,
          },
          {
            limit: 2500,
            price: 0.016,
          },
          {
            limit: 5000,
            price: 0.012,
          },
          {
            limit: 10000,
            price: 0.01,
          },
          {
            limit: 25000,
            price: 0.008,
          },
          {
            limit: 50000,
            price: 0.005,
          },
        ],
      },
      VII: {
        maxPrice: 0.00235,
        priceRange: [
          {
            limit: 1000,
            price: 0.0235,
          },
          {
            limit: 2500,
            price: 0.0188,
          },
          {
            limit: 5000,
            price: 0.0141,
          },
          {
            limit: 10000,
            price: 0.01175,
          },
          {
            limit: 25000,
            price: 0.0094,
          },
          {
            limit: 50000,
            price: 0.004875,
          },
        ],
      },
    },
  },
]

const CostCalculatorForm: React.FC<CostCalculatorFormProps> = () => {
  return <div></div>
}

export default CostCalculatorForm
