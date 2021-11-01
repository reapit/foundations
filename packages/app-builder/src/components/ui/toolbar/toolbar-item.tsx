import { useNode } from '@craftjs/core'
import { elMb3, Label } from '@reapit/elements'
import React, { FC, ReactNodeArray } from 'react'

import { ToolbarDropdown } from './toolbar-dropdown'
import { ToolbarTextInput } from './toolbar-text-input'
import { ToolbarItemType } from './types'

export type ToolbarItemProps = {
  prefix?: string
  label?: string
  full?: boolean
  propKey: string
  index?: number
  children?: ReactNodeArray
  type: ToolbarItemType
  title?: string
  onChange?: (value: string) => void
}

const ToolbarItemInput: FC<ToolbarItemProps> = ({ propKey, type, onChange, index = 0, ...props }: ToolbarItemProps) => {
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
              onChange && onChange(value)
            }, 500)
          }}
        />
      )
    case ToolbarItemType.Radio:
      return (
        <>
          {props.label ? <Label>{props.label}</Label> : null}
          {React.Children.map(props.children, (child: React.ReactNode) => {
            React.isValidElement(child) &&
              React.cloneElement(child, {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  const { value, checked } = e.currentTarget
                  if (checked) {
                    setProp((props) => {
                      props[propKey] = value
                    })
                    onChange && onChange(value)
                  }
                },
              })
          })}
        </>
      )
    case ToolbarItemType.Select:
      return props.title ? (
        <ToolbarDropdown
          value={value || ''}
          onChange={(value) => {
            setProp((props) => (props[propKey] = value))
            onChange && onChange(value)
          }}
          title={props.title}
          {...props}
        />
      ) : null
    default:
      return null
  }
}

export const ToolbarItem = (props: ToolbarItemProps) => (
  <div className={elMb3}>
    <ToolbarItemInput {...props} />
  </div>
)
