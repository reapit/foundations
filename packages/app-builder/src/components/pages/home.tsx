import React, { FC, useRef } from 'react'
import { Editor, Frame, Element } from '@craftjs/core'

import { RenderNode } from '../ui/render-node'
import Viewport from '../ui/viewport'
import Container from '../ui/user/container'
import Text from '../ui/user/text'
import Link from '../ui/user/link'
import Context from '../ui/user/context'
import { useIntrospection } from '../hooks/use-introspection'

export type AuthenticatedProps = {}

export const Authenticated: FC<AuthenticatedProps> = () => {
  const iframeRef = useRef()

  const { data } = useIntrospection()

  console.log(data?.__schema.queryType.name)

  return (
    <Editor
      resolver={{
        Text,
        Container,
        Link,
        Context,
      }}
      onRender={(props) => <RenderNode {...props} iframeRef={iframeRef.current} />}
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
