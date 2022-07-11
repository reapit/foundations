import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { Editor, Frame } from '@craftjs/core'
import { debounce } from 'debounce'

import { RenderNode } from '../ui/render-node'
import Viewport from '../ui/viewport'
import Container from '../ui/user/container'
import Text from '../ui/user/text'
import Link from '../ui/user/link'
import Info from '../ui/user/info'
import Table from '../ui/user/table'
import Form from '../ui/user/form'
import Navigation from '../ui/user/navigation'
import { getPageId, usePageId } from '../hooks/use-page-id'
import { useUpdatePageNodes } from '../hooks/apps/use-update-app'
import { extractBodyNodes, isInitialLoad, nodesObjtoToArr } from '../hooks/apps/node-helpers'
import { FormInput } from '../ui/user/form-input'

export type HomeProps = {}

export const resolver = {
  Text,
  Container,
  Link,
  Info,
  Table,
  Form,
  FormInput,
  Navigation,
}

const pageIdTracker: Record<string, number> = {}

window.pageIdTracker = pageIdTracker

export const Home: FC<HomeProps> = () => {
  const iframeRef = useRef()
  const { appId, pageId } = usePageId()
  const { updatePageNodes } = useUpdatePageNodes(appId, pageId)
  const debouncedUpdatePage = useMemo(() => debounce(updatePageNodes, 1000), [updatePageNodes])

  useEffect(() => {
    return () => {
      debouncedUpdatePage.clear()
    }
  }, [debouncedUpdatePage])

  useEffect(() => {
    return () => {
      if (pageIdTracker[pageId]) {
        pageIdTracker[pageId] = 0
      }
    }
  }, [pageId])

  const onNodesChange = useCallback((query) => {
    const { pageId, appId } = getPageId()
    pageIdTracker[pageId] = pageIdTracker[pageId] || 0
    if (pageIdTracker[pageId] > 0) {
      const nodesObj = query.getSerializedNodes()
      if (query.serialize() !== '{}' && !isInitialLoad(nodesObj)) {
        const nodes = nodesObjtoToArr(appId, pageId, nodesObj)
        debouncedUpdatePage(extractBodyNodes(nodes), pageId)
      }
    }
    pageIdTracker[pageId]++
  }, [])

  return (
    <Editor
      resolver={resolver}
      onRender={(props) => <RenderNode {...props} iframeRef={iframeRef.current} />}
      onNodesChange={onNodesChange}
    >
      <Viewport iframeRef={iframeRef} key={pageId}>
        <Frame>
          <div />
        </Frame>
      </Viewport>
    </Editor>
  )
}

export default Home
