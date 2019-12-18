import * as React from 'react'
import { MyReactDataSheet, Cell, SpreadsheetProps, SelectedMatrix } from './types'
import {
  valueRenderer,
  onSelectCells,
  customCellRenderer,
  handleAddNewRow,
  handleCellsChanged
  /* handleContextMenu */
} from './handlers'
import { Button } from '../Button'

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
  data: initialData,
  description = '',
  hasUploadButton = true,
  hasDownloadButton = true,
  hasAddButton = true
}) => {
  const [selected, setSelected] = React.useState<SelectedMatrix | null>(null)

  const [data, setData] = React.useState<Cell[][]>(initialData)

  const cellRenderer = React.useCallback(customCellRenderer(data, setSelected), [data])
  const onSelect = React.useCallback(onSelectCells(setSelected), [])
  const onCellsChanged = React.useCallback(handleCellsChanged(data, setData), [data])
  const addNewRow = React.useCallback(handleAddNewRow(data, setData), [data])

  return (
    <div className="spreadsheet">
      <div className="wrap-top">
        <div className="description">{description}</div>
        <div className="button-group">
          {hasUploadButton && (
            <div className="upload-button">
              <Button type="submit" variant="info">
                Upload file
              </Button>
            </div>
          )}
          {hasDownloadButton && (
            <div className="download-button">
              <Button type="submit" variant="info">
                Download file
              </Button>
            </div>
          )}
        </div>
      </div>
      <MyReactDataSheet
        overflow="clip"
        data={data}
        selected={selected}
        valueRenderer={valueRenderer}
        onCellsChanged={onCellsChanged}
        onSelect={onSelect}
        /* onContextMenu={handleContextMenu} */
        cellRenderer={cellRenderer}
      />
      <div className="wrap-bottom">
        {hasAddButton && (
          <div className="add-button">
            <Button type="submit" variant="info" onClick={addNewRow}>
              Add new
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export * from './types'
export * from './utils'
