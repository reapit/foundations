import * as React from 'react'
import styles from '@/styles/blocks/loader.scss'

const Loader: React.FunctionComponent<{ body?: boolean }> = ({ body = true }) => (
  <div className={`${styles.loader} ${body && styles.body}`}>
    <div />
    <div />
    <div />
    <div />
  </div>
)

export default Loader
