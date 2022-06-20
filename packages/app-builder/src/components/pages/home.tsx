import React, { FC, useRef } from 'react'
import { Editor, Frame } from '@craftjs/core'
import { debounce } from 'throttle-debounce'
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
  const { updatePage } = useUpdatePage()
  const { pageId } = usePageId()
  const { error } = useSnack()
  const debouncedUpdatePage = debounce(
    1000,
    async (appId: string, page: Partial<Page>, headerFooter: { header: Node[]; footer: Node[] }) => {
      try {
        await Promise.all([updatePage(appId, page, headerFooter), new Promise((resolve) => setTimeout(resolve, 750))])
      } catch (e: any) {
        error(e.message)
      }
    },
  )

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
          debouncedUpdatePage(
            appId,
            {
              id: pageId,
              nodes,
            },
            {
              header,
              footer,
            },
          )
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
