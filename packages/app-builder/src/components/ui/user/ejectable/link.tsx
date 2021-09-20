import React, { forwardRef } from 'react'
import path from 'path'
import qs from 'query-string'
import { Link as RRLink, useParams } from 'react-router-dom'
import { Container, ContainerProps } from './container'

export interface LinkProps extends ContainerProps {
  destination?: string
  context?: { [key: string]: any }
}

export const Link = forwardRef<HTMLDivElement, LinkProps & { disabled?: boolean }>(({ disabled, ...props }, ref) => {
  const { appId } = useParams<{ appId?: string }>()
  const dest = props.destination || ''
  return (
    <RRLink
      to={{
        pathname: path.join('/', appId || '', dest === '~' ? '' : dest),
        search: props.context ? qs.stringify(props.context) : '',
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
      <Container {...props} ref={ref} />
    </RRLink>
  )
})
