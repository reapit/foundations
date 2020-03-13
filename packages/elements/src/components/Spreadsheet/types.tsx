import * as React from 'react'
import ReactDataSheet from 'react-datasheet'

export class MyReactDataSheet extends ReactDataSheet<Cell, string | null> {}

/** Cell contain predefined value
 * https://github.com/nadbm/react-datasheet/blob/master/types/react-datasheet.d.ts
 * plus some properties below
 */
export type ChangedCells = { oldCell: Cell; row: number; col: number; newCell: Cell }[]
export type SetData = React.Dispatch<React.SetStateAction<Cell[][]>>
export type SetSelected = React.Dispatch<React.SetStateAction<SelectedMatrix | null>>
export interface Cell extends ReactDataSheet.Cell<Cell, string | null> {
  value: string | null
  isValidated?: boolean
  /** Additional className for styling cell */
  className?: string
  style?: React.CSSProperties
  CustomComponent?: React.FC<{
    data: Cell[][]
    cellRenderProps: ReactDataSheet.CellRendererProps<Cell, string | null>
    setData: SetData
    setSelected: SetSelected
    afterCellsChanged?: AfterCellsChanged
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
export type AfterCellsChanged = (changes: ChangedCells, data: Cell[][], setData: SetData) => any
export type AfterDataChanged = (changes: ChangedCells, data: Cell[][]) => any

export interface SpreadsheetProps {
  data: Cell[][]
  description?: React.ReactNode
  hasUploadButton?: boolean
  hasDownloadButton?: boolean
  hasAddButton?: boolean
  /**
   * The validate function will be called everytime data changed, should return
   * format like [[true, false], [true, true]] and have to match with spreadsheet data
   */
  validate?: ValidateFunction
  afterCellsChanged?: AfterCellsChanged
  afterDataChanged?: AfterDataChanged
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
  setContextMenuProp: SetContextMenuProp
  onCellsChanged: OnCellsChanged
  data: Cell[][]
}

export type ChangesArray = ReactDataSheet.CellsChangedArgs<Cell, string | null>
export type OnCellsChanged = (changes: ChangesArray) => any
