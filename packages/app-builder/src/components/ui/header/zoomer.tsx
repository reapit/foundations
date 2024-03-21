import { useZoom } from '../../../components/hooks/use-zoom'
import { styled } from '@linaria/react'
import React from 'react'
import { AppBuilderSelect, SelectOrInput } from '../components'

const SelectOrInputSmall = styled(SelectOrInput)`
  max-width: 84px;
  margin-left: 4px;
  input {
    max-width: 59px;
  }
`

export const Zoomer = () => {
  const { zoom, setZoom } = useZoom()

  return (
    <SelectOrInputSmall
      defaultValue={`${zoom * 100}%`}
      onInputSubmit={(newZoom) => {
        setZoom(parseInt(newZoom.currentTarget.value.replace('%', ''), 10) / 100)
      }}
    >
      <AppBuilderSelect
        value={zoom}
        style={{ maxWidth: 84 }}
        onChange={(e) => {
          setZoom(Number(e.target.value))
        }}
      >
        <option value={0.5}>50%</option>
        <option value={1}>100%</option>
        <option value={1.5}>150%</option>
      </AppBuilderSelect>
    </SelectOrInputSmall>
  )
}
