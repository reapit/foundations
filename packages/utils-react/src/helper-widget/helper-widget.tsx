import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import { Portal } from '@reapit/elements'
import { HelperWidgetApps, HelperWidgetConfig, helperWidgetConfig } from './config'
import { SlideOutContainer, slideOutIsActive, WidgetButton, WidgetContainer, widgetIsActive } from './__styles__/index'
import { cx } from '@linaria/core'
import { HelperWidgetContent } from './helper-widget-content'

export interface HelperWidgetProps {
  appName: HelperWidgetApps
}

export const enum HelperContentType {
  none = 'none',
  docs = 'docs',
  videos = 'videos',
  chat = 'chat',
}

export const handleToggleWidget =
  (contentType: HelperContentType | null, setContentType: Dispatch<SetStateAction<HelperContentType | null>>) => () => {
    setContentType(contentType)
  }

export const handlePathChange =
  (setWidgetConfig: Dispatch<SetStateAction<HelperWidgetConfig | null>>, pathname: string, appName: HelperWidgetApps) =>
  () => {
    const appConfig = helperWidgetConfig[appName]
    const foundConfig = appConfig.find((config) => config.pathname === pathname)
    const widgetConfig = foundConfig ? foundConfig : null

    setWidgetConfig(widgetConfig)
  }

export const HelperWidget: FC<HelperWidgetProps> = ({ appName }) => {
  const [contentType, setContentType] = useState<HelperContentType | null>(null)
  const [widgetConfig, setWidgetConfig] = useState<HelperWidgetConfig | null>(null)
  const pathname = globalThis.location.pathname

  useEffect(handlePathChange(setWidgetConfig, pathname, appName), [pathname, appName])

  if (!widgetConfig) return null

  return (
    <Portal id="root">
      <SlideOutContainer className={cx(contentType && contentType !== HelperContentType.none && slideOutIsActive)}>
        {contentType && <HelperWidgetContent config={widgetConfig} contentType={contentType} />}
      </SlideOutContainer>
      <WidgetContainer className={cx(contentType && widgetIsActive)}>
        <WidgetButton onClick={handleToggleWidget(HelperContentType.videos, setContentType)}>Video</WidgetButton>
        <WidgetButton onClick={handleToggleWidget(HelperContentType.docs, setContentType)}>Docs</WidgetButton>
        <WidgetButton onClick={handleToggleWidget(HelperContentType.chat, setContentType)}>Chat</WidgetButton>
        <WidgetButton onClick={handleToggleWidget(!contentType ? HelperContentType.none : null, setContentType)}>
          Help
        </WidgetButton>
      </WidgetContainer>
    </Portal>
  )
}
