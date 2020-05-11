import * as React from 'react'
import { parse } from 'himalaya'
import renderer from './utils'
import { Content } from '../Layout'

export interface HTMLRenderProps {
  html: string
  diffing?: boolean
  className?: string
}

export const HTMLRender: React.SFC<HTMLRenderProps> = ({
  html,
  diffing = false,
  className = 'html-render',
}: HTMLRenderProps) => {
  const jsonElements = parse(html)
  return <Content className={className}>{renderer(jsonElements, diffing)}</Content>
}
