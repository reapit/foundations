import * as React from 'react'
import Papa from 'papaparse'
import { Cell, SetData, ValidateFunction, ChangedCells, InvalidIndies, ValidateValue } from './types'

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

export const parseCsvFile = (file: File): Promise<Papa.ParseResult<any>> =>
  new Promise(resolve => {
    Papa.parse(file, {
      complete: (results: Papa.ParseResult<any>) => {
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

/**
 * data with isValidated setted
 * and readOnly set to true if
 *   - allowOnlyOneValidationErrorPerRow = true and belonge to invalidated row and is validated cell
 */
export const generateDataWithReadOnlyAndIsValidated = ({
  data,
  allowOnlyOneValidationErrorPerRow,
  validateFunction,
}: {
  data: Cell[][]
  allowOnlyOneValidationErrorPerRow: boolean
  validateFunction?: ValidateFunction
}) => {
  let dataWithIsGeneratedAndReadOnly = validatedDataGenerate(data, validateFunction)

  if (allowOnlyOneValidationErrorPerRow) {
    const invalidatedRowIndexSet = generateInvalidatedRowIndexSet(dataWithIsGeneratedAndReadOnly)

    dataWithIsGeneratedAndReadOnly = generateDataWithReadOnly({
      data: dataWithIsGeneratedAndReadOnly,
      invalidatedRowIndexSet: invalidatedRowIndexSet,
    })
  }

  return dataWithIsGeneratedAndReadOnly
}

/**
 * to be used together with allowOnlyOneValidationErrorPerRow option
 * ^ (alterDataWithReadOnly) will set readOnly to every validated cell on that row except the invalidaed row
 */
export interface generateDataWithReadOnlyParams {
  data: Cell[][]
  invalidatedRowIndexSet: Set<number>
}

/**
 * if cell is header row or cell's fixedReadOnly property = true, ignore cell
 * If cell belong to invalidated row, set readOnly to false if cell is validated, else set readOnly to true
 * If cell belong to validated row, set readOnly to true
 */
export const generateDataWithReadOnly = ({ data, invalidatedRowIndexSet }: generateDataWithReadOnlyParams) =>
  data.map((row, rowIndex) => {
    const isInvalidatedRow = invalidatedRowIndexSet.has(rowIndex)
    return row.map(cell => {
      // ignore header row
      const isHeaderRow = rowIndex === 0
      if (isHeaderRow || cell.fixedReadOnly) {
        return cell
      }

      if (!isInvalidatedRow) {
        // set readOnly to false incase of it has been setted to false if it belonged invalidated row in the past
        // and readOnly was setted to true
        return { ...cell, readOnly: false }
      }

      // isInvalidatedRow = false and is invalidatedCell
      // ignore invalidated cell
      const isInvalidatedCell = cell?.isValidated === false
      if (isInvalidatedCell) {
        // set readOnly to false incase of it has been setted to false if it belonged invalidated row in the past
        return { ...cell, readOnly: false }
      }

      // isInvalidatedRow = false and is validated cell
      return { ...cell, readOnly: true }
    })
  })

/**
 * to be used together with allowOnlyOneValidationErrorPerRow option
 * This set will contain invalidated row
 */
export const generateInvalidatedRowIndexSet: (data: Cell[][]) => Set<number> = data =>
  data.reduce((isInvalidatedRowSet, row, rowIndex) => {
    row.forEach(cell => {
      if (cell?.isValidated === false) {
        isInvalidatedRowSet.add(rowIndex)
      }
    })
    return isInvalidatedRowSet
  }, new Set<number>())

export const validatedDataGenerate = (data: Cell[][], validateFunction?: ValidateFunction): Cell[][] => {
  // if valdateFunction is not set, then by default isValidated = true
  if (typeof validateFunction === 'function') {
    const validateMatrix = validateFunction(data)
    return data.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        return typeof validateMatrix[rowIndex][colIndex] === 'string'
          ? { ...cell, isValidated: false, error: validateMatrix[rowIndex][colIndex] }
          : { ...cell, isValidated: validateMatrix[rowIndex][colIndex] }
      })
    }) as Cell[][]
  }
  return data.map(row => row.map(cell => ({ ...cell, isValidated: true })))
}

/**
 * Calculate number of invalid rows, using invalidIndies
 */
export const calculateNumberOfInvalidRows = (invalidIndies: InvalidIndies): number => {
  let hashMap = {}
  invalidIndies.forEach(({ row }) => {
    if (hashMap[row]) {
      hashMap[row]++
      return
    }
    hashMap[row] = 1
  })
  return Object.keys(hashMap).length
}

/**
 * Remove all rows which include at least one invalid row
 */
export const createDataWithInvalidRowsRemoved = (
  data: Cell[][],
  validateMatrix: ValidateValue[][],
): { dataWithInvalidRowsRemoved: Cell[][]; invalidIndies: InvalidIndies } => {
  let dataWithInvalidRowsRemoved: Cell[][] = []
  // store row, col, cell of invalid rows
  let invalidIndies: InvalidIndies = []
  // loop through, check validate each cell
  // if invalid cell, push into invalidIndies
  // only push into dataWithInvalidRowsRemoved if all cells in that row are valid
  data.forEach((row, rowIndex) => {
    let currentRowValid = true
    const currentRow = [...row]
    currentRow.forEach((cell, colIndex) => {
      currentRow[colIndex] = { ...currentRow[colIndex], isValidated: validateMatrix[rowIndex][colIndex] }
      if (typeof currentRow[colIndex].isValidated !== 'boolean' || !currentRow[colIndex].isValidated) {
        invalidIndies.push({ row: rowIndex, col: colIndex, cell: currentRow[colIndex] })
        currentRowValid = false
        return
      }
    })
    if (currentRowValid) {
      dataWithInvalidRowsRemoved.push(currentRow)
    }
  })
  console.log('xxx format', dataWithInvalidRowsRemoved, invalidIndies)
  return { dataWithInvalidRowsRemoved, invalidIndies }
}
