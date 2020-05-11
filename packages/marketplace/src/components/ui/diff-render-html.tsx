import * as React from 'react'
import styles from '@/styles/blocks/diff-render-html.scss?mod'
import { HTMLRender } from '@reapit/elements'

export interface DiffRenderHTMLProps {
  currentString?: string
  changedString?: string
}

const DiffRenderHTML = ({ currentString, changedString }: DiffRenderHTMLProps) => {
  const isDiff = currentString !== changedString
  return (
    <div className={styles.container}>
      <HTMLRender className={`${styles.block} ${isDiff ? styles.red : ''}`} html={currentString || ''} />
      <span className={styles.arrow}>&#8594;</span>
      <HTMLRender className={`${styles.block} ${isDiff ? styles.green : ''}`} html={changedString || ''} />
    </div>
  )
}

export default DiffRenderHTML
