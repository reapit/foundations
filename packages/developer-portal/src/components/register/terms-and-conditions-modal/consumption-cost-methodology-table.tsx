import { BodyText, elMb11, Table } from '@reapit/elements'
import React from 'react'

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

export const ConsumptionCostMethodologyTable = () => (
  <>
    <BodyText>Calculation of Total Consumption Cost - Methodology (On last day of monthly billing period):</BodyText>
    <Table
      className={elMb11}
      rows={consumptionCostsMethodology.map((item) => ({
        cells: [
          {
            label: 'Month API Call',
            value: item['monthApiCall'],
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'First 1,000',
            value: item['first1000'],
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: '1,001 - 2,500',
            value: item['1001To2500'],
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: '2,501 - 5,000',
            value: item['2501To5000'],
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: '5,001 - 10,000',
            value: item['5001To10000'],
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: '10,001 - 25,000',
            value: item['10001To25000'],
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: '25,001 - 50,000',
            value: item['25001To50000'],
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'above 50,000',
            value: item['above50000'],
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
        ],
      }))}
    />
  </>
)
