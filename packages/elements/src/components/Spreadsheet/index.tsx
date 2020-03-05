import * as React from 'react'
import { MyReactDataSheet, Cell, SpreadsheetProps, SelectedMatrix, ContextMenuProp, SetContextMenuProp } from './types'
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
  handleAfterDataChanged,
} from './handlers'
import { Button } from '../Button'
import { ContextMenu } from './context-menu'
import { hideContextMenu } from './utils'

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

export const handleEffect = (setContextMenuProp: SetContextMenuProp) => () => {
  /**
   * To hide context menu when click outside.
   * must use window instead of document for stopPropagation to work
   * https://github.com/facebook/react/issues/4335
   */
  window.addEventListener('click', setContextMenuProp as any)
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
  data: initialData,
  description = '',
  hasUploadButton = true,
  hasDownloadButton = true,
  hasAddButton = true,
  validateUpload,
  afterDataChanged,
}) => {
  const [selected, setSelected] = React.useState<SelectedMatrix | null>(null)

  const [data, setData] = React.useState<Cell[][]>(initialData)

  const setDataToInitial = setData.bind(null, initialData)

  const [contextMenuProp, setContextMenuProp] = React.useState<ContextMenuProp>({
    visible: false,
    top: 0,
    left: 0,
  })

  const cellRenderer = React.useCallback(customCellRenderer(data, setData, setSelected), [data])
  const onSelect = React.useCallback(onSelectCells(setSelected), [])
  const onCellsChanged = React.useCallback(handleCellsChanged(data, setData), [data])
  const addNewRow = React.useCallback(handleAddNewRow(data, setData), [data])
  const onChangeInput = React.useCallback(handleOnChangeInput(validateUpload, setData), [validateUpload])
  const onContextMenu = React.useCallback(handleContextMenu(setContextMenuProp), [])
  // call setContextMenuProp will hide context menu by default
  React.useEffect(handleEffect(setContextMenuProp.bind(null, hideContextMenu)), [])
  // call setData when initialData changed
  React.useEffect(setDataToInitial, [initialData])
  // call after data changed
  React.useEffect(handleAfterDataChanged(data, afterDataChanged), [data])
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
        onContextMenu={onContextMenu}
        cellRenderer={cellRenderer}
      />
      <div className="wrap-bottom">{hasAddButton && <AddRowButton addNewRow={addNewRow} />}</div>
      <ContextMenu
        selected={selected}
        contextMenuProp={contextMenuProp}
        setData={setData}
        setContextMenuProp={setContextMenuProp}
      />
    </div>
  )
}

export * from './types'
export * from './utils'
