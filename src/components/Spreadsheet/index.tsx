import * as React from 'react'
import ReactDataSheet from 'react-datasheet'

export type valueType = string

export interface DataType {
  value: valueType
  component?: React.ReactNode
}

export interface GridElement extends ReactDataSheet.Cell<GridElement, valueType> {
  value: valueType
}
export interface SpreadSheetProps {}

const data = [
  [{ value: '1', component: <button onClick={() => console.log('clicked')}>Rendered</button> }, { value: '3' }],
  [{ value: '2' }, { value: '4' }]
]

class MyReactDataSheet extends ReactDataSheet<GridElement, valueType> {}

export const Spreadsheet: React.FC<SpreadSheetProps> = () => {
  return (
    <div className="spreadsheet">
      <MyReactDataSheet
        data={data}
        valueRenderer={cell => cell.value}
        cellRenderer={({ cell, children, className, style, ...rest }) => {
          return (
            <td className={className} style={style as React.CSSProperties} {...rest}>
              {children}
            </td>
          )
        }}
      />
    </div>
  )
}
