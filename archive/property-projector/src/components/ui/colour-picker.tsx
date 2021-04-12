import React, { useState } from 'react'
import { Input } from '@reapit/elements'
import { SketchPicker } from 'react-color'

export type ColourPickerProps = {
  id: string
  name: string
  placeholder: string
  labelText: string
  colour: string
  onChange?: {
    (colour: string): void
  }
}

const ColourPicker: React.FC<ColourPickerProps> = props => {
  const { id, name, placeholder, labelText, colour, onChange } = props
  const [showColourPicker, setShowColourPicker] = useState<boolean>(false)

  const toggleColourPicker = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setShowColourPicker(!showColourPicker)
  }

  return (
    <>
      <Input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        labelText={labelText}
        helperText={
          <div className="colour-swatch" style={{ backgroundColor: colour }} onClick={toggleColourPicker}></div>
        }
      />
      {showColourPicker ? (
        <SketchPicker
          color={colour}
          onChange={(colour, event) => {
            if (onChange !== undefined) onChange(colour.hex)
          }}
        />
      ) : null}
    </>
  )
}

export default ColourPicker
