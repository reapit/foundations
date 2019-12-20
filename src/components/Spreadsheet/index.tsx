import * as React from 'react'
import { MyReactDataSheet, Cell, SpreadsheetProps, SelectedMatrix } from './types'
import {
  valueRenderer,
  onSelectCells,
  customCellRenderer,
  handleAddNewRow,
  handleCellsChanged,
  handleClickUpload,
  handleOnChangeInput,
  handleDownload
  /* handleContextMenu */
} from './handlers'
import { Button } from '../Button'

export const UploadButton = ({ onChangeInput }) => {
  const uploadRef = React.useRef<HTMLInputElement>(null)
  return (
    <div className="upload-button">
      <Button type="submit" variant="info" onClick={handleClickUpload(uploadRef)}>
        Upload file
      </Button>
      <input hidden accept=".csv" ref={uploadRef} type="file" name="file-upload" onChange={onChangeInput} />
    </div>
  )
}

export const DownloadButton = ({ data }) => {
  return (
    <div className="download-button">
      <Button type="submit" variant="info" onClick={handleDownload(data)}>
        Download file
      </Button>
    </div>
  )
}

export const AddRowButton = ({ addNewRow }) => {
  return (
    <div className="add-button">
      <Button type="submit" variant="info" onClick={addNewRow}>
        Add new
      </Button>
    </div>
  )
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
  data: initialData,
  description = '',
  hasUploadButton = true,
  hasDownloadButton = true,
  hasAddButton = true,
  validateUpload
}) => {
  const [selected, setSelected] = React.useState<SelectedMatrix | null>(null)

  const [data, setData] = React.useState<Cell[][]>(initialData)

  const cellRenderer = React.useCallback(customCellRenderer(data, setData, setSelected), [data])
  const onSelect = React.useCallback(onSelectCells(setSelected), [])
  const onCellsChanged = React.useCallback(handleCellsChanged(data, setData), [data])
  const addNewRow = React.useCallback(handleAddNewRow(data, setData), [data])
  const onChangeInput = React.useCallback(handleOnChangeInput(validateUpload, setData), [])

  return (
    <div className="spreadsheet">
      <div className="wrap-top">
        <div className="description">{description}</div>
        <div className="button-group">
          {hasUploadButton && <UploadButton onChangeInput={onChangeInput} />}
          {hasDownloadButton && <DownloadButton data={data} />}
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
      <div className="wrap-bottom">{hasAddButton && <AddRowButton addNewRow={addNewRow} />}</div>
    </div>
  )
}

export * from './types'
export * from './utils'
