import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import {
  Cell,
  DoubleClickPayLoad,
  SelectedMatrix,
  SetContextMenuProp,
  SetData,
  SetSelected,
  ValidateFunction,
  ContextMenuProp,
  AfterDataChanged,
  AfterCellsChanged,
  ChangesArray,
  SetUploadData,
  UploadData,
  InvalidIndies,
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
export const customCellRenderer = (
  data: Cell[][],
  setData: SetData,
  setSelected: SetSelected,
  afterCellsChanged?: AfterCellsChanged,
) => (props: ReactDataSheet.CellRendererProps<Cell, string | null>) => {
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
        <CustomComponent
          cellRenderProps={props}
          data={data}
          setData={setData}
          setSelected={setSelected}
          afterCellsChanged={afterCellsChanged}
        />
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

export const handleCellsChanged = (
  data: Cell[][],
  setData: SetData,
  validate?: ValidateFunction,
  afterCellsChanged?: AfterCellsChanged,
) => (changes: ChangesArray): any => {
  if (changes.length === 0) {
    return
  }
  const newData = data.map(row => [...row])
  // remove row case
  let newCell: Cell = { value: 'newValue' }
  if (changes.every(({ value, row }, index, changesArray) => value === null && row === changesArray[0].row)) {
    const rowIndexToRemove = changes[0].row
    newData.splice(rowIndexToRemove, 1)
    newCell = { value: null }
  }
  // remove column case
  else if (changes.every(({ value, col }, index, changesArray) => value === null && col === changesArray[0].col)) {
    const colIndexToRemove = changes[0].col
    newData.forEach((row, rowIndex) => {
      newData[rowIndex].splice(colIndexToRemove, 1)
    })
    newCell = { value: null }
  }
  // all other cases
  else {
    changes.forEach(({ row, col, value }) => {
      newData[row][col] = { ...newData[row][col], value }
    })
  }
  // validate data after changed
  const dataWithIsValidated = validatedDataGenerate(newData, validate)
  if (typeof afterCellsChanged === 'function') {
    const changedCells = changes.map(({ row, col }) => ({
      oldCell: data[row][col],
      row,
      col,
      /* Replace newCell with validated data, if cannot find, then it was deleted,
         replace with value = null */
      newCell: newCell.value === null ? { value: null } : dataWithIsValidated[row][col],
    }))
    afterCellsChanged(changedCells, dataWithIsValidated, setData)
  }
  // and set to spreadsheet
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

export const handleOnChangeInput = ({
  setUploadData,
  maxUploadRow,
  validate,
}: {
  setUploadData: SetUploadData
  maxUploadRow: number
  validate?: ValidateFunction
}) => async (event: { target: HTMLInputElement }) => {
  try {
    const { target } = event
    if (target && target.files && target.files[0]) {
      const file = target.files[0]
      const result = await parseCsvFile(file)
      const compatibleData = convertToCompatibleData(result)
      const totalRow = compatibleData.length
      // only allow maxUploadRow row
      const slicedData = compatibleData.slice(0, maxUploadRow)
      if (typeof validate !== 'function') {
        setUploadData(
          setUploadDataCallback({
            validatedData: slicedData.map(row => row.map(cell => ({ ...cell, isValidated: true }))),
            invalidIndies: [],
            totalRow,
            exceedMaxRow: totalRow > maxUploadRow,
            isModalOpen: true,
          }),
        )
        return 'not validated'
      }
      // remove all invalid rows
      let dataWithInvalidRowsRemoved: Cell[][] = []
      // store row, col, cell of invalid rows
      let invalidIndies: InvalidIndies = []
      const validateMatrix = validate(compatibleData)
      // loop through, validate each cell
      // if invalid cell, push into invalidIndies
      // only push into dataWithInvalidRowsRemoved if all cells in that row are valid
      slicedData.forEach((row, rowIndex) => {
        let currentRowValid = true
        const currentRow = [...row]
        currentRow.forEach((cell, colIndex) => {
          currentRow[colIndex] = { ...currentRow[colIndex], isValidated: validateMatrix[rowIndex][colIndex] }
          if (!currentRow[colIndex].isValidated) {
            invalidIndies.push({ row: rowIndex, col: colIndex, cell: currentRow[colIndex] })
            currentRowValid = false
            return
          }
        })
        if (currentRowValid) {
          dataWithInvalidRowsRemoved.push(currentRow)
        }
      })

      setUploadData(
        setUploadDataCallback({
          validatedData: dataWithInvalidRowsRemoved,
          invalidIndies,
          isModalOpen: true,
          totalRow,
          exceedMaxRow: totalRow > maxUploadRow,
        }),
      )
      return 'validated'
    }
    return false
  } catch (err) {
    setUploadData(
      setUploadDataCallback({
        validatedData: [],
        invalidIndies: [],
        isModalOpen: true,
        totalRow: 0,
      }),
    )
    return 'error'
  }
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
  afterDataChanged?: AfterDataChanged,
) => () => {
  if (typeof afterDataChanged === 'function') {
    const changedCells = changedCellsGenerate(data, prevData)
    afterDataChanged(changedCells, data)
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

export const handleCloseUploadModal = (setUploadData: SetUploadData) => () =>
  setUploadData(setUploadDataCallback({ isModalOpen: false }))

export const handleProcessValidRows = (setUploadData: SetUploadData) => () =>
  setUploadData(setUploadDataCallback({ shouldProcess: true, isModalOpen: false }))

export const setUploadDataCallback = (uploadDataPartial: Partial<UploadData>) => (prev: UploadData) => ({
  ...prev,
  ...uploadDataPartial,
})
