import * as React from 'react'

import { FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { initializeBlocks } from '../../core/initialize-components'

const DEFAULT_IDENTIFIER = 'index'

export const loadEditor = async (
  setHasLoadedEditor: React.Dispatch<React.SetStateAction<boolean>>,
  identifier = DEFAULT_IDENTIFIER,
) => {
  const { initializeEditor } = await import('../../core/editor')
  const editor = initializeEditor({ identifier })
  initializeBlocks(editor)
  setHasLoadedEditor(true)
}

export const EditorPage: React.FunctionComponent = () => {
  const [hasLoadedEditor, setHasLoadedEditor] = React.useState(false)

  if (!hasLoadedEditor) {
    loadEditor(setHasLoadedEditor)
  }

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasBackground>
        <div id={DEFAULT_IDENTIFIER}></div>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default EditorPage
