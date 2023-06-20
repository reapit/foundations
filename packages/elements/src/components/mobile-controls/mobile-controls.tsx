import React, { Dispatch, FC, HTMLAttributes, MouseEvent, SetStateAction, useState } from 'react'
import { ElMobileControlItem, ElMobileControls, ElMobileControlsBg, elMobileControlsVisible } from './__styles__'
import { IconNames } from '../icon'
import { FloatingButton } from '../button'
import { cx } from '@linaria/core'
import { elIsActive } from '../../styles/states'
import { elFadeIn } from '../../styles/helpers'

export interface MobileControlItem extends HTMLAttributes<HTMLAnchorElement> {
  onClick?: () => void
  label: string
}

export interface MobileControlsProps extends HTMLAttributes<HTMLDivElement> {
  buttonIcon?: IconNames
  buttonOnClick?: () => void
  mobileControlItems?: MobileControlItem[]
  isVisible?: boolean
}

export const clickEventHandler = (setActive: Dispatch<SetStateAction<boolean>>, onClick?: () => void) => (
  event: MouseEvent<HTMLAnchorElement | HTMLDivElement>,
) => {
  event?.preventDefault()
  event?.stopPropagation()

  setActive((active) => !active)

  if (onClick) {
    onClick()
  }
}

export const MobileControls: FC<MobileControlsProps> = ({
  mobileControlItems,
  buttonOnClick,
  buttonIcon,
  isVisible,
  ...rest
}) => {
  const [active, setActive] = useState<boolean>(false)
  return (
    <>
      <ElMobileControlsBg className={cx(active && elIsActive)} />
      <ElMobileControls
        className={cx(isVisible && elMobileControlsVisible)}
        onClick={clickEventHandler(setActive, buttonOnClick)}
        {...rest}
      >
        {mobileControlItems?.map(({ onClick, label, ...item }, index) => (
          <ElMobileControlItem
            className={cx(active && elIsActive)}
            onClick={clickEventHandler(setActive, onClick)}
            {...item}
            key={index}
          >
            {label}
          </ElMobileControlItem>
        ))}
        <FloatingButton intent="primary" icon={buttonIcon ? buttonIcon : 'filterSystem'} />
      </ElMobileControls>
    </>
  )
}
