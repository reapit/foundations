import * as React from 'react'
import Papa from 'papaparse'
import { Cell } from './types'

/** Get max row and col of data */
export const getMaxRowAndCol = (data: Cell[][]) => {
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
  return [maxRow, maxCol]
}

export const setCurrentCellValue = (
  cellData: string,
  data: Cell[][],
  row: number,
  col: number,
  setData: React.Dispatch<Cell[][]>
): void => {
  const newData = [...data]
  newData[row][col].value = cellData
  setData(newData)
}

export const parseCsvFile = (file: File): Promise<Papa.ParseResult> =>
  new Promise((resolve, rejects) => {
    Papa.parse(file, {
      complete: (results: Papa.ParseResult) => {
        resolve(results)
      },
      error: (errors: Papa.ParseError) => {
        rejects(errors)
      }
    })
  })

export const convertToCompatibleData = (parsedResult: Papa.ParseResult): Cell[][] =>
  parsedResult.data.map(rowArray => rowArray.map(value => ({ value })))

/* export const convertDataToCsv = (data: Cell[][]) */
