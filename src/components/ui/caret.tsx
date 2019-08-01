import * as React from 'react'
import menuStyles from '@/styles/blocks/menu.scss?mod'

const { caretContainer, caretArrow, caretActive } = menuStyles

export interface CaretProps {
  isActive: boolean
}

const Caret: React.SFC<CaretProps> = React.memo(({ isActive }) => (
  <span className={caretContainer}>
    <span className={`${caretArrow} ${isActive ? caretActive : ''}`} />
  </span>
))

export default Caret
