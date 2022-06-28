import React from 'react'
import { ComponentWrapper } from './container'

export type TypographyType = 'title' | '' | 'subtitle' | 'small'

export const typographyTypeToClassName = (typographyType?: TypographyType) => {
  switch (typographyType) {
    case 'title':
      return 'el-title'
    case 'subtitle':
      return 'el-subtitle'
    case 'small':
      return 'el-small-text'
    default:
      return 'el-body-text'
  }
}
export const Text = ({
  text,
  fontSize,
  width = 12,
  typographyType,
}: {
  text: string
  fontSize?: number
  width?: number
  typographyType?: TypographyType
}) => (
  <ComponentWrapper
    width={width}
    style={{
      fontSize,
    }}
  >
    <p className={typographyTypeToClassName(typographyType)}>{text}</p>
  </ComponentWrapper>
)
