import * as React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UpdateNegotiator } from './negotiators.graphql'

export type NegotiatorOfficeSelectboxProps = {
  cellRenderProps: any
  data: any
}

export const NegotiatorOfficeSelectbox: React.FC<NegotiatorOfficeSelectboxProps> = ({ cellRenderProps, data }) => {
  const {
    row,
    col,
    cell: { value },
  } = cellRenderProps

  // const [checked, setChecked] = React.useState(false)

  // React.useEffect(() => {
  //   setChecked(value)
  // }, [value])

  const [updateNegotiator] = useMutation(UpdateNegotiator)

  // const handleOnChange = e => {
  //   setChecked(e.target.checked)
  //   const selectedRow = data[row]
  //   const id = selectedRow[6].value
  //   const _eTag = selectedRow[7].value
  //   updateNegotiator({
  //     variables: {
  //       id,
  //       _eTag,
  //       active: e.target.checked,
  //     },
  //   })
  // }
  console.log('value---', value)
  return (
    <div className="field">
      <div className="control">
        <select className="input is-primary" value={value}>
          {data?.GetOffices?._embedded?.map(({ id, name }) => (
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
  )
}

export default NegotiatorOfficeSelectbox
