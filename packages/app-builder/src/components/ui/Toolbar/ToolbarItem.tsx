import { useNode } from '@craftjs/core'
import { RadioGroup } from '@material-ui/core'
import { elMb2, Label } from '@reapit/elements'
import React from 'react'

import { ToolbarDropdown } from './ToolbarDropdown'
import { ToolbarTextInput } from './ToolbarTextInput'
import { ToolbarItemType } from './types'

export type ToolbarItemProps = {
  prefix?: string
  label?: string
  full?: boolean
  propKey: string
  index?: number
  children?: React.ReactNode
  type: ToolbarItemType
  title?: string
}

const ToolbarItemInput = ({ propKey, type, index = 0, ...props }: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }))
  const isArray = Array.isArray(propValue)
  const value = isArray ? propValue[index] : propValue

  switch (type) {
    case ToolbarItemType.Text:
    case ToolbarItemType.Number:
      return (
        <ToolbarTextInput
          {...props}
          type={type}
          value={value}
          onChange={(value) => {
            setProp((props: any) => {
              if (type === ToolbarItemType.Number) {
                value = parseInt(value)
              }
              if (isArray) {
                props[propKey][index] = value
              } else {
                props[propKey] = value
              }
            }, 500)
          }}
        />
      )
    case ToolbarItemType.Radio:
      return (
        <>
          {props.label ? <Label>{props.label}</Label> : null}
          <RadioGroup
            value={value || 0}
            onChange={(e) => {
              const value = e.target.value
              setProp((props) => {
                props[propKey] = value
              })
            }}
          >
            {props.children}
          </RadioGroup>
        </>
      )
    case ToolbarItemType.Select:
      return props.title ? (
        <ToolbarDropdown
          value={value || ''}
          onChange={(value) => setProp((props) => (props[propKey] = value))}
          title={props.title}
          {...props}
        />
      ) : null
    default:
      return null
  }
}

export const ToolbarItem = (props: ToolbarItemProps) => (
  <div className={elMb2}>
    <ToolbarItemInput {...props} />
  </div>
)
