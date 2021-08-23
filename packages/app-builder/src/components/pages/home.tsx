import React, { FC, useRef } from 'react'
import { Editor, Frame, Element, SerializedNode } from '@craftjs/core'

import { RenderNode } from '../ui/render-node'
import Viewport from '../ui/viewport'
import Container from '../ui/user/container'
import Text from '../ui/user/text'
import Link from '../ui/user/link'
import Context from '../ui/user/context'
import Table from '../ui/user/table'
import Form from '../ui/user/form'
import { setPageNodes } from '../ui/header/saveState'
import { usePageId } from '@/core/usePageId'

export type AuthenticatedProps = {}

const isInitialLoad = (nodes: Record<string, SerializedNode>) => {
  if (Object.keys(nodes).length === 2) {
    const nonRootKey = Object.keys(nodes).find((key) => key !== 'ROOT')
    return nonRootKey && nodes[nonRootKey].props.text === "I'm here by default!"
  }
  return false
}

export const Authenticated: FC<AuthenticatedProps> = () => {
  const iframeRef = useRef()
  const { pageId } = usePageId()

  return (
    <Editor
      resolver={{
        Text,
        Container,
        Link,
        Context,
        Table,
        Form,
      }}
      onRender={(props) => <RenderNode {...props} iframeRef={iframeRef.current} />}
      onNodesChange={(query) => {
        if (query.serialize() !== '{}' && !isInitialLoad(query.getSerializedNodes())) {
          setPageNodes(pageId, query.serialize())
        }
      }}
    >
      <Viewport iframeRef={iframeRef}>
        <Frame>
          <Element canvas is={Container} width={12} background="white" padding={40} custom={{ displayName: 'App' }}>
            <Text text="I'm here by default!" />
          </Element>
        </Frame>
      </Viewport>
    </Editor>
  )
}

export default Authenticated
