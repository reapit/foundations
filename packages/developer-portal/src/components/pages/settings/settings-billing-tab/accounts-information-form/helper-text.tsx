import * as React from 'react'
import { cx } from 'linaria'
import { isBlue } from './__styles__/helper-text'

export type HelperTextProps = {
  text: string
}

const HelperText: React.FC<HelperTextProps> = ({ text }) => {
  return (
    <div className={cx('notification', isBlue)} role="alert">
      {text}
    </div>
  )
}

export default HelperText
