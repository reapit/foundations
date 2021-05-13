import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cx } from 'linaria'
import * as styles from './__styles__'
import { useViewPortSize } from './use-view-port-size'

type RangeType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface ColProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode[] | ReactNode
  span?: RangeType
  spanMobile?: RangeType
  spanTablet?: RangeType
  offset?: RangeType
  offsetMobile?: RangeType
  offsetTablet?: RangeType
}

const Col: FC<ColProps> = ({
  children,
  span = 12,
  spanMobile = 12,
  spanTablet = 12,
  offset = 0,
  offsetMobile = 0,
  offsetTablet = 0,
  className,
}: ColProps) => {
  const device = useViewPortSize()
  const spanId = device === 'MOBILE' ? spanMobile : device === 'TABLET' ? spanTablet : span
  const offsetId = device === 'MOBILE' ? offsetMobile : device === 'TABLET' ? offsetTablet : offset
  const spanClass = styles[`span${spanId}`]
  const offsetClass = offset > 0 && styles[`offset${offsetId}`]

  return <div className={cx(styles.col, spanClass, offsetClass, className && className)}>{children}</div>
}

export default Col
