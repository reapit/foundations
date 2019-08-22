import * as React from 'react'

export interface CaretProps {
  isActive: boolean
}

export const Caret: React.SFC<CaretProps> = ({ isActive }) => (
  <span className="caret-container">
    <span className={`"caret-arrow" ${isActive ? 'caret-active' : ''}`} />
  </span>
)
