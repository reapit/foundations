// @ts-nocheck
import React, { FC } from 'react'
import { Editor, Frame, Element } from '@craftjs/core'

import { RenderNode } from '../ui/RenderNode'
import Viewport from '../ui/Viewport'
import Container from '../ui/user/Container'
import Text from '../ui/user/Text'

export type AuthenticatedProps = {}

export const Authenticated: FC<AuthenticatedProps> = () => {
  return (
    <div id="page-container" style={{ width: '100%' }}>
      <Editor
        resolver={{
          Text,
          Container,
        }}
        onRender={RenderNode}
      >
        <Viewport>
          <Frame>
            <Element
              canvas
              is={Container}
              width="1"
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
