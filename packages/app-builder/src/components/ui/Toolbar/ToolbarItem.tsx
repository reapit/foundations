import { useNode } from '@craftjs/core'
import { Grid, Slider, RadioGroup } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import React from 'react'

import { ToolbarDropdown } from './ToolbarDropdown'
import { ToolbarTextInput } from './ToolbarTextInput'
import { ToolbarItemType } from './types'

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)'

const SliderStyled = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '5px 0',
    width: '100%',
  },
  thumb: {
    height: 14,
    width: 14,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -7,
    marginLeft: -7,
    '&:focus,&:hover,&$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider)

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
    case ToolbarItemType.Color:
    case ToolbarItemType.Bg:
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
    case ToolbarItemType.Slider:
      return (
        <>
          {props.label && <h4 className="text-sm text-light-gray-2">{props.label}</h4>}
          <SliderStyled
            value={parseInt(value) || 0}
            onChange={
              ((_, value: number) => {
                setProp((props) => {
                  if (isArray) {
                    props[propKey][index] = value
                  } else {
                    props[propKey] = value
                  }
                }, 1000)
              }) as any
            }
          />
        </>
      )
    case ToolbarItemType.Radio:
      return (
        <>
          {props.label ? <h4 className="text-sm text-light-gray-2">{props.label}</h4> : null}
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

export const ToolbarItem = ({ full = false, ...props }: ToolbarItemProps) => (
  <Grid item xs={full ? 12 : 6}>
    <div className="mb-2">
      <ToolbarItemInput {...props} />
    </div>
  </Grid>
)
