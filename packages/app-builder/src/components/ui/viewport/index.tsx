import React, { useEffect, useState } from 'react'
import { useEditor } from '@craftjs/core'
import { elFlex, elFlex1, elFlexColumn, elFlexRow, elHFull, elMAuto, elPb6, elPt9, elWFull } from '@reapit/elements'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import IFrame from 'react-frame-component'

import Header from '../header'
import Sidebar from '../sidebar'

import { flexAlignStretch, hScreen, justifyStretch, overflowAuto, relative, transition } from '../styles'
import { InjectFrameStyles } from './inject-frame-styles'
import { usePageId } from '@/components/hooks/use-page-id'
import { useApp } from '@/components/hooks/apps/use-app'
import { mergeHeaderFooterIntoPage, nodesArrToObj } from '@/components/hooks/apps/node-helpers'
import { TABLET_BREAKPOINT } from './__styles__/media'
import { useZoom } from '@/components/hooks/use-zoom'

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  overflow: auto;
`

export const Viewport = ({ children, iframeRef, deserialize, rendererDivRefHandler }) => {
  const [breakpoint, setBreakpoint] = useState(TABLET_BREAKPOINT)
  const { zoom } = useZoom()

  const { appId, pageId } = usePageId()
  const { app } = useApp(appId)
  const page = app?.pages.find((p) => p.id === pageId)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let timeout
    if (page && !loaded) {
      timeout = setTimeout(() => {
        try {
          const nodes = mergeHeaderFooterIntoPage(page.nodes, app?.header, app?.footer)
          nodes.forEach((node) => {
            if (node.parent && !nodes.some((n) => n.nodeId === node.parent)) {
              throw new Error(`Parent node ${node.parent} not found for node ${node.id}`)
            }
            if (node.nodes && !node.nodes.every((n) => nodes.some((nn) => nn.nodeId === n))) {
              throw new Error(`Child node ${node.id} has invalid children`)
            }
            if (typeof node.id !== 'string') {
              throw new Error(`Node ${node.id} has invalid id`)
            }
          })
          deserialize(nodesArrToObj(nodes))
        } catch (e) {
          console.error(e)
        }
        setLoaded(true)
      }, 300)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [page, loaded])

  return (
    <div className={cx(elFlex1, elFlexColumn, justifyStretch, hScreen)}>
      <Header breakpoint={breakpoint} setBreakpoint={setBreakpoint} />
      <div className={cx(elFlex, elFlexRow)} style={{ height: 'calc(100vh - 56px)', width: '100vw' }}>
        <Container>
          <IFrame
            style={{
              transition: 'width 350ms',
              width: breakpoint,
              flex: 1,
              margin: 'auto',
            }}
            ref={iframeRef}
            head={
              <>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
              </>
            }
          >
            <div
              id="page-container"
              className={cx(elFlex, elFlex1, elHFull, elFlexColumn)}
              style={{
                transition: 'transform 350ms',
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
              }}
            >
              <div
                id="craftjs-renderer"
                className={cx(elFlex1, elHFull, elWFull, transition, elPb6, overflowAuto)}
                ref={rendererDivRefHandler}
              >
                <div className={cx(elFlex, elFlexRow, flexAlignStretch, relative, elPt9, elMAuto)}>
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
