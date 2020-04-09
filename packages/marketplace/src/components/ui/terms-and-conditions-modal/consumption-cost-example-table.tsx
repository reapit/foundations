import React from 'react'
import styles from '@/styles/blocks/consumption-cost-example-table.scss?mod'

const consumptionCosts = [
  { callWithinBand: '1,000', bandCostPerCall: '£0.014500', costPerBand: '£14.50' },
  { callWithinBand: '1,500', bandCostPerCall: '£0.011600', costPerBand: '£17.40' },
  { callWithinBand: '2,500', bandCostPerCall: '£0.008700', costPerBand: '£21.75' },
  { callWithinBand: '5,000', bandCostPerCall: '£0.007250', costPerBand: '£36.25' },
  { callWithinBand: '15,000', bandCostPerCall: '£0.005800', costPerBand: '£87.00' },
  { callWithinBand: '25,000', bandCostPerCall: '£0.003625', costPerBand: '£90.63' },
  { callWithinBand: '50,000', bandCostPerCall: '£0.001450', costPerBand: '£72.50' },
]

export const ConsumptionCostExampleTable = () => (
  <div className="mt-10">
    <div className="mb-3">
      <u>Calculation of Total Consumption Cost - Example for representative purposes only: </u>
    </div>
    <table className={styles['table']}>
      <tr>
        <th>
          <u>Example</u>
        </th>
      </tr>
      <tr>
        <th>Endpoints used</th>
        <td>21-30</td>
      </tr>
      <tr>
        <th>Monthly API calls</th>
        <td>100,000</td>
      </tr>
      <tr>
        <th>Calls within band (A)</th>
        {consumptionCosts.map(({ callWithinBand }) => (
          <td key={callWithinBand}>{callWithinBand}</td>
        ))}
      </tr>
      <tr>
        <th>Band cost per call (B)</th>
        {consumptionCosts.map(({ bandCostPerCall }) => (
          <td key={bandCostPerCall}>{bandCostPerCall}</td>
        ))}
      </tr>
      <tr>
        <th>Cost per band (A)</th>
        {consumptionCosts.map(({ costPerBand }) => (
          <td key={costPerBand}>{costPerBand}</td>
        ))}
      </tr>
      <tr>
        <th className={styles['total-cost-th-cell']}>Total monthly cost</th>
        <td className={styles['total-cost-td-cell']}>£340.03</td>
      </tr>
    </table>
  </div>
)
