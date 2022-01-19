import { useNode } from '@craftjs/core'
import React from 'react'

import Container from './container'
import { QRCodeProps, QRCode as EQRCode } from './ejectable/qr-code'
import { LinkSettings } from './link'

const defaultProps = {
  destination: '',
}

const QRCode = (props: QRCodeProps) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return <EQRCode {...props} ref={(ref) => ref && connect(drag(ref))} />
}

QRCode.craft = {
  displayName: 'QRCode',
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: LinkSettings,
  },
}

export default QRCode
