import React, { useState } from 'react'
import { Input } from '@reapit/elements'
import { SketchPicker } from 'react-color'

export type ColourPickerProps = {
  id: string
  name: string
  placeholder: string
  labelText: string
  defaultColour: string
  onChange?: {
    (colour: string): void
  }
}

const ColourPicker: React.FC<ColourPickerProps> = props => {
  const { id, name, placeholder, labelText, defaultColour, onChange } = props

  const [showColourPicker, setShowColourPicker]: any = useState(false)
  const [colour, setColour]: any = useState(defaultColour)

  const toggleColourPicker = (event: Event) => {
    setShowColourPicker(!showColourPicker)
  }

  const changeColour = colour => {
    setColour(colour.hex)
    return colour.hex
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
            const hex = changeColour(colour)
            if (onChange !== undefined) onChange(hex)
          }}
        />
      ) : null}
    </>
  )
}

export default ColourPicker
