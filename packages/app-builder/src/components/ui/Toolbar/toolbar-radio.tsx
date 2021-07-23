import { InputGroup } from '@reapit/elements'
import React from 'react'

export const ToolbarRadio = ({ value, name }: { value: string; name: string }) => {
  return <InputGroup type="radio" name={name} value={value} />
}
