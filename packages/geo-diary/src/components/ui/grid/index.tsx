import * as React from 'react'
import * as styles from './__styles__'
import Col from './col'

export interface GridProps {
  children?: React.ReactNode[] | React.ReactNode
}

const Grid: React.FC<GridProps> = ({ children }: GridProps) => {
  return <div className={styles.grid}>{children}</div>
}

export default Grid

// export Col from this file so other components only need to import
// one file to use all grid elements
export { Col }
