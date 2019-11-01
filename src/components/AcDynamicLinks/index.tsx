import * as React from 'react'
import { ButtonProps, Button } from '../Button/index'
import { DynamicLinkParams, navigateDynamicApp } from './dynamic-link-gen'

export interface AcLinkParams {
  dynamicLinkParams: DynamicLinkParams
  navigateParentWindow?: Window
}

export interface AcButtonParams {
  dynamicLinkParams: DynamicLinkParams
  buttonProps: ButtonProps
  navigateParentWindow?: Window
}

export const AcLink: React.SFC<AcLinkParams> = ({ dynamicLinkParams, navigateParentWindow, children }) => {
  const onClick = (event: React.MouseEvent) => {
    event.preventDefault()
    navigateDynamicApp(dynamicLinkParams, navigateParentWindow)
  }

  return (
    <a
      className={`dynamic-link ${
        dynamicLinkParams.appMode === 'DESKTOP' ? 'desktop' : dynamicLinkParams.webRoute ? 'web' : ''
      }`}
      onClick={onClick}
      href="#"
    >
      {children}
    </a>
  )
}

export const AcButton: React.SFC<AcButtonParams> = ({
  buttonProps,
  dynamicLinkParams,
  navigateParentWindow,
  children
}) => {
  return (
    <Button onClick={() => navigateDynamicApp(dynamicLinkParams, navigateParentWindow)} {...buttonProps}>
      {children}
    </Button>
  )
}
