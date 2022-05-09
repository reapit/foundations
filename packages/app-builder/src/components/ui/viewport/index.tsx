import React, { useEffect, useState } from 'react'
import { useEditor } from '@craftjs/core'
import { elFlex, elFlex1, elFlexColumn, elFlexRow, elHFull, elMAuto, elPb6, elPt6, elWFull } from '@reapit/elements'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import IFrame from 'react-frame-component'

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
import { usePageId } from '@/components/hooks/use-page-id'
import { useApp } from '@/components/hooks/apps/use-app'
import { nodesArrToObj } from '@/components/hooks/apps/node-helpers'
import { TABLET_BREAKPOINT } from './__styles__/media'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
`

export const Viewport = ({ children, iframeRef, deserialize, rendererDivRefHandler }) => {
  const [breakpoint, setBreakpoint] = useState(TABLET_BREAKPOINT)

  const { pageId, appId } = usePageId()
  const { app } = useApp(appId)
  const page = app?.pages.find((p) => p.id === pageId)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (page && !loaded) {
      setTimeout(() => {
        deserialize(nodesArrToObj(page.nodes))
        setLoaded(true)
      }, 300)
    }
  }, [page, loaded])

  return (
    <div className={cx(elFlex1, elFlexColumn, justifyStretch, hScreen)}>
      <Header breakpoint={breakpoint} setBreakpoint={setBreakpoint} />
      <div className={cx(elFlex, overflowHidden, elFlexRow, elWFull)} style={{ height: 'calc(100vh - 45px)' }}>
        <Container>
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
                ref={rendererDivRefHandler}
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

const ConnectedViewport = ({ children, iframeRef }) => {
  const { connectors, actions } = useEditor()

  return (
    <Viewport
      iframeRef={iframeRef}
      deserialize={actions.deserialize}
      rendererDivRefHandler={(ref) => ref && connectors.select(connectors.hover(ref, ''), '')}
    >
      {children}
    </Viewport>
  )
}

export default ConnectedViewport
