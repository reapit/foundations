import React from 'react'
import Dialog from 'rc-dialog'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'

export const Modal: React.FC<IDialogPropTypes> = ({ children, ...restProps }) => {
  return <Dialog {...restProps}>{children}</Dialog>
}

export default React.memo(Modal)
