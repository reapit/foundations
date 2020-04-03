import * as React from 'react'
import { Modal, H4, Button } from '@reapit/elements'
import { UploadResults } from '@/components/providers/upload-provider/reducers'
import styled from 'styled-components'

export const TD = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`

export type UploadResultModalProp = {
  visible: boolean
  results: UploadResults
  onCloseClick: () => void
}

export const UploadResultModal: React.FC<UploadResultModalProp> = ({ visible, results, onCloseClick }) => {
  return (
    <Modal
      tapOutsideToDissmiss={false}
      visible={visible}
      footerItems={
        <>
          <Button variant="secondary" type="button" onClick={onCloseClick}>
            Close
          </Button>
        </>
      }
      title={'Upload Complete'}
    >
      <div>
        <H4 className="has-text-info">{`Successfully uploaded ${results.success}/${results.total} record(s)`}</H4>
        {results.failed > 0 && (
          <ul>
            {results.details.map(({ success, rowData, errors = [] }, index) => {
              if (success) return null
              return (
                <li key={index}>
                  {/* Need to + 1 for user-readable reason */}
                  <p className="has-text-danger">Row: {index + 1}</p>
                  <p>
                    <table>
                      <tbody>
                        <tr>
                          {rowData.map((item, index) => (
                            <TD key={`row-item-${index}`}>{item.value}</TD>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </p>
                  <p>
                    Errors <code>{errors.map(item => item.message).join('\n')}</code>
                  </p>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </Modal>
  )
}
