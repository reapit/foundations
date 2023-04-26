import React, { PropsWithChildren } from 'react'
import { AppBuilderSelect } from '../components'

interface ToolBarDropdownProps extends PropsWithChildren {
  value: any
  onChange: (value: any) => void
}

export const ToolbarDropdown: React.FC<ToolBarDropdownProps> = ({ value, onChange, children }) => {
  return (
    <AppBuilderSelect value={value} onChange={(e) => onChange(e.target.value)}>
      {children}
    </AppBuilderSelect>
  )
}
