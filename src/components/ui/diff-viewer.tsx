import * as React from 'react'
import * as jsdiff from 'diff'
import styles from '@/styles/blocks/diff-viewer.scss?mod'

export type DiffType = 'chars' | 'words' | 'lines' | 'wordsWithSpace'

export interface DiffViewerProps {
  currentString: string
  changedString: string
  type?: DiffType
}

const diffTypes = {
  chars: jsdiff.diffChars,
  words: jsdiff.diffWords,
  lines: jsdiff.diffLines,
  wordsWithSpace: jsdiff.diffWordsWithSpace
}

const DiffViewer = ({ currentString, changedString, type = 'words' }: DiffViewerProps) => {
  const result = diffTypes[type](currentString, changedString).map((part, index) => {
    return (
      <span key={index} className={part.added ? styles.green : part.removed ? styles.red : ''}>
        {part.value}
      </span>
    )
  })
  return <div className={styles.container}>{result}</div>
}

export default DiffViewer
