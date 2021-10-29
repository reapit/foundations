import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import { Portal } from '@reapit/elements'
import { HelperWidgetApps, HelperWidgetConfig, helperWidgetConfig } from './config'
import { SlideOutContainer, slideOutIsActive, WidgetContainer } from './__styles__/index'
import { cx } from '@linaria/core'

export interface HelperWidgetProps {
  appName: HelperWidgetApps
}

export const handleToggleWidget = (widgetOpen: boolean, setWidgetOpen: Dispatch<SetStateAction<boolean>>) => () => {
  setWidgetOpen(!widgetOpen)
}

export const handlePathChange =
  (
    setWidgetConfig: Dispatch<SetStateAction<HelperWidgetConfig[] | null>>,
    pathname: string,
    appName: HelperWidgetApps,
  ) =>
  () => {
    const appConfig = helperWidgetConfig[appName]
    const filteredConfig = appConfig.filter((config) => config.pathnames.includes(pathname))
    const widgetConfig = filteredConfig.length ? filteredConfig : null

    setWidgetConfig(widgetConfig)
  }

export const HelperWidget: FC<HelperWidgetProps> = ({ appName }) => {
  const [widgetOpen, setWidgetOpen] = useState(false)
  const [widgetConfig, setWidgetConfig] = useState<HelperWidgetConfig[] | null>(null)
  const pathname = globalThis.location.pathname

  useEffect(handlePathChange(setWidgetConfig, pathname, appName), [pathname, appName])

  if (!widgetConfig) return null

  return (
    <Portal id="root">
      <SlideOutContainer className={cx(widgetOpen && slideOutIsActive)}>Hello Content</SlideOutContainer>
      <WidgetContainer onClick={handleToggleWidget(widgetOpen, setWidgetOpen)}>
        Hello World {String(widgetOpen)} {appName}
      </WidgetContainer>
    </Portal>
  )
}
