import { useNode } from '@craftjs/core'
import { styled } from '@linaria/react'
import { Label } from '@reapit/elements'
import React, { FC, ReactNode } from 'react'

import { ToolbarDropdown } from './toolbar-dropdown'
import { ToolbarTextInput } from './toolbar-text-input'
import { ToolbarItemType } from './types'

export type ToolbarItemProps = {
  prefix?: string
  label?: string
  full?: boolean
  propKey: string
  index?: number
  children?: ReactNode[]
  type: ToolbarItemType
  title?: string
  onChange?: (value: string) => void
}

const ToolbarItemContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ToolbarItem: FC<ToolbarItemProps> = ({
  propKey,
  type,
  onChange,
  index = 0,
  ...props
}: ToolbarItemProps) => {
  const {
    actions: { setProp },
    propValue,
  } = useNode((node) => ({
    propValue: node.data.props[propKey],
  }))
  const isArray = Array.isArray(propValue)
  const value = isArray ? propValue[index] : propValue

  let component: React.ReactNode

  switch (type) {
    case ToolbarItemType.Text:
    case ToolbarItemType.Number:
      component = (
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
      break
    case ToolbarItemType.Radio:
      component = React.Children.map(props.children, (child: React.ReactNode) => {
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
      })
      break
    case ToolbarItemType.Select:
      component = (
        <ToolbarDropdown
          value={value || ''}
          onChange={(value) => {
            setProp((props) => (props[propKey] = value))
            onChange && onChange(value)
          }}
          {...props}
        />
      )
      break
    default:
      return null
  }

  return (
    <ToolbarItemContainer>
      <Label>{props.title}</Label>
      {component}
    </ToolbarItemContainer>
  )
}
