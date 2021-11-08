import React, { Dispatch, FC, SetStateAction, useState, useEffect } from 'react'
import { Portal } from '@reapit/elements'
import { HelperWidgetApps, HelperWidgetConfig, helperWidgetConfig } from './config'
import {
  SlideOutContainer,
  slideOutIsActive,
  WidgetButton,
  widgetButtonIsActive,
  WidgetContainer,
  widgetIsActive,
} from './__styles__/index'
import { cx } from '@linaria/core'
import { HelperWidgetContent } from './helper-widget-content'
import { VideoIcon } from './assets/video'
import { DocsIcon } from './assets/docs'
import { ChatIcon } from './assets/chat'

export interface HelperWidgetProps {
  appName: HelperWidgetApps
}

export enum HelperContentType {
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
        <WidgetButton
          className={cx(contentType && contentType === HelperContentType.videos && widgetButtonIsActive)}
          onClick={handleToggleWidget(HelperContentType.videos, setContentType)}
        >
          <VideoIcon />
          Video
        </WidgetButton>
        <WidgetButton
          className={cx(contentType && contentType === HelperContentType.docs && widgetButtonIsActive)}
          onClick={handleToggleWidget(HelperContentType.docs, setContentType)}
        >
          <DocsIcon />
          Docs
        </WidgetButton>
        <WidgetButton
          className={cx(contentType && contentType === HelperContentType.chat && widgetButtonIsActive)}
          onClick={handleToggleWidget(HelperContentType.chat, setContentType)}
        >
          <ChatIcon />
          Chat
        </WidgetButton>
        <WidgetButton onClick={handleToggleWidget(!contentType ? HelperContentType.none : null, setContentType)}>
          Help
        </WidgetButton>
      </WidgetContainer>
    </Portal>
  )
}
