import * as React from 'react'
import { parse } from 'himalaya'
import renderer from './utils'
import { Content } from '../Layout'

export interface HTMLRenderProps {
  html: string
}

export const HTMLRender: React.SFC<HTMLRenderProps> = ({ html }: HTMLRenderProps) => {
  const jsonElements = parse(html)
  return <Content>{renderer(jsonElements)}</Content>
}
