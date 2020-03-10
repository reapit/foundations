import * as React from 'react'
import Papa from 'papaparse'
import { Cell, SetData, ValidateFunction, ChangedCells } from './types'

export const usePrevious = value => {
  const ref = React.useRef()
  /* istanbul ignore next */
  React.useEffect(() => {
    ref.current = value
  })
  return ref.current
}

/** Get max row and col of data */
export const getMaxRowAndCol = (data?: Cell[][]): { maxRow: number; maxCol: number } => {
  if (!data) {
    return { maxRow: 0, maxCol: 0 }
  }
  const maxRow = data.length
  /* default to 0 */
  let maxCol = 0
  /* check every row to find max length of column */
  data.forEach(row => {
    const numberOfCurrentRowColumn = row.length
    if (maxCol < numberOfCurrentRowColumn) {
      maxCol = numberOfCurrentRowColumn
    }
  })
  return { maxRow, maxCol }
}

export const setCurrentCellValue = (
  cellData: string,
  data: Cell[][],
  row: number,
  col: number,
  setData: SetData,
): void => {
  const newData = data.map(row => row.map(cell => ({ ...cell })))
  newData[row][col].value = cellData
  setData(newData)
}

export const parseCsvFile = (file: File): Promise<Papa.ParseResult> =>
  new Promise(resolve => {
    Papa.parse(file, {
      complete: (results: Papa.ParseResult) => {
        resolve(results)
      },
    })
  })

/** convert to string to download */
export const unparseDataToCsvString = (parseResult: string[][]): string => Papa.unparse(parseResult)
/**
 * Convert from ParseResult to Cell[][]
 * Convert from [['value1', 'value2'], ['value3', 'value4']]
 * to [[{value: 'value1'}, {value: ''}], [{value: 'value3'}, {value: 'value4'}]]
 * for compatible reason
 */
export const convertToCompatibleData = (parsedResult): Cell[][] =>
  parsedResult.data.map(rowArray => rowArray.map(value => ({ value })))

/**
 * Convert back from Cell[][] to string[][]
 */
export const convertDataToCsv = (data: Cell[][]): string[][] =>
  data.map(rowArray => rowArray.map(({ value }) => value)) as string[][]

// Diffing algorithm to find differences between data array
export const changedCellsGenerate = (newData?: Cell[][], oldData?: Cell[][]): ChangedCells => {
  const { maxCol: maxColOld, maxRow: maxRowOld } = getMaxRowAndCol(oldData)
  const { maxCol: maxColNew, maxRow: maxRowNew } = getMaxRowAndCol(newData)
  const maxRow = Math.max(maxRowNew, maxRowOld)
  const maxCol = Math.max(maxColNew, maxColOld)
  const changedCells: ChangedCells = []
  for (let rowIndex = 0; rowIndex < maxRow; rowIndex++) {
    for (let colIndex = 0; colIndex < maxCol; colIndex++) {
      const oldCell = oldData?.[rowIndex]?.[colIndex] ?? { value: null }
      const newCell = newData?.[rowIndex]?.[colIndex] ?? { value: null }
      if (oldCell.value !== newCell.value) {
        changedCells.push({
          oldCell,
          row: rowIndex,
          col: colIndex,
          newCell,
        })
      }
    }
  }
  return changedCells
}

export const validatedDataGenerate = (data: Cell[][], validateFunction?: ValidateFunction): Cell[][] => {
  // if valdateFunction is not set, then by default isValidated = true
  const dataWithIsValidated =
    typeof validateFunction === 'function'
      ? data.map((row, rowIndex) =>
          row.map((cell, colIndex) => ({ ...cell, isValidated: validateFunction(data)[rowIndex][colIndex] })),
        )
      : data.map(row => row.map(cell => ({ ...cell, isValidated: true })))
  return dataWithIsValidated
}
