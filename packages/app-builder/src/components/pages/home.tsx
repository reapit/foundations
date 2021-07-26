import React, { FC, useRef } from 'react'
import { Editor, Frame, Element } from '@craftjs/core'
import { MainContainer } from '@reapit/elements'

import { RenderNode } from '../ui/render-node'
import Viewport from '../ui/viewport'
import Container from '../ui/user/container'
import Text from '../ui/user/text'

export type AuthenticatedProps = {}

export const Authenticated: FC<AuthenticatedProps> = () => {
  const iframeRef = useRef()

  return (
    <MainContainer>
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
    </MainContainer>
  )
}

export default Authenticated
