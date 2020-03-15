import * as React from 'react'
import { MyReactDataSheet, Cell, SpreadsheetProps, SelectedMatrix, ContextMenuProp } from './types'
import {
  valueRenderer,
  onSelectCells,
  customCellRenderer,
  handleAddNewRow,
  handleCellsChanged,
  handleClickUpload,
  handleOnChangeInput,
  handleDownload,
  handleContextMenu,
  hideContextMenu,
  handleSetContextMenu,
  handleAfterDataChanged,
  handleInitialDataChanged,
} from './handlers'
import { Button } from '../Button'
import { ContextMenu } from './context-menu'
import { usePrevious } from './utils'

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
      <Button type="submit" variant="info" onClick={handleDownload(data, window, document)}>
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
  validate,
  afterDataChanged,
  afterCellsChanged,
  ...rest
}) => {
  const [selected, setSelected] = React.useState<SelectedMatrix | null>(null)

  const [data, setData] = React.useState<Cell[][]>([[]])

  const prevData = usePrevious(data)

  const [contextMenuProp, setContextMenuProp] = React.useState<ContextMenuProp>({
    visible: false,
    top: 0,
    left: 0,
  })

  const cellRenderer = React.useCallback(customCellRenderer(data, setData, setSelected, afterCellsChanged), [data])

  const onCellsChanged = handleCellsChanged(data, setData, validate, afterCellsChanged)

  React.useEffect(handleSetContextMenu(setContextMenuProp.bind(null, hideContextMenu)), [])

  React.useEffect(handleInitialDataChanged(initialData, data, setData, validate), [initialData, validate])

  React.useEffect(handleAfterDataChanged(data, prevData, afterDataChanged), [data])

  return (
    <div className="spreadsheet">
      <div className="wrap-top">
        <div className="description">{description}</div>
        <div className="button-group">
          {hasUploadButton && <UploadButton onChangeInput={handleOnChangeInput(data, setData, validate)} />}
          {hasDownloadButton && <DownloadButton data={data} />}
        </div>
      </div>
      <MyReactDataSheet
        overflow="wrap"
        data={data}
        selected={selected}
        valueRenderer={valueRenderer}
        onCellsChanged={onCellsChanged}
        onSelect={onSelectCells(setSelected)}
        onContextMenu={handleContextMenu(setContextMenuProp)}
        cellRenderer={cellRenderer}
        {...rest}
      />
      <div className="wrap-bottom">
        {hasAddButton && <AddRowButton addNewRow={handleAddNewRow(data, setData, validate)} />}
      </div>
      <ContextMenu
        selected={selected}
        contextMenuProp={contextMenuProp}
        data={data}
        setContextMenuProp={setContextMenuProp}
        onCellsChanged={onCellsChanged}
      />
    </div>
  )
}

export * from './types'
export * from './utils'
