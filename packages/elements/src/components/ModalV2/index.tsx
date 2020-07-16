import React from 'react'
import Dialog from 'rc-dialog'
import { cx } from 'linaria'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import { modalContainer, modalCentered } from './__styles__'

export interface ModalPropsV2 extends IDialogPropTypes {
  isCentered?: boolean
}

export const ModalV2: React.FC<ModalPropsV2> = ({
  children,
  className,
  wrapClassName,
  destroyOnClose = true,
  isCentered = false,
  ...restProps
}) => {
  return (
    <Dialog
      {...restProps}
      destroyOnClose={destroyOnClose}
      className={cx(modalContainer, className)}
      wrapClassName={cx(isCentered && modalCentered, wrapClassName)}
    >
      {children}
    </Dialog>
  )
}

export default React.memo(ModalV2)
