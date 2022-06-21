import React, { FC, useEffect, useRef } from 'react'
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
  const { pageId, appId } = usePageId()
  const { updatePage } = useUpdatePage(appId)
  const { error } = useSnack()

  let data:
    | undefined
    | {
        page: Omit<Page, 'name'>
        headerFooter: {
          header: Node[]
          footer: Node[]
        }
      }

  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        updatePage(data.page, data.headerFooter).catch((e) => {
          error(e.message)
        })
        data = undefined
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

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
          data = {
            page: {
              id: pageId,
              nodes,
            },
            headerFooter: {
              header,
              footer,
            },
          }
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
