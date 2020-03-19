import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { Cell, SetData } from '@reapit/elements/src/components/Spreadsheet/types'
import { prepareUpdateNegeotiatorParams } from './negotiators-list'

export type NegotiatorStatusCheckboxProps = {
  cellRenderProps: ReactDataSheet.CellRendererProps<Cell, string | null>
  data: Cell[][]
  setData: SetData
  updateNegotiator: (params) => void
  disabled?: boolean
}

export const handleCheckBoxChange = ({ e, data, row, col, disabled, setChecked, setData, updateNegotiator }) => {
  if (disabled) {
    return
  }

  const selectedValue = e.target.checked
  const selectedRow = data[row]
  const id = selectedRow[6].value

  // Just need to update current sheet data in case its a new row
  if (!id) {
    setChecked(selectedValue)
    const newData = data.map(row => row.map(cell => ({ ...cell })))
    newData[row][col].value = selectedValue
    setData(newData)
    return
  }

  // Execute update mutation in case its an existing row
  const updateNegotiatorVariables = {
    ...prepareUpdateNegeotiatorParams(data, row),
    active: selectedValue,
  }
  updateNegotiator({
    variables: updateNegotiatorVariables,
    optimisticResponse: {
      UpdateNegotiator: {
        ...updateNegotiatorVariables,
        __typename: 'NegotiatorModel',
      },
    },
  })
}

export const NegotiatorStatusCheckbox: React.FC<NegotiatorStatusCheckboxProps> = ({
  cellRenderProps,
  data,
  setData,
  updateNegotiator,
  disabled,
}) => {
  const {
    row,
    col,
    cell: { value },
  } = cellRenderProps

  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    if (value || value === 'true') {
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [value])

  const onChange = e => {
    const params = {
      e,
      data,
      row,
      col,
      disabled,
      setChecked,
      setData,
      updateNegotiator,
    }
    handleCheckBoxChange(params)
  }

  const checkBoxId = `${row}-${col}`

  return (
    <div className="field field-checkbox">
      <input id={checkBoxId} className="checkbox" type="checkbox" checked={checked} onChange={onChange} />
      <label className="label" htmlFor={checkBoxId}>
        IS ACTIVE
      </label>
    </div>
  )
}

export default NegotiatorStatusCheckbox
