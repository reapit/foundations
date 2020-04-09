import React from 'react'
import styles from '@/styles/blocks/consumption-cost-methodology-table.scss?mod'

const columns = [
  'Monthly API Calls',
  'first 1,000',
  '1,001-2,500',
  '2,501-5,000',
  '5,001-10,000',
  '10,001-25,000',
  '25,001-50,000',
  'above 50,000',
]

// ^ data matched columns above
const consumptionCostsByMonth = [
  ['1-5', '£0.010000', '£0.008000', '£0.006000', '£0.005000', '£0.004000', '£0.002500', '£0.001000'],
  ['6-10', '£0.011000', '£0.008800', '£0.006600', '£0.005500', '£0.004400', '£0.00270', '£0.001100'],
  ['11-20', '£0.012500', '£0.010000', '£0.007500', '£0.006250', '£0.005000', '£0.003125', '£0.001250'],
  ['21-30', '£0.014500', '£0.011600', '£0.008700', '£0.007250', '£0.005800', '£0.003625', '£0.001450'],
  ['31-40', '£0.017000', '£0.013600', '£0.010200', '£0.008500', '£0.006800', '£0.004250', '£0.001700'],
  ['41-50', '£0.020000', '£0.016000', '£0.012000', '£0.010000', '£0.008000', '£0.005000', '£0.002000'],
  ['51+', '£0.023500', '£0.018800', '£0.014000', '£0.011750', '£0.009400', '£0.005875', '£0.002350'],
]

export const ConsumptionCostMethodologyTable = () => (
  <div className="mt-10">
    <div className="mb-3">
      <u>Calculation of Total Consumption Cost - Methodology:</u>
      <table className={`table is-bordered ${styles['table']}`}>
        <tr>
          {columns.map(column => (
            <th key={column}>{column}</th>
          ))}
        </tr>
        <tr>
          <td></td>
          <td className={styles['title-cell']} colSpan={7}>
            cost per API Call
          </td>
        </tr>
        {consumptionCostsByMonth.map((consumptionCosts, index) => (
          <tr key={index}>
            {consumptionCosts.map(consumptionCost => (
              <td key={consumptionCost}>{consumptionCost}</td>
            ))}
          </tr>
        ))}
        <tr>
          <td className={styles['title-cell']} colSpan={8}>
            Number of Endpoints used (on last day of monthly billing period)
          </td>
        </tr>
      </table>
    </div>
  </div>
)
