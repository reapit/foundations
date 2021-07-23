import { Input, InputGroup, Label } from '@reapit/elements'
import React from 'react'

import { ToolbarItemType } from './types'

export type ToolbarTextInputProps = {
  prefix?: string
  label?: string
  type: ToolbarItemType
  onChange: (value: any) => void
  value?: any
}

export const ToolbarTextInput = ({ onChange, value, label, type }: ToolbarTextInputProps) => (
  <InputGroup>
    <Label>{label}</Label>
    <Input
      type={type === ToolbarItemType.Text ? 'text' : 'number'}
      value={value || ''}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    />
  </InputGroup>
)
