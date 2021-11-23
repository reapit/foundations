import { elFlexAuto } from '@reapit/elements'
import React from 'react'

export const Text = ({ text, fontSize, width }: { text: string; fontSize?: number; width?: number }) => (
  <div
    className={elFlexAuto}
    style={{
      fontSize,
      flex: width ? `${width}` : undefined,
    }}
  >
    <p>{text}</p>
  </div>
)
