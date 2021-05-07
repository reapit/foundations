import * as React from 'react'
import { cx } from 'linaria'
import * as styles from './__styles__'
import Icon from '../icon'

export interface IconButtonProps {
  icon: string
  onClick?: (e: React.SyntheticEvent) => void //eslint-disable-line
  dark?: boolean
  disabled?: boolean
  size?: 'small' | 'medium'
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, dark, disabled, size }: IconButtonProps) => {
  return (
    <button
      className={cx(
        styles.iconButtonContainer,
        dark && styles.darkModeButton,
        disabled && styles.disabledButton,
        size === 'small' && styles.smallButton,
        size === 'medium' && styles.mediumButton,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon icon={icon} color={dark ? 'white' : undefined} />
    </button>
  )
}

export default IconButton
