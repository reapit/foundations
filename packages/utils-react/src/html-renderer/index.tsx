import * as React from 'react'
import { parse } from 'himalaya'
import renderer from './utils'

export interface HTMLRenderProps {
  html: string
  diffing?: boolean
  className?: string
}

export const HTMLRender: React.FC<HTMLRenderProps> = ({
  html,
  diffing = false,
  className = 'html-render',
}: HTMLRenderProps) => {
  const jsonElements = parse(html)
  return <div className={className}>{renderer(jsonElements, diffing)}</div>
}
