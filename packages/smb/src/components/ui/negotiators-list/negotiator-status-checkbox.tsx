import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { Cell } from '@reapit/elements/src/components/Spreadsheet/types'
import { prepareUpdateNegeotiatorParams } from './negotiators-list'

export type NegotiatorStatusCheckboxProps = {
  cellRenderProps: ReactDataSheet.CellRendererProps<Cell, string | null>
  data: Cell[][]
  updateNegotiator: (params) => void
}

export const NegotiatorStatusCheckbox: React.FC<NegotiatorStatusCheckboxProps> = ({
  cellRenderProps,
  data,
  updateNegotiator,
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

  const handleOnChange = e => {
    const updateNegotiatorVariables = {
      ...prepareUpdateNegeotiatorParams(data, row),
      active: e.target.checked,
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

  const checkBoxId = `${row}-${col}`

  return (
    <div className="field field-checkbox">
      <input id={checkBoxId} className="checkbox" type="checkbox" checked={checked} onChange={handleOnChange} />
      <label className="label" htmlFor={checkBoxId}>
        IS ACTIVE
      </label>
    </div>
  )
}

export default NegotiatorStatusCheckbox
