import React, { FC, ReactNode } from 'react'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

export type TargetType = '_blank' | '_self'

export enum AcProcessType {
  web = 'agencycloud://process/webpage?url=',
  mail = 'agencycloud://process/email?address=',
  app = 'agencycloud://app?id={acId}&launchUri=',
}

export interface DesktopLinkProps {
  content: ReactNode
  target: TargetType
  acProcess: AcProcessType
  uri?: string
  acId?: string
  onClick?: () => void
}

export const getAcUri = (acProcess: AcProcessType, uri: string, acId?: string) => {
  if (acProcess === AcProcessType.app) {
    return `${AcProcessType.app.replace('{acId}', acId ?? '')}/${uri}`
  }

  if (acProcess === AcProcessType.mail) {
    return `${AcProcessType.mail}/${uri}`
  }

  return `${AcProcessType.web}/${uri}`
}

export const DesktopLink: FC<DesktopLinkProps> = ({ content, uri, target, acProcess, acId, onClick }) => {
  const isDesktop = Boolean(window[ReapitConnectBrowserSession.GLOBAL_KEY])

  if (!uri) return <>{content}</>

  if (!isDesktop) {
    const webUri = acProcess === AcProcessType.mail ? `mailto:${uri}` : uri

    return (
      <a onClick={onClick} href={webUri} target={target} rel="noopener noreferrer">
        {content}
      </a>
    )
  }

  const acUri = getAcUri(acProcess, uri, acId)

  return (
    <a onClick={onClick} href={acUri}>
      {content}
    </a>
  )
}
