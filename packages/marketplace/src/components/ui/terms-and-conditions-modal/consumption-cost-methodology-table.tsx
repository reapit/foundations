import React from 'react'
import { Table, FlexContainerBasic } from '@reapit/elements'

const consumptionCostsMethodology = [
  {
    monthApiCall: '1-5',
    first1000: '£0.010000',
    '1001To2500': '£0.008000',
    '2501To5000': '£0.006000',
    '5001To10000': '£0.005000',
    '10001To25000': '£0.004000',
    '25001To50000': '£0.002500',
    above50000: '£0.001000',
  },
  {
    monthApiCall: '6-10',
    first1000: '£0.011000',
    '1001To2500': '£0.008800',
    '2501To5000': '£0.006600',
    '5001To10000': '£0.005500',
    '10001To25000': '£0.004400',
    '25001To50000': '£0.00270',
    above50000: '£0.001100',
  },
  {
    monthApiCall: '11-20',
    first1000: '£0.012500',
    '1001To2500': '£0.010000',
    '2501To5000': '£0.007500',
    '5001To10000': '£0.006250',
    '10001To25000': '£0.005000',
    '25001To50000': '£0.003125',
    above50000: '£0.001250',
  },
  {
    monthApiCall: '21-30',
    first1000: '£0.014500',
    '1001To2500': '£0.011600',
    '2501To5000': '£0.008700',
    '5001To10000': '£0.007250',
    '10001To25000': '£0.005800',
    '25001To50000': '£0.003625',
    above50000: '£0.001450',
  },
  {
    monthApiCall: '31-40',
    first1000: '£0.017000',
    '1001To2500': '£0.013600',
    '2501To5000': '£0.010200',
    '5001To10000': '£0.008500',
    '10001To25000': '£0.006800',
    '25001To50000': '£0.004250',
    above50000: '£0.001700',
  },
  {
    monthApiCall: '41-50',
    first1000: '£0.020000',
    '1001To2500': '£0.016000',
    '2501To5000': '£0.012000',
    '5001To10000': '£0.010000',
    '10001To25000': '£0.008000',
    '25001To50000': '£0.005000',
    above50000: '£0.002000',
  },
  {
    monthApiCall: '51+',
    first1000: '£0.023500',
    '1001To2500': '£0.018800',
    '2501To5000': '£0.014000',
    '5001To10000': '£0.011750',
    '10001To25000': '£0.009400',
    '25001To50000': '£0.005875',
    above50000: '£0.002350',
  },
]

const consumptionCostMethodologyColumns = [
  {
    Header: ' ',
    accessor: ' ',
  },
  {
    Header: 'Month API Call',
    accessor: 'monthApiCall',
  },
  {
    Header: 'First 1,000',
    accessor: 'first1000',
  },
  {
    Header: '1,001 - 2,500',
    accessor: '1001To2500',
  },
  {
    Header: '2,501 - 5,000',
    accessor: '2501To5000',
  },
  {
    Header: '5,001 - 10,000',
    accessor: '5001To10000',
  },
  {
    Header: '10,001 - 25,000',
    accessor: '10001To25000',
  },
  {
    Header: '25,001 - 50,000',
    accessor: '25001To50000',
  },
  {
    Header: 'above 50,000',
    accessor: 'above50000',
  },
]

export const ConsumptionCostMethodologyTable = () => (
  <div className="mt-10">
    <div className="mb-3">
      <u>Calculation of Total Consumption Cost - Methodology:</u>
      <FlexContainerBasic>
        <FlexContainerBasic centerContent>(On last day of monthly billing period)</FlexContainerBasic>
        <Table columns={consumptionCostMethodologyColumns} data={consumptionCostsMethodology} />
      </FlexContainerBasic>
    </div>
  </div>
)
