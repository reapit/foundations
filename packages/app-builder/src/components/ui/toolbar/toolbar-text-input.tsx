import { Input } from '@reapit/elements'
import React, { FC } from 'react'

import { ToolbarItemType } from './types'

export type ToolbarTextInputProps = {
  prefix?: string
  type: ToolbarItemType
  onChange: (value: any) => void
  value?: any
}

export const ToolbarTextInput: FC<ToolbarTextInputProps> = ({ onChange, value, type }: ToolbarTextInputProps) => (
  <Input
    type={type === ToolbarItemType.Text ? 'text' : 'number'}
    value={value || ''}
    onChange={(e) => {
      onChange(e.target.value)
    }}
  />
)
