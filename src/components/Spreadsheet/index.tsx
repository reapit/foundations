import * as React from 'react'
import ReactDataSheet from 'react-datasheet'

export class MyReactDataSheet extends ReactDataSheet<Cell, string> {}

/* CellProps type contain several type like row, col, Cell, ... */
export interface Cell extends ReactDataSheet.Cell<Cell, string> {
  /** The value of the cell, always a string */
  value: string
  /** The validate function, receive Cell as param, must return boolean */
  validate?: (cell: Cell) => boolean
  /* Additional className of cell */
  className?: string
}

export type CellProps = ReactDataSheet.CellRendererProps<Cell>

export interface DoubleClickPayLoad {
  row: number
  col: number
  maxRowIndex: number
  maxColIndex: number
  isReadOnly?: boolean
}

export const onDoubleClickCell = (payload: DoubleClickPayLoad, setSelected, onDoubleClickDefault) => (
  e: React.MouseEvent
) => {
  onDoubleClickDefault(e)
  const { row, col, maxRowIndex, maxColIndex, isReadOnly } = payload
  const isFirstRow = row === 0
  const isFirstCol = col === 0
  if (isFirstCol && isFirstRow) {
    return
  }
  if (isFirstCol && isReadOnly) {
    setSelected({
      start: { i: row, j: 0 },
      end: { i: row, j: maxColIndex }
    })
    return
  }
  if (isFirstRow && isReadOnly) {
    setSelected({
      start: { i: 0, j: col },
      end: { i: maxRowIndex, j: col }
    })
    return
  }
}

export interface SpreadSheetProps extends ReactDataSheet.DataSheetProps<Cell, string> {}

export const customCellRenderer = (data: Cell[][], setSelected) => (props: ReactDataSheet.CellRendererProps<Cell>) => {
  const { style, cell, ...restProps } = props
  const { validate = () => true, className = '', readOnly, ...restCell } = cell
  /* const isValid = validate(cell) */
  const payload = {
    row: props.row,
    col: props.col,
    maxRowIndex: data.length,
    maxColIndex: data[0].length,
    isReadOnly: readOnly
  }
  return (
    <td
      {...restProps}
      {...restCell}
      className={`${props.className} ${className}`}
      style={style as React.CSSProperties}
      onDoubleClick={onDoubleClickCell(payload, setSelected, props.onDoubleClick)}
    >
      {props.children}
    </td>
  )
}

export const onSelect = setSelected => ({ start, end }) => {
  setSelected({ start, end })
}

export const Spreadsheet: React.FC<SpreadSheetProps> = ({ data, valueRenderer, ...rest }) => {
  const [selected, setSelected] = React.useState<{
    start: ReactDataSheet.Location
    end: ReactDataSheet.Location
  } | null>(null)

  const cellRenderer = React.useCallback(customCellRenderer(data, setSelected), [])
  return (
    <div className="spreadsheet">
      <MyReactDataSheet
        data={data}
        valueRenderer={valueRenderer}
        selected={selected}
        onSelect={({ start, end }) => {
          setSelected({ start, end })
        }}
        {...rest}
        cellRenderer={cellRenderer}
      />
    </div>
  )
}
