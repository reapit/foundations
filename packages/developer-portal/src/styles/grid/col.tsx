import * as React from 'react'
import { cx } from 'linaria'
import * as styles from './__styles__'

type RangeType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface ColProps {
  children?: React.ReactNode[] | React.ReactNode
  span?: RangeType
  offset?: RangeType
}

const Col: React.FC<ColProps> = ({ children, span = 6, offset = 0 }: ColProps) => {
  const spanClass = styles[`span${span}`]
  const offsetClass = offset > 0 && styles[`offset${offset}`]

  return <div className={cx(styles.col, spanClass, offsetClass)}>{children}</div>
}

export default Col
