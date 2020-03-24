import * as React from 'react'
import Notification from 'rc-notification'
import { NotificationInstance as RCNotificationInstance } from 'rc-notification/lib/Notification'
import createUseNotification from './useNotification'

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export type NotificationType = 'success' | 'info' | 'error' | 'warn'

const notificationInstance: {
  [key: string]: Promise<RCNotificationInstance>
} = {}
let defaultDuration = 3
let defaultTop = 24
let defaultBottom = 24
let defaultPlacement: NotificationPlacement = 'topRight'
let defaultGetContainer: () => HTMLElement
let defaultCloseIcon: React.ReactNode

export interface ConfigProps {
  top?: number
  bottom?: number
  duration?: number
  placement?: NotificationPlacement
  getContainer?: () => HTMLElement
  closeIcon?: React.ReactNode
}

function setNotificationConfig(options: ConfigProps) {
  const { duration, placement, bottom, top, getContainer, closeIcon } = options
  if (duration !== undefined) {
    defaultDuration = duration
  }
  if (placement !== undefined) {
    defaultPlacement = placement
  }
  if (bottom !== undefined) {
    defaultBottom = bottom
  }
  if (top !== undefined) {
    defaultTop = top
  }
  if (getContainer !== undefined) {
    defaultGetContainer = getContainer
  }
  if (closeIcon !== undefined) {
    defaultCloseIcon = closeIcon
  }
}

export function getPlacementStyle(
  placement: NotificationPlacement,
  top: number = defaultTop,
  bottom: number = defaultBottom,
) {
  let style
  switch (placement) {
    case 'topLeft':
      style = {
        left: 0,
        top,
        bottom: 'auto',
      }
      break
    case 'topRight':
      style = {
        right: 0,
        top,
        bottom: 'auto',
      }
      break
    case 'bottomLeft':
      style = {
        left: 0,
        top: 'auto',
        bottom,
      }
      break
    default:
      style = {
        right: 0,
        top: 'auto',
        bottom,
      }
      break
  }
  return style
}

function getNotificationInstance(
  args: ArgsProps,
  callback: (info: { prefixCls: string; instance: RCNotificationInstance }) => void,
) {
  const {
    placement = defaultPlacement,
    top,
    bottom,
    getContainer = defaultGetContainer,
    closeIcon = defaultCloseIcon,
  } = args
  const outerPrefixCls = args.prefixCls || 'reapit-notification'
  const prefixCls = `${outerPrefixCls}-notice`

  const cacheKey = `${outerPrefixCls}-${placement}`
  const cacheInstance = notificationInstance[cacheKey]
  if (cacheInstance) {
    Promise.resolve(cacheInstance).then(instance => {
      callback({ prefixCls, instance })
    })
    return
  }

  const closeIconToRender = <span>{closeIcon || <button className="delete is-small" />}</span>

  notificationInstance[cacheKey] = new Promise(resolve => {
    Notification.newInstance(
      {
        prefixCls: outerPrefixCls,
        className: `${outerPrefixCls}-${placement}`,
        style: getPlacementStyle(placement, top, bottom),
        getContainer,
        closeIcon: closeIconToRender,
      },
      notification => {
        resolve(notification)
        callback({
          prefixCls,
          instance: notification,
        })
      },
    )
  })
}

export interface ArgsProps {
  message: React.ReactNode
  btn?: React.ReactNode
  key?: string
  onClose?: () => void
  duration?: number | null
  placement?: NotificationPlacement
  style?: React.CSSProperties
  prefixCls?: string
  className?: string
  readonly type?: NotificationType
  top?: number
  bottom?: number
  getContainer?: () => HTMLElement
  closeIcon?: React.ReactNode
}

function getRCNoticeProps(args: ArgsProps) {
  const duration = args.duration === undefined ? defaultDuration : args.duration

  const variant =
    args.type === 'success'
      ? 'is-success'
      : args.type === 'info'
      ? 'is-info'
      : args.type === 'error'
      ? 'is-danger'
      : 'is-warning'

  return {
    content: <div className={`notification reapit-notification-content ${variant}`}>{args.message}</div>,
    duration,
    closable: true,
    onClose: args.onClose,
    key: args.key,
    style: args.style || {},
    className: args.className,
  }
}

const api = {
  open: (args: ArgsProps) => {
    getNotificationInstance(args, ({ instance }) => {
      instance.notice(getRCNoticeProps(args))
    })
  },
  close(key: string) {
    Object.keys(notificationInstance).forEach(cacheKey =>
      Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.removeNotice(key)
      }),
    )
  },
  config: setNotificationConfig,
  destroy() {
    Object.keys(notificationInstance).forEach(cacheKey => {
      Promise.resolve(notificationInstance[cacheKey]).then(instance => {
        instance.destroy()
      })
      delete notificationInstance[cacheKey]
    })
  },
  useNotification: createUseNotification(getNotificationInstance, getRCNoticeProps),
}
;['success', 'info', 'error', 'warn'].forEach(type => {
  api[type] = (args: ArgsProps) =>
    api.open({
      ...args,
      type: type as NotificationType,
    })
})

export interface NotificationInstance {
  success(args: ArgsProps): void
  error(args: ArgsProps): void
  info(args: ArgsProps): void
  warm(args: ArgsProps): void
  open(args: ArgsProps): void
}

export interface NotificationApi extends NotificationInstance {
  close(key: string): void
  config(options: ConfigProps): void
  destroy(): void
  useNotification: () => [NotificationInstance, React.ReactElement]
}

export default api as NotificationApi
