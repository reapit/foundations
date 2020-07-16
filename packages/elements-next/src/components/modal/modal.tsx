import React from 'react'
import Dialog from 'rc-dialog'
import { cx } from 'linaria'
import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes'
import { modalContainer, modalCentered } from './__styles__'
import '../../../../../node_modules/rc-dialog/assets/index.css'

declare type IStringOrHtmlElement = string | HTMLElement

export interface ModalProps extends IDialogPropTypes {
  /**
   * This is property to set Modal center of the screen
   */
  isCentered?: boolean
  /**
   * The dialog dom node's prefixCls
   */
  prefixCls?: string
  /**
   * Additional className for dialog
   */
  className?: string
  /**
   * Additional className for dialog wrap
   */
  wrapClassName?: string
  /**
   * Root style for dialog element.Such as width, height
   */
  style?: React.CSSProperties
  zIndex?: number
  /**
   * Body style for dialog body element.Such as height
   */
  bodyStyle?: {}
  /**
   * Style for mask element.
   */
  maskStyle?: {}
  /**
   * Current dialog's visible status
   */
  visible?: boolean
  /**
   * part of dialog animation css class name
   */
  animation?: any
  /**
   * Part of dialog's mask animation css class name
   */
  maskAnimation?: any
  /**
   * whether support press esc to close
   */
  keyboard?: boolean
  /**
   * whether show mask
   */
  mask?: boolean
  /**
   * Children of the component
   */
  children?: any
  /**
   * called when close animation end
   */
  afterClose?: () => any
  /**
   * called when click close button or mask
   */
  onClose?: (e: React.SyntheticEvent<HTMLDivElement>) => any
  /**
   * whether show close button
   */
  closable?: boolean
  /**
   * whether click mask to close
   */
  maskClosable?: boolean
  /**
   * to unmount child compenents on onClose
   */
  destroyOnClose?: boolean
  /**
   * set pageX and pageY of current mouse(it will cause transform origin to be set).
   */
  mousePosition?: {
    x: number
    y: number
  }
  /**
   * Title of the dialog
   */
  title?: React.ReactNode
  /**
   * footer of the dialog
   */
  footer?: React.ReactNode
  /**
   * dialog animation css class name
   */
  transitionName?: string
  /**
   * mask animation css class name
   */
  maskTransitionName?: string
  /**
   * Style object for wrap
   */
  wrapStyle?: {}
  /**
   * width of the modal
   */
  width?: number
  /**
   * height of the modal
   */
  height?: number
  /**
   * Props for body
   */
  bodyProps?: any
  /**
   * Props for mask
   */
  maskProps?: any
  /**
   * Props for wrap
   */
  wrapProps?: any
  /**
   * to determine where Dialog will be mounted
   */
  getContainer?: IStringOrHtmlElement | (() => IStringOrHtmlElement) | false
  /**
   * specific the close icon.
   */
  closeIcon?: React.ReactNode
  /**
   * Create dialog dom node before dialog first show
   */
  forceRender?: boolean
  /**
   * focus trigger element when dialog closed
   */
  focusTriggerAfterClose?: boolean
}

export const Modal: React.FC<ModalProps> = ({ children, className, wrapClassName, isCentered, ...restProps }) => {
  return (
    <Dialog
      {...restProps}
      className={cx(modalContainer, className)}
      wrapClassName={cx(wrapClassName, isCentered && modalCentered)}
    >
      {children}
    </Dialog>
  )
}

Modal.defaultProps = {
  prefixCls: 'rc-dialog',
  style: {},
  bodyStyle: {},
  maskStyle: {},
  visible: false,
  closable: true,
  mask: true,
  maskClosable: true,
  keyboard: true,
  destroyOnClose: false,
  forceRender: false,
  focusTriggerAfterClose: true,
  isCentered: false,
}

export default React.memo(Modal)
