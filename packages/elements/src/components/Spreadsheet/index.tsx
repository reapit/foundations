import * as React from 'react'
import { MyReactDataSheet, Cell, SpreadsheetProps, SelectedMatrix, ContextMenuProp, UploadData } from './types'
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
import { ModalUpload } from './modal-upload'
import { H6 } from '../Typography'

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

export const getErrorsFromData = (data: Cell[][]): string[] => {
  const errors: string[] = []
  data.forEach((row = [], rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell.error) {
        const error = `[${rowIndex + 1}][${colIndex + 1}]: ${cell.error}`
        errors.push(error)
      }
    })
  })
  return errors
}

export const renderErrorElements = (data: Cell[][] = []) => {
  const errors = getErrorsFromData(data)
  if (!errors.length) return null
  return (
    <div className="has-text-danger pt-4">
      <H6 className="has-text-danger mb-1">The following validation errors have occurred:</H6>
      {errors.map((error: string, index: number) => {
        return (
          <div key={index} className="has-text-danger">
            {error}
          </div>
        )
      })}
    </div>
  )
}

const initialUploadData: UploadData = {
  totalRow: 0,
  validatedData: [[]],
  invalidIndies: [],
  shouldProcess: false,
  isModalOpen: false,
  exceedMaxRow: false,
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
  afterUploadDataValidated,
  maxUploadRow = 30,
  CustomDownButton,
  /**
   * Required to set fixedReadOnly = true
   * To prevent it change readOnly property of Cell
   *
   */
  allowOnlyOneValidationErrorPerRow = false,
  ...rest
}) => {
  const [selected, setSelected] = React.useState<SelectedMatrix | null>(null)

  const [data, setData] = React.useState<Cell[][]>([[]])

  // store data relevant to upload handler
  const [uploadData, setUploadData] = React.useState<UploadData>(initialUploadData)

  const prevData = usePrevious(data)

  const [contextMenuProp, setContextMenuProp] = React.useState<ContextMenuProp>({
    visible: false,
    top: 0,
    left: 0,
  })

  const cellRenderer = React.useCallback(customCellRenderer(data, setData, setSelected, afterCellsChanged), [data])

  const onCellsChanged = handleCellsChanged(
    data,
    setData,
    allowOnlyOneValidationErrorPerRow,
    validate,
    afterCellsChanged,
  )

  React.useEffect(handleSetContextMenu(setContextMenuProp.bind(null, hideContextMenu)), [])

  React.useEffect(handleInitialDataChanged(initialData, setData, allowOnlyOneValidationErrorPerRow, validate), [
    initialData,
    validate,
  ])

  React.useEffect(handleAfterDataChanged(data, prevData, afterDataChanged), [data])

  React.useEffect(() => {
    if (uploadData.shouldProcess && typeof afterUploadDataValidated === 'function') {
      afterUploadDataValidated({ uploadData, currentData: data, setData })
      setUploadData({ ...initialUploadData })
    }
  }, [afterUploadDataValidated, uploadData, data])

  return (
    <div className="spreadsheet">
      <div className="wrap-top">
        <div className="description">
          {description}
          {allowOnlyOneValidationErrorPerRow && (
            <small>
              Cell of a row won&apos;t be editable if the row contains any invalidated cell (cell with background red)*
            </small>
          )}
        </div>
        <div className="button-group">
          {hasUploadButton && (
            <UploadButton
              onChangeInput={handleOnChangeInput({
                setUploadData,
                maxUploadRow,
                validate,
              })}
            />
          )}
          {hasDownloadButton && CustomDownButton}
          {hasDownloadButton && !CustomDownButton && <DownloadButton data={data} />}
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
      {renderErrorElements(data)}
      <div className="wrap-bottom">
        {hasAddButton && (
          <AddRowButton addNewRow={handleAddNewRow(data, setData, allowOnlyOneValidationErrorPerRow, validate)} />
        )}
      </div>
      <ContextMenu
        selected={selected}
        contextMenuProp={contextMenuProp}
        data={data}
        setContextMenuProp={setContextMenuProp}
        onCellsChanged={onCellsChanged}
      />
      <ModalUpload uploadData={uploadData} setUploadData={setUploadData} />
    </div>
  )
}

export * from './types'
export * from './utils'
export { handleDownload as handleDownloadCsv }
