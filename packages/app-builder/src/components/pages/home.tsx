import React, { FC, useRef } from 'react'
import { Editor, Frame } from '@craftjs/core'
import { useSnack } from '@reapit/elements'

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
import { Node, Page } from '../hooks/apps/fragments'
import { FormInput } from '../ui/user/form-input'
import { useParams } from 'react-router'

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

type PageData = {
  page: Omit<Page, 'name'>
  headerFooter: {
    header: Node[]
    footer: Node[]
  }
}

const useDebouncedUpdatePage = (appId: string) => {
  const { updatePage } = useUpdatePage(appId)
  const { error } = useSnack()
  let timeout: NodeJS.Timeout | undefined

  return (data: PageData) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      if (!data) {
        return
      }
      updatePage(data.page, data.headerFooter).catch((e) => {
        if (!e.message.includes('invalid node')) {
          error(e.message)
        }
      })
    }, 1000)
  }
}

export const Home: FC<HomeProps> = () => {
  const iframeRef = useRef()
  const { appId } = usePageId()
  const { pageId } = useParams<{ pageId?: string }>()
  const updatePage = useDebouncedUpdatePage(appId)

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
          updatePage({
            page: {
              id: pageId,
              nodes,
            },
            headerFooter: {
              header,
              footer,
            },
          })
        }
      }}
    >
      <Viewport iframeRef={iframeRef} pageId={pageId}>
        <Frame>
          <div />
        </Frame>
      </Viewport>
    </Editor>
  )
}

export default Home
