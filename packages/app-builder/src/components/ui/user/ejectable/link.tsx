import React, { forwardRef } from 'react'
import qs from 'query-string'
import { Link as RRLink } from 'react-router-dom'
import { Container, ContainerProps } from './container'

export interface LinkProps extends ContainerProps {
  destination?: string
  context?: { [key: string]: any }
}

export const Link = forwardRef<HTMLDivElement, LinkProps & { disabled?: boolean }>(({ disabled, ...props }, ref) => {
  return (
    <RRLink
      to={{
        pathname: props.destination,
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
