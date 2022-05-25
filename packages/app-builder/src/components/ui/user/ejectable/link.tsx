import React, { forwardRef } from 'react'
import path from 'path'
import qs from 'query-string'
import { Link as RRLink, useParams } from 'react-router-dom'
import { ComponentWrapper, ContainerProps } from './container'
import { usePageId } from '../../../hooks/use-page-id'

export interface LinkProps extends ContainerProps {
  destination?: string
  context?: { [key: string]: any }
}

export const Link = forwardRef<HTMLDivElement, LinkProps & { disabled?: boolean }>(({ disabled, ...props }, ref) => {
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
      onClick={
        !disabled
          ? (e) => {
              e.preventDefault()
              return false
            }
          : undefined
      }
    >
      <ComponentWrapper {...props} ref={ref} />
    </RRLink>
  )
})
