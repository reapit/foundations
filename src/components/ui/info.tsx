import * as React from 'react'
import styles from '@/styles/ui/info.scss?mod'

const Info: React.SFC<any> = ({ children }) => <div className={styles.info}>{children}</div>

export default Info
