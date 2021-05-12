// Grit component lifted from Geo Diary / Un CRM projects as a quick solution
// Should remove when https://github.com/reapit/foundations/issues/2625 has been completed
import React from 'react'
import * as styles from './__styles__'
import Col from './col'

export interface GridProps {
  children?: React.ReactNode[] | React.ReactNode
}

const Grid: React.FC<GridProps> = ({ children }: GridProps) => {
  return <div className={styles.grid}>{children}</div>
}

export default Grid

export { Col, Grid }
