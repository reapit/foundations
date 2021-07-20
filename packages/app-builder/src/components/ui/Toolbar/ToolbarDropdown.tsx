import { FormControl, InputLabel, Select } from '@material-ui/core'
import React from 'react'

interface TollBarDropdownProps {
  title: string
  value: any
  onChange: (value: any) => void
}

export const ToolbarDropdown: React.FC<TollBarDropdownProps> = ({ title, value, onChange, children }) => {
  return (
    <FormControl>
      <InputLabel>{title}</InputLabel>
      <Select native value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </Select>
    </FormControl>
  )
}
