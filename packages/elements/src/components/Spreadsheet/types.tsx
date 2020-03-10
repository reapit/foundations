import * as React from 'react'
import ReactDataSheet from 'react-datasheet'

export class MyReactDataSheet extends ReactDataSheet<Cell, string> {}

/** Cell contain predefined value
 * https://github.com/nadbm/react-datasheet/blob/master/types/react-datasheet.d.ts
 * plus some properties below
 */
export type ChangedCells = { oldCell: Cell; row: number; col: number; newCell: Cell }[]
export type SetData = React.Dispatch<React.SetStateAction<Cell[][]>>
export type SetSelected = React.Dispatch<React.SetStateAction<SelectedMatrix | null>>
export interface Cell extends ReactDataSheet.Cell<Cell, string> {
  /** The value of the cell, always a string */
  value: string | null
  /** The validate function, receive Cell as param, must return boolean */
  isValidated?: boolean
  /** Additional className for styling cell */
  className?: string
  style?: React.CSSProperties
  CustomComponent?: React.FC<{
    data: Cell[][]
    cellRenderProps: ReactDataSheet.CellRendererProps<Cell>
    setData: SetData
    setSelected: SetSelected
  }>
}

export interface DoubleClickPayLoad {
  row: number
  col: number
  maxRowIndex: number
  maxColIndex: number
  isReadOnly?: boolean
}

export type ValidateFunction = (data: Cell[][]) => boolean[][]

export interface SpreadsheetProps {
  data: Cell[][]
  description?: React.ReactNode
  hasUploadButton?: boolean
  hasDownloadButton?: boolean
  hasAddButton?: boolean
  /** This will run before data is set to table, must return data with validate function */
  validate?: ValidateFunction
  afterDataChanged?: (data: Cell[][]) => any
}

export type SelectedMatrix = {
  start: ReactDataSheet.Location
  end: ReactDataSheet.Location
}

export interface ContextMenuProp {
  visible: boolean
  top: number
  left: number
}

export type SetContextMenuProp = React.Dispatch<React.SetStateAction<ContextMenuProp>>

export interface ContextMenuData {
  label: string
  items: { id: string; text: string }[]
}

export interface ContextMenuFCProps {
  selected: SelectedMatrix | null
  contextMenuProp: ContextMenuProp
  setData: SetData
  setContextMenuProp: SetContextMenuProp
}
