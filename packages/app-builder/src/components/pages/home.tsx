import React, { FC, useEffect, useMemo, useRef } from 'react'
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
import { useUpdatePage } from '../hooks/apps/use-update-app'
import { isInitialLoad, nodesObjtoToArr, splitPageNodesIntoSections } from '../hooks/apps/node-helpers'
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

export const Home: FC<HomeProps> = () => {
  const iframeRef = useRef()
  const { appId, pageId } = usePageId()
  const { updatePage } = useUpdatePage(appId)
  const debouncedUpdatePage = useMemo(() => debounce(updatePage, 1000), [updatePage])

  useEffect(() => {
    return () => {
      debouncedUpdatePage.clear()
    }
  }, [debouncedUpdatePage])

  return (
    <Editor
      resolver={resolver}
      onRender={(props) => <RenderNode {...props} iframeRef={iframeRef.current} />}
      onNodesChange={(query) => {
        const { pageId, appId } = getPageId()
        const nodesObj = query.getSerializedNodes()
        if (query.serialize() !== '{}' && !isInitialLoad(nodesObj)) {
          const pageNodes = nodesObjtoToArr(appId, pageId, nodesObj)
          const { nodes, header, footer } = splitPageNodesIntoSections(pageNodes)
          const page = {
            id: pageId,
            nodes,
          }
          const headerFooter = {
            header,
            footer,
          }
          debouncedUpdatePage(page, headerFooter)
        }
      }}
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
