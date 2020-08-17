import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { isEmail } from '@reapit/elements'
import { isValidTelephone } from '@/utils/validators'
import { OfficesQueryResponse } from '../offices-tab/offices-tab'
import { prepareCreateNegeotiatorParams, DataTableRow } from './negotiators-list'
import { Cell } from '@reapit/elements/src/components/Spreadsheet/types'

export type NegotiatorOfficeSelectboxProps = {
  cellRenderProps: ReactDataSheet.CellRendererProps<Cell, string | null>
  officeData?: OfficesQueryResponse
  spreadsheetData: Cell[][]
  createNegotiator: (params) => void
  data: Cell[][]
  setData?: React.Dispatch<DataTableRow[][]>
}

export const handleOnChange = (officeData, setValue, spreadsheetData, row, createNegotiator, data, setData) => {
  return e => {
    const selectedOfficeId = e.target.value
    const selectedOffice = officeData?.GetOffices?._embedded?.find(office => office.id === selectedOfficeId)
    setValue(selectedOfficeId)
    const createNegotiatorVariables = {
      ...prepareCreateNegeotiatorParams(spreadsheetData, row),
      officeId: selectedOfficeId,
    }
    if (
      !createNegotiatorVariables.name ||
      !createNegotiatorVariables.officeId ||
      !isEmail(createNegotiatorVariables.email) ||
      !isValidTelephone(createNegotiatorVariables.mobilePhone || '')
    ) {
      return
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
    }).then(respone => {
      const {
        data: { CreateNegotiator },
      } = respone
      const newData = data.map(row => row.map(cell => ({ ...cell })))
      const newRow = newData[row]

      // update new row data
      newRow[0].value = CreateNegotiator.name
      newRow[1].value = CreateNegotiator.jobTitle
      newRow[2].value = CreateNegotiator.email
      newRow[3].value = CreateNegotiator.mobilePhone
      newRow[4].value = CreateNegotiator._embedded?.office?.name
      newRow[4].isValidated = true
      newRow[5].value = CreateNegotiator.active
      newRow[6].value = CreateNegotiator.id
      newRow[7].value = CreateNegotiator._eTag

      setData(newData)
    })
  }
}

export const NegotiatorOfficeSelectbox: React.FC<NegotiatorOfficeSelectboxProps> = ({
  cellRenderProps,
  officeData,
  spreadsheetData,
  createNegotiator,
  data,
  setData,
}) => {
  const {
    row,
    cell: { value: office },
  } = cellRenderProps

  const [value, setValue] = React.useState<string>('')

  const selectedRow = spreadsheetData[row]
  const id = selectedRow[6].value

  return id ? (
    <span className="value-viewer">{office}</span>
  ) : (
    <div>
      <div className="field">
        <div className="control">
          <select
            className="input is-primary"
            value={value}
            onChange={handleOnChange(officeData, setValue, spreadsheetData, row, createNegotiator, data, setData)}
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
