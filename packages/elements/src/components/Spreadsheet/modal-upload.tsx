import * as React from 'react'
import { Modal } from '../Modal'
import { H4 } from '../Typography'
import { Button } from '../Button'
import { handleCloseUploadModal, handleProcessValidRows } from './handlers'
import { calculateNumberOfInvalidRows } from './utils'
import { ModalUploadProp } from './types'

// TODO modify modal's styles later
export const ModalUpload: React.FC<ModalUploadProp> = ({ uploadData, setUploadData }) => {
  return (
    <Modal
      tapOutsideToDissmiss={false}
      visible={uploadData.isModalOpen}
      afterClose={handleCloseUploadModal(setUploadData)}
      footerItems={
        <>
          <Button variant="secondary" type="button" onClick={handleCloseUploadModal(setUploadData)}>
            Close
          </Button>
          <Button variant="primary" type="button" onClick={handleProcessValidRows(setUploadData)}>
            Process valid rows
          </Button>
        </>
      }
      title={`Process with ${uploadData.validatedData.length} valid rows?`}
    >
      <div>
        {uploadData.invalidIndies.length > 0 ? (
          <H4 className="has-text-danger">{`Found ${calculateNumberOfInvalidRows(
            uploadData.invalidIndies,
          )} invalid rows`}</H4>
        ) : (
          <H4 className="has-text-info">All rows are valid!</H4>
        )}
        <ul>
          {uploadData.invalidIndies.map(({ row, col, cell }, index) => {
            return (
              <li key={index}>
                {/* Need to + 1 for user-readable reason */}
                Row: <span className="has-text-danger">{row + 1}</span>, Columns:{' '}
                <span className="has-text-danger">{col + 1}</span>, Value:{' '}
                <span className="has-text-danger">{cell.value}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </Modal>
  )
}
