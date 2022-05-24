import React from 'react'
import { ComponentWrapper } from './container'

export const Text = ({ text, fontSize, width = 12 }: { text: string; fontSize?: number; width?: number }) => (
  <ComponentWrapper
    width={width}
    style={{
      fontSize,
    }}
  >
    <p>{text}</p>
  </ComponentWrapper>
)
