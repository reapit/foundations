import * as React from 'react'
import Select, { Option, SelectProps } from 'rc-select'
import './index.scss'

export const DropdownSelect: React.FC<SelectProps> = props => {
  return (
    <Select {...props}>
      <Option value="jack">jack</Option>
      <Option value="lucy">lucy</Option>
      <Option value="yiminghe">yiminghe</Option>
    </Select>
  )
}

export default DropdownSelect
