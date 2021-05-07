import * as React from 'react'
import * as styles from './__styles__'

import add from './icons/add'
import automate from './icons/automate'
import back from './icons/back'
import call from './icons/call'
import cancel from './icons/cancel'
import chevronDown from './icons/chevron-down'
import chevronRight from './icons/chevron-right'
import contact from './icons/contact'
import edit from './icons/edit'
import email from './icons/email'
import events from './icons/events'
import noProperties from './icons/no-properties'
import questionMark from './icons/question-mark'
import sms from './icons/sms'
import stock from './icons/stock'
import whatsapp from './icons/whatsapp'

const iconSet = {
  add,
  automate,
  back,
  call,
  cancel,
  chevronDown,
  chevronRight,
  contact,
  edit,
  email,
  events,
  noProperties,
  questionMark,
  sms,
  stock,
  whatsapp,
}

export interface IconProps {
  icon:
    | string
    | 'add'
    | 'automate'
    | 'back'
    | 'call'
    | 'cancel'
    | 'chevronDown'
    | 'chevronRight'
    | 'contact'
    | 'edit'
    | 'email'
    | 'events'
    | 'noProperties'
    | 'questionMark'
    | 'sms'
    | 'stock'
    | 'whatsapp'
  color?: string
  fontSize?: string
}

const Icon: React.FC<IconProps> = ({ icon, color, fontSize }: IconProps) => {
  const Svg = iconSet[icon]

  if (!Svg) return null

  return (
    <span className={styles.iconContainer} style={{ color, fontSize }}>
      <Svg />
    </span>
  )
}

export default Icon
