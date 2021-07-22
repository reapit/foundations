import React, { useContext, useEffect, useState } from 'react'
import { useEditor } from '@craftjs/core'
import { ToggleRadio } from '@reapit/elements'
import IFrame, { FrameContext } from 'react-frame-component'
import styled, { StyleSheetManager } from 'styled-components'

import Toolbox from '../ui/Toolbox'
import Header from '../ui/Header'
import Sidebar from '../ui/Sidebar'

import BREAKPOINT from '../../utils/breakpoints'

const isLocal = window.reapit.config.appEnv === 'local'

const InjectFrameStyles = (props) => {
  const { document: frame } = useContext(FrameContext)
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('link')).filter(({ rel }) => rel === 'stylesheet')
    const styles = Array.from(document.querySelectorAll('style'))
    const stylesheets = [...links, ...styles]

    stylesheets.forEach((style) => {
      frame.head.appendChild(style.cloneNode(true))
    })

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            frame.head.appendChild(node.cloneNode(true))
          })
        }
      })
    })
    if (isLocal) {
      observer.observe(document.head, { childList: true, subtree: true })
    }

    return () => {
      if (!isLocal) {
        observer.disconnect()
      }
    }
  }, [frame])

  return <StyleSheetManager target={frame.head}>{props.children}</StyleSheetManager>
}

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
  margin-top: 12px;
`

const Viewport = ({ children, iframeRef }) => {
  const { connectors } = useEditor()
  const [breakpoint, setBreakpoint] = useState(BREAKPOINT.Tablet)

  return (
    <div className="viewport" style={{ flex: 1, flexDirection: 'column', justifyItems: 'stretch', height: '100vh' }}>
      <Header />
      <div className="flex overflow-hidden flex-row w-full" style={{ height: 'calc(100vh - 45px)' }}>
        <Toolbox />
        <Container>
          <Breakpoints>
            <ToggleRadio
              name="responsive preview"
              isFullWidth
              onChange={(e) => setBreakpoint(parseInt(e.currentTarget.value, 10))}
              options={[
                {
                  id: BREAKPOINT.Desktop.toString(),
                  value: BREAKPOINT.Desktop.toString(),
                  text: 'Desktop',
                  isChecked: breakpoint === BREAKPOINT.Desktop,
                },
                {
                  id: BREAKPOINT.Tablet.toString(),
                  value: BREAKPOINT.Tablet.toString(),
                  text: 'Tablet',
                  isChecked: breakpoint === BREAKPOINT.Tablet,
                },
                {
                  id: BREAKPOINT.MobileL.toString(),
                  value: BREAKPOINT.MobileL.toString(),
                  text: 'Mobile L',
                  isChecked: breakpoint === BREAKPOINT.MobileL,
                },
                {
                  id: BREAKPOINT.MobileS.toString(),
                  value: BREAKPOINT.MobileS.toString(),
                  text: 'Mobile S',
                  isChecked: breakpoint === BREAKPOINT.MobileS,
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
            <div id="page-container" className="page-container flex flex-1 h-full flex-col">
              <div
                className="craftjs-renderer flex-1 h-full w-full transition pb-8 overflow-auto"
                ref={(ref) =>
                  ref &&
                  // @ts-ignore
                  connectors.select(connectors.hover(ref, null), null)
                }
              >
                <div className="relative flex-row flex items-stretch pt-8 m-auto">
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
