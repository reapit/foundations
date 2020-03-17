import * as React from 'react'

export type NegotiatorStatusCheckboxProps = {
  cellRenderProps: any
  data: any
  updateNegotiator: (params) => void
  createNegotiator: (params) => void
}

export const NegotiatorStatusCheckbox: React.FC<NegotiatorStatusCheckboxProps> = ({
  cellRenderProps,
  data,
  updateNegotiator,
  createNegotiator,
}) => {
  const {
    row,
    col,
    cell: { value },
  } = cellRenderProps

  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    setChecked(value)
  }, [value])

  const handleOnChange = e => {
    const selectedRow = data[row]
    const id = selectedRow[6].value
    const _eTag = selectedRow[7].value
    const updateNegotiatorVariables = {
      id,
      _eTag,
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
