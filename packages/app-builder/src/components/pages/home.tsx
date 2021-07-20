// @ts-nocheck
import React, { FC, useRef } from 'react'
import { Editor, Frame, Element } from '@craftjs/core'

import { RenderNode } from '../ui/RenderNode'
import Viewport from '../ui/Viewport'
import Container from '../ui/user/Container'
import Text from '../ui/user/Text'

export type AuthenticatedProps = {}

export const Authenticated: FC<AuthenticatedProps> = () => {
  const iframeRef = useRef()

  return (
    <div style={{ width: '100%' }}>
      <Editor
        resolver={{
          Text,
          Container,
        }}
        onRender={(props) => <RenderNode {...props} iframeRef={iframeRef.current} />}
      >
        <Viewport iframeRef={iframeRef}>
          <Frame>
            <Element
              canvas
              is={Container}
              width="12"
              fixedWidth="800px"
              height="auto"
              background="white"
              padding={40}
              custom={{ displayName: 'App' }}
            >
              <Text text="I'm here by default!" />
            </Element>
          </Frame>
        </Viewport>
      </Editor>
    </div>
  )
}

export default Authenticated
