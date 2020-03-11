import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import {
  Cell,
  DoubleClickPayLoad,
  SelectedMatrix,
  SetContextMenuProp,
  SetData,
  SetSelected,
  ChangedCells,
  ValidateFunction,
  ContextMenuProp,
} from './types'
import {
  getMaxRowAndCol,
  parseCsvFile,
  unparseDataToCsvString,
  convertToCompatibleData,
  convertDataToCsv,
  changedCellsGenerate,
  validatedDataGenerate,
} from './utils'

export const valueRenderer = (cell: Cell): string | null => cell.value

/** Double click on first read-only cell */
export const onDoubleClickCell = (payload: DoubleClickPayLoad, setSelected: SetSelected, onDoubleClickDefault) => (
  ...args
): boolean => {
  /* trigger default handler from lib */
  onDoubleClickDefault(...args)
  const { row, col, maxRowIndex, isReadOnly } = payload
  const isFirstRow = row === 0
  if (isFirstRow && isReadOnly) {
    /* select all row's cells */
    setSelected({
      start: { i: 0, j: col },
      end: { i: maxRowIndex, j: col },
    })
    return true
  }
  return false
}

export const onSelectCells = (setSelected: SetSelected) => ({ start, end }: SelectedMatrix) => {
  setSelected({ start, end })
}

export const handleContextMenu = (setContextMenuProp: SetContextMenuProp) => e => {
  const { clientX, clientY } = e
  e.preventDefault()
  setContextMenuProp({ visible: true, top: clientY, left: clientX + 10 })
}

/** all the customization of cell go here */
export const customCellRenderer = (data: Cell[][], setData: SetData, setSelected: SetSelected) => (
  props: ReactDataSheet.CellRendererProps<Cell>,
) => {
  const { style: defaultStyle, cell, onDoubleClick, ...restProps } = props
  const {
    CustomComponent = false,
    isValidated = true,
    className = '',
    readOnly,
    style: customStyle,
    ...restCell
  } = cell
  const { maxRow: maxRowIndex, maxCol: maxColIndex } = getMaxRowAndCol(data)
  const payload = {
    row: props.row,
    col: props.col,
    maxRowIndex,
    maxColIndex,
    isReadOnly: readOnly,
  }
  const style = {
    ...defaultStyle,
    ...customStyle,
  }

  // those props cannot be passed to DOM elements, ignore it
  const ignorePropKeys = [
    'cell',
    'row',
    'col',
    'columns',
    'attributesRenderer',
    'selected',
    'editing',
    'updated',
    'style',
  ]
  // filter out all ignore props
  const domProps = Object.keys(restProps)
    .filter(key => !ignorePropKeys.includes(key))
    .reduce(
      (accumulator, key) => ({
        ...accumulator,
        [key]: restProps[key],
      }),
      {},
    )

  return (
    <td
      {...domProps}
      {...restCell}
      className={`${props.className} ${!isValidated ? 'error-cell' : ''} ${className}`}
      style={style}
      onDoubleClick={onDoubleClickCell(payload, setSelected, onDoubleClick)}
    >
      {CustomComponent ? (
        <CustomComponent cellRenderProps={props} data={data} setData={setData} setSelected={setSelected} />
      ) : (
        props.children
      )}
    </td>
  )
}

export const handleAddNewRow = (data: Cell[][], setData: SetData, validate?: ValidateFunction) => () => {
  const { maxRow, maxCol } = getMaxRowAndCol(data)
  const lastRow = data[maxRow - 1]
  /* [
      { readOnly: true, value: '' },
      { value: 'A', readOnly: true },
      { value: 'B', readOnly: true },
      { value: 'C', readOnly: true },
      { value: 'D', readOnly: true }
      ]
  */
  /* create array with maxCol length, copy data from lastRow, set value to '' */
  const newEmptyRow = Array(maxCol)
    .fill({ value: '' })
    .map((e, i) => {
      /* copy data of last row's cell, set value to '' */
      if (lastRow[i]) {
        return {
          ...lastRow[i],
          value: '',
        }
      }
      return e
    })

  const newData = [...data, newEmptyRow]
  const dataWithIsValidated = validatedDataGenerate(newData, validate)
  setData(dataWithIsValidated)
}

export const handleCellsChanged = (data: Cell[][], setData: SetData, validate?: ValidateFunction) => changes => {
  const newData = data.map(row => [...row])
  changes.forEach(({ row, col, value }) => {
    newData[row][col] = { ...newData[row][col], value }
  })
  const dataWithIsValidated = validatedDataGenerate(newData, validate)
  setData(dataWithIsValidated)
}

export const handleClickUpload = (ref: React.RefObject<HTMLInputElement>) => () => {
  if (ref.current) {
    /* allow same file input */
    ref.current.value = ''
    ref.current.click()
    return true
  }
  return false
}

export const handleOnChangeInput = (data: Cell[][], setData: SetData, validate?: ValidateFunction) => async (event: {
  target: HTMLInputElement
}) => {
  const { target } = event
  if (target && target.files && target.files[0]) {
    const file = target.files[0]
    const result = await parseCsvFile(file)
    const compatibleData = convertToCompatibleData(result)
    const dataWithIsValidated = validatedDataGenerate(compatibleData, validate)
    setData(dataWithIsValidated)
    return 'validated'
  }
  return false
}

export const handleDownload = (data: Cell[][], window, document: Document | undefined) => (): boolean => {
  /* convert from Cell[][] to string[][] */
  const parseResult = convertDataToCsv(data)
  /* convert from string[][] to string */
  const csvData = unparseDataToCsvString(parseResult)
  const dataBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  if (window && document) {
    const file = window.URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.download = `reapit-${new Date()}.csv`
    link.href = file
    document.body.appendChild(link)
    link.click()
    return true
  }
  return false
}

export const hideContextMenu = (prev: ContextMenuProp): ContextMenuProp => ({ ...prev, visible: false })

export const handleSetContextMenu = (setContextMenuProp: SetContextMenuProp) => () => {
  /**
   * To hide context menu when click outside.
   * must use window instead of document for stopPropagation to work
   * https://github.com/facebook/react/issues/4335
   */
  window.addEventListener('click', setContextMenuProp as any)
}

export const handleAfterDataChanged = (
  data: Cell[][],
  prevData?: Cell[][],
  afterDataChanged?: (data: Cell[][], changedCells: ChangedCells) => any,
) => () => {
  const changedCells = changedCellsGenerate(data, prevData)
  if (typeof afterDataChanged === 'function') {
    afterDataChanged(data, changedCells)
  }
}

export const handleInitialDataChanged = (
  initialData: Cell[][],
  data: Cell[][],
  setData: SetData,
  validateFunction?: ValidateFunction,
) => () => {
  const newData = validatedDataGenerate(initialData, validateFunction)
  setData(newData)
}
