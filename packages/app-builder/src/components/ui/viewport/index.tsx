import React, { useEffect, useState } from 'react'
import { SerializedNode, useEditor } from '@craftjs/core'
import {
  elFlex,
  elFlex1,
  elFlexColumn,
  elFlexRow,
  elHFull,
  elMAuto,
  elPb6,
  elPt6,
  elWFull,
  ToggleRadio,
} from '@reapit/elements'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import IFrame from 'react-frame-component'
import { DESKTOP_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from './__styles__/media'

import Toolbox from '../toolbox'
import Header from '../header'
import Sidebar from '../sidebar'

import {
  flexAlignStretch,
  hScreen,
  justifyStretch,
  overflowAuto,
  overflowHidden,
  relative,
  transition,
} from '../styles'
import { InjectFrameStyles } from './inject-frame-styles'
import { usePageId } from '@/core/usePageId'
import { useApp } from '@/components/hooks/apps/use-app'
import { Page } from '@/components/hooks/apps/fragments'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
`

const Breakpoints = styled.div`
  height: 35px;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`

const nodesArrToObj = (nodes: Page['nodes']): Record<string, SerializedNode> => {
  const obj = {}
  nodes.forEach((node) => {
    obj[node.id] = {
      ...node,
      id: undefined,
    }
  })
  return obj
}

const Viewport = ({ children, iframeRef }) => {
  const { connectors, actions } = useEditor()
  const [breakpoint, setBreakpoint] = useState(TABLET_BREAKPOINT)
  const { pageId, appId } = usePageId()
  const { data } = useApp(appId)

  useEffect(() => {
    if (data) {
      const page = data.pages.find((page) => page.id === pageId)
      if (page) {
        actions.deserialize(nodesArrToObj(page.nodes))
      }
    }
  }, [data, pageId])

  return (
    <div className={cx(elFlex1, elFlexColumn, justifyStretch, hScreen)}>
      <Header />
      <div className={cx(elFlex, overflowHidden, elFlexRow, elWFull)} style={{ height: 'calc(100vh - 45px)' }}>
        <Toolbox />
        <Container>
          <Breakpoints>
            <ToggleRadio
              name="responsive preview"
              isFullWidth
              onChange={(e) => setBreakpoint(parseInt(e.currentTarget.value, 10))}
              options={[
                {
                  id: DESKTOP_BREAKPOINT.toString(),
                  value: DESKTOP_BREAKPOINT.toString(),
                  text: 'Desktop',
                  isChecked: breakpoint === DESKTOP_BREAKPOINT,
                },
                {
                  id: TABLET_BREAKPOINT.toString(),
                  value: TABLET_BREAKPOINT.toString(),
                  text: 'Tablet',
                  isChecked: breakpoint === TABLET_BREAKPOINT,
                },
                {
                  id: MOBILE_BREAKPOINT.toString(),
                  value: MOBILE_BREAKPOINT.toString(),
                  text: 'Mobile',
                  isChecked: breakpoint === MOBILE_BREAKPOINT,
                },
              ]}
            />
          </Breakpoints>
          <IFrame
            style={{ transition: 'width 350ms', width: breakpoint, flex: 1 }}
            ref={iframeRef}
            head={
              <>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
              </>
            }
          >
            <div id="page-container" className={cx(elFlex, elFlex1, elHFull, elFlexColumn, elPt6)}>
              <div
                id="craftjs-renderer"
                className={cx(elFlex1, elHFull, elWFull, transition, elPb6, overflowAuto)}
                ref={(ref) => ref && connectors.select(connectors.hover(ref, ''), '')}
              >
                <div className={cx(elFlex, elFlexRow, flexAlignStretch, relative, elPt6, elMAuto)}>
                  <InjectFrameStyles>{children}</InjectFrameStyles>
                </div>
              </div>
            </div>
          </IFrame>
        </Container>
        <Sidebar />
      </div>
    </div>
  )
}

export default Viewport
