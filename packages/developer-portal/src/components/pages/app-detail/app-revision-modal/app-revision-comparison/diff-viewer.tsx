import * as React from 'react'
import * as jsdiff from 'diff'
import { cx } from 'linaria'
import { diffViewerContainer, green, red } from './__styles__/pending-revision-comparison'

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
  wordsWithSpace: jsdiff.diffWordsWithSpace,
}

const DiffViewer = ({ currentString, changedString, type = 'words' }: DiffViewerProps) => {
  const result = diffTypes[type](currentString, changedString).map((part, index) => {
    return (
      <span key={index} className={cx(part.added ? green : part.removed && red)}>
        {part.value}
      </span>
    )
  })
  return <div className={diffViewerContainer}>{result}</div>
}

export default DiffViewer
