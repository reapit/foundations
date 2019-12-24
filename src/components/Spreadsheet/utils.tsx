import * as React from 'react'
import Papa from 'papaparse'
import { Cell } from './types'

/** Get max row and col of data */
export const getMaxRowAndCol = (data: Cell[][]): { maxRow: number; maxCol: number } => {
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
  setData: React.Dispatch<Cell[][]>
): void => {
  const newData = JSON.parse(JSON.stringify(data))
  newData[row][col].value = cellData
  setData(newData)
}

export const parseCsvFile = (file: File): Promise<Papa.ParseResult> =>
  new Promise(resolve => {
    Papa.parse(file, {
      complete: (results: Papa.ParseResult) => {
        resolve(results)
      }
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
export const convertDataToCsv = (data: Cell[][]): string[][] => data.map(rowArray => rowArray.map(({ value }) => value))
