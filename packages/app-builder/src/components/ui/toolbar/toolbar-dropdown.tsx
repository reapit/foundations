import React from 'react'
import { Select } from '@reapit/elements'

interface ToolBarDropdownProps {
  value: any
  onChange: (value: any) => void
}

export const ToolbarDropdown: React.FC<ToolBarDropdownProps> = ({ value, onChange, children }) => {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {children}
    </Select>
  )
}
