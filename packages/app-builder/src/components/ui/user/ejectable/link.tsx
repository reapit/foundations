import React, { forwardRef, Ref } from 'react'
import path from 'path'
import qs from 'query-string'
import { Link as RRLink, useParams } from 'react-router-dom'
import { ContainerProps } from './container'
import { usePageId } from '../../../hooks/use-page-id'

export interface LinkProps extends ContainerProps {
  destination?: string
  context?: { [key: string]: any }
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export const Link = forwardRef<HTMLDivElement, LinkProps>(({ disabled, children, ...props }, ref) => {
  const { appId } = useParams<{ appId?: string }>()
  const dest = props.destination || ''
  const pathname = path.join('/', appId || '', dest === '~' ? '' : dest)
  const { context } = usePageId()
  const search = {
    ...context,
    ...props.context,
  }

  return (
    <RRLink
      to={{
        pathname,
        search: qs.stringify(search),
      }}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
          return false
        }
      }}
      style={{
        display: 'block',
        padding: 12,
      }}
      ref={ref as Ref<HTMLAnchorElement>}
    >
      {children}
    </RRLink>
  )
})
