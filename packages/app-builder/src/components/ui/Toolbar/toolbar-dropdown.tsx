import React from 'react'
import { Label, Select } from '@reapit/elements'

interface TollBarDropdownProps {
  title: string
  value: any
  onChange: (value: any) => void
}

export const ToolbarDropdown: React.FC<TollBarDropdownProps> = ({ title, value, onChange, children }) => {
  return (
    <div>
      <Label>{title}</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </Select>
    </div>
  )
}
