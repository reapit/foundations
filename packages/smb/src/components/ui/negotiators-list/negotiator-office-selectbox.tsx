import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { Cell } from '@reapit/elements/src/components/Spreadsheet/types'
import { OfficesQueryResponse } from '../offices-tab/offices-tab'

export type NegotiatorOfficeSelectboxProps = {
  cellRenderProps: ReactDataSheet.CellRendererProps<Cell, string | null>
  officeData?: OfficesQueryResponse
  spreadsheetData: Cell[][]
  createNegotiator: (params) => void
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

  const handleOnChange = e => {
    const selectedValue = e.target.value
    setValue(selectedValue)

    const name = selectedRow[0].value
    const jobTitle = selectedRow[1].value
    const email = selectedRow[2].value
    const mobilePhone = selectedRow[3].value
    const officeId = selectedValue
    const active = selectedRow[5].value || false

    const createNegotiatorVariables = {
      name,
      jobTitle,
      active,
      officeId,
      mobilePhone,
      email,
    }

    createNegotiator({
      variables: createNegotiatorVariables,
    })
  }

  return id ? (
    <span className="value-viewer">{officeName}</span>
  ) : (
    <div>
      <div className="field">
        <div className="control">
          <select className="input is-primary" value={value} onChange={handleOnChange}>
            {officeData?.GetOffices?._embedded?.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
            <option value="" disabled hidden>
              Please select an office
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default NegotiatorOfficeSelectbox
