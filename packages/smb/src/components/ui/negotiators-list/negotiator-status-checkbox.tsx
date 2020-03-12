import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UpdateNegotiator } from './negotiators.graphql'

export type NegotiatorStatusCheckboxProps = {
  cellRenderProps: any
  data: any
}

// export const handleUseEffect = () => {
//   return () => {

//   }
// }

export const NegotiatorStatusCheckbox: React.FC<NegotiatorStatusCheckboxProps> = ({ cellRenderProps, data }) => {
  const {
    row,
    col,
    cell: { value },
  } = cellRenderProps

  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    setChecked(value)
  }, [value])

  const [updateNegotiator] = useMutation(UpdateNegotiator)

  const handleOnChange = e => {
    setChecked(e.target.checked)
    const selectedRow = data[row]
    const id = selectedRow[6].value
    const _eTag = selectedRow[7].value
    updateNegotiator({
      variables: {
        id,
        _eTag,
        active: e.target.checked,
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
