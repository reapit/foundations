import * as React from 'react'
import { ButtonProps, Button } from '../Button/index'
import { DynamicLinkParams, navigateDynamicApp } from './dynamic-link-gen'

export interface AcLinkParams {
  dynamicLinkParams: DynamicLinkParams
}

export interface AcButtonParams {
  dynamicLinkParams: DynamicLinkParams
  buttonProps: ButtonProps
}

export const AcLink: React.SFC<AcLinkParams> = ({ dynamicLinkParams, children }) => {
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault()
    navigateDynamicApp(dynamicLinkParams)
  }

  return (
    <a onClick={onClick} href="#">
      {children}
    </a>
  )
}

export const AcButton: React.SFC<AcButtonParams> = ({ buttonProps, dynamicLinkParams, children }) => {
  return (
    <Button onClick={() => navigateDynamicApp(dynamicLinkParams)} {...buttonProps}>
      {children}
    </Button>
  )
}
