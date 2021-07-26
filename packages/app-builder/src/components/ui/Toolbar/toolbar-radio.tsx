import { InputGroup } from '@reapit/elements'
import React, { FC } from 'react'

interface ToolbarRadioProps {
  value: string
  name: string
}

export const ToolbarRadio: FC<ToolbarRadioProps> = ({ value, name }: ToolbarRadioProps) => {
  return <InputGroup type="radio" name={name} value={value} />
}
