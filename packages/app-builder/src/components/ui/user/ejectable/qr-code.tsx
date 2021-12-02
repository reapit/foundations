import React, { forwardRef } from 'react'
import path from 'path'
import qs from 'query-string'
import QR from 'react-qr-code'
import { useParams } from 'react-router-dom'

import { usePageId } from '../../../hooks/use-page-id'
import { LinkProps } from './link'
import { Container } from './container'

export type QRCodeProps = LinkProps

export const QRCode = forwardRef<HTMLDivElement, LinkProps>((props, ref) => {
  const { appId } = useParams<{ appId?: string }>()
  const dest = props.destination || ''
  const pathname = path.join('/', appId || '', dest === '~' ? '' : dest)
  const { context } = usePageId()
  const search = {
    ...context,
    ...props.context,
  }
  const query = qs.stringify(search)
  const destUrl = `${window.location.origin}${pathname}${query ? `?${query}` : ''}`

  return (
    <Container {...props} ref={ref}>
      <QR value={destUrl} size={props.width * 12} />
    </Container>
  )
})
