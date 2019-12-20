import * as React from 'react'
import ReactDataSheet from 'react-datasheet'

export class MyReactDataSheet extends ReactDataSheet<Cell, string> {}

/** Cell contain predefined value
 * https://github.com/nadbm/react-datasheet/blob/master/types/react-datasheet.d.ts
 * plus some properties below
 */
export interface Cell extends ReactDataSheet.Cell<Cell, string> {
  /** The value of the cell, always a string */
  value: string
  /** The validate function, receive Cell as param, must return boolean */
  validate?: (cell: Cell) => boolean
  /** Additional className for styling cell */
  className?: string
  style?: React.CSSProperties
  CustomComponent?: React.FC<{
    data: Cell[][]
    cellRenderProps: ReactDataSheet.CellRendererProps<Cell>
    setData: React.Dispatch<Cell[][]>
    setSelected: React.Dispatch<SelectedMatrix>
  }>
}

export interface CellWithValidate extends Cell {
  validate: (cell: Cell) => boolean
}

export interface DoubleClickPayLoad {
  row: number
  col: number
  maxRowIndex: number
  maxColIndex: number
  isReadOnly?: boolean
}

export interface SpreadsheetProps {
  data: Cell[][]
  description?: React.ReactNode
  hasUploadButton?: boolean
  hasDownloadButton?: boolean
  hasAddButton?: boolean
  /** This will run before data is set to table, must return data with validate function */
  validateUpload?: (data: Cell[][]) => CellWithValidate[][]
}

export interface SelectedMatrix {
  start: ReactDataSheet.Location
  end: ReactDataSheet.Location
}
