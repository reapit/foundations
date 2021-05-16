// Should remove when https://github.com/reapit/foundations/issues/2625 has been completed
// Grid intended as an experiment to see how it performs for Elements
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import * as styles from './__styles__'
import Col from './col'
import { cx } from 'linaria'
import { useViewPortSize } from './use-view-port-size'

export type GridGapType = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12

export interface GridProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode[] | ReactNode
  colGap?: GridGapType
  colGapMobile?: GridGapType
  colGapTablet?: GridGapType
  rowGap?: GridGapType
  rowGapMobile?: GridGapType
  rowGapTablet?: GridGapType
}

const Grid: FC<GridProps> = ({
  children,
  colGap = 6,
  colGapMobile = 6,
  colGapTablet = 6,
  rowGap = 8,
  rowGapMobile = 8,
  rowGapTablet = 8,
  className,
}: GridProps) => {
  const device = useViewPortSize()
  const colGapId = device === 'MOBILE' ? colGapMobile : device === 'TABLET' ? colGapTablet : colGap
  const rowGapId = device === 'MOBILE' ? rowGapMobile : device === 'TABLET' ? rowGapTablet : rowGap
  const colGapClass = styles[`colGap${colGapId}`]
  const rowGapClass = rowGap > 0 && styles[`rowGap${rowGapId}`]

  return <div className={cx(styles.grid, rowGapClass, colGapClass, className && className)}>{children}</div>
}

export default Grid

export { Col, Grid }
