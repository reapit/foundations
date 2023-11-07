import { cx } from '@linaria/core'
import { Card, Table } from '@reapit/elements'
import React, { FC } from 'react'
import { elDataVisualCard, ElDataVisualSingularValue } from './data-visual-styles'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export type DataVisualPropsType<T extends { [s: string]: any }> = {
  type: 'graph' | 'singular' | 'table'
  data: T[]
  question: string
}

const displayValueAsString = (key: string, value: any): string => {
  let prefix = ''
  let suffix = ''

  if (key.includes('PERCENT')) suffix = '%'
  if (key.includes('PRICE')) prefix = '£'

  return `${prefix}${convertKeyToUsefulString(key, value)}${suffix}`
}

const convertKeyToUsefulString = (key: string, value): string => {
  switch (key) {
    case 'MONTH':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][value - 1]
    default:
      return value
  }
}

const DataGraph: FC<{ data: { [s: string]: any }[] }> = ({ data }) => {
  return (
    <div style={{ height: '500px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={Object.keys(data[0])[0]} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={Object.keys(data[0])[1]} fill="#322bbd" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const DataSingular: FC<{ data: { [s: string]: any }[] }> = ({ data }) => {
  return (
    <ElDataVisualSingularValue>
      {displayValueAsString(Object.keys(data[0])[0], Object.values(data[0])[0])}
    </ElDataVisualSingularValue>
  )
}

const DataTable: FC<{ data: { [s: string]: any }[] }> = ({ data }) => {
  return (
    <div>
      <Table
        rows={data.map((row) => ({
          cells: Object.keys(row)
            .filter((key) => !key.includes('ID'))
            .map((key) => ({
              label: key.toLowerCase().replaceAll('_', ' '),
              value: displayValueAsString(key, row[key]),
            })),
        }))}
      />
    </div>
  )
}

export const DataVisual: FC<DataVisualPropsType<{ [s: string]: any }>> = ({ data, type, question }) => {
  return (
    <Card
      className={cx(elDataVisualCard)}
      hasMainCard
      mainCardHeading={question}
      mainCardBody={
        type === 'graph' ? (
          <DataGraph data={data} />
        ) : type === 'table' ? (
          <DataTable data={data} />
        ) : (
          <DataSingular data={data} />
        )
      }
    />
  )
}
