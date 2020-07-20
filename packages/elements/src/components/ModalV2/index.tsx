import React from 'react'
import Dialog from 'rc-dialog'
import { cx } from 'linaria'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import { modalContainer, modalCentered, modalResponsiveContainer } from './__styles__'

export interface ModalPropsV2 extends IDialogPropTypes {
  isCentered?: boolean
  isResponsive?: boolean
}

export const ModalV2: React.FC<ModalPropsV2> = ({
  children,
  className,
  wrapClassName,
  destroyOnClose = true,
  isCentered = false,
  isResponsive = false,
  ...restProps
}) => {
  return (
    <Dialog
      {...restProps}
      destroyOnClose={destroyOnClose}
      className={cx(modalContainer, isResponsive && modalResponsiveContainer, className)}
      wrapClassName={cx(isCentered && modalCentered, wrapClassName)}
    >
      {children}
    </Dialog>
  )
}

export default React.memo(ModalV2)
