import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { Cell } from '@reapit/elements/src/components/Spreadsheet/types'
import { OfficesQueryResponse } from '../offices-tab/offices-tab'
import { prepareCreateNegeotiatorParams } from './negotiators-list'

export type NegotiatorOfficeSelectboxProps = {
  cellRenderProps: ReactDataSheet.CellRendererProps<Cell, string | null>
  officeData?: OfficesQueryResponse
  spreadsheetData: Cell[][]
  createNegotiator: (params) => void
}

export const handleOnChange = (officeData, setValue, spreadsheetData, row, createNegotiator) => {
  return e => {
    const selectedOfficeId = e.target.value
    const selectedOffice = officeData?.GetOffices?._embedded?.find(office => office.id === selectedOfficeId)
    setValue(selectedOfficeId)
    const createNegotiatorVariables = {
      ...prepareCreateNegeotiatorParams(spreadsheetData, row),
      officeId: selectedOfficeId,
    }
    createNegotiator({
      variables: createNegotiatorVariables,
      optimisticResponse: {
        __typename: 'Mutation',
        CreateNegotiator: {
          ...createNegotiatorVariables,
          id: Math.random(),
          created: new Date().toISOString,
          modified: new Date().toISOString,
          workPhone: null,
          metadata: null,
          _eTag: null,
          _links: null,
          _embedded: {
            office: {
              id: selectedOfficeId,
              name: selectedOffice?.name,
            },
          },
          __typename: 'NegotiatorModel',
        },
      },
    })
  }
}

export const NegotiatorOfficeSelectbox: React.FC<NegotiatorOfficeSelectboxProps> = ({
  cellRenderProps,
  officeData,
  spreadsheetData,
  createNegotiator,
}) => {
  const {
    row,
    cell: { value: office },
  } = cellRenderProps

  const [value, setValue] = React.useState<string>()

  const officeId = office?.split('|')[0]
  const officeName = office?.split('|')[1]
  const selectedRow = spreadsheetData[row]
  const id = selectedRow[6].value

  React.useEffect(() => {
    setValue(officeId)
  }, [officeId])

  return id ? (
    <span className="value-viewer">{officeName}</span>
  ) : (
    <div>
      <div className="field">
        <div className="control">
          <select
            className="input is-primary"
            value={value}
            onChange={handleOnChange(officeData, setValue, spreadsheetData, row, createNegotiator)}
          >
            {officeData?.GetOffices?._embedded?.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
            <option value="" disabled hidden>
              Select an office
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default NegotiatorOfficeSelectbox
