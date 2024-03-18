import React, { FC } from 'react'
import * as jsdiff from 'diff'
import { diffViewerContainer, greenBackground, redBackground } from './__styles__'
import { cx } from '@linaria/core'

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

export const DiffViewer: FC<DiffViewerProps> = ({ currentString, changedString, type = 'words' }) => {
  const result = diffTypes[type](currentString, changedString).map((part, index) => {
    return (
      <span key={`${part.value}-${index}`} className={cx(part.added && greenBackground, part.removed && redBackground)}>
        {part.value}
      </span>
    )
  })
  return <div className={diffViewerContainer}>{result}</div>
}
