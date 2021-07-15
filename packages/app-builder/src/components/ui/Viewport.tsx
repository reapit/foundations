import React, { useContext } from 'react'
import { useEditor } from '@craftjs/core'
import IFrame, { FrameContext } from 'react-frame-component'
import styled, { StyleSheetManager } from 'styled-components'
import Toolbox from '../ui/Toolbox'
import Header from '../ui/Header'
import Sidebar from '../ui/Sidebar'

import BREAKPOINT from '../../utils/breakpoints'

const InjectFrameStyles = (props) => {
  const { document } = useContext(FrameContext)
  return <StyleSheetManager target={document.head}>{props.children}</StyleSheetManager>
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
  height: 75px;
  display: flex;
  justify-content: center;
`

const Breakpoint = styled.button`
  margin-left: 25px;
  margin-right: 25px;
`

const Viewport = ({ children, iframeRef }) => {
  const { connectors } = useEditor()
  const [breakpoint, setBreakpoint] = React.useState(BREAKPOINT.Desktop)

  return (
    <div className="viewport" style={{ flex: 1, flexDirection: 'column', justifyItems: 'stretch', height: '100vh' }}>
      <Header />
      <div className="flex overflow-hidden flex-row w-full" style={{ height: 'calc(100vh - 45px)' }}>
        <Toolbox />
        <Container>
          <Breakpoints>
            <Breakpoint onClick={() => setBreakpoint(BREAKPOINT.Desktop)}>Desktop</Breakpoint>
            <Breakpoint onClick={() => setBreakpoint(BREAKPOINT.Tablet)}>Tablet</Breakpoint>
            <Breakpoint onClick={() => setBreakpoint(BREAKPOINT.MobileL)}>Mobile L</Breakpoint>
            <Breakpoint onClick={() => setBreakpoint(BREAKPOINT.MobileS)}>Mobile S</Breakpoint>
          </Breakpoints>
          <IFrame
            style={{ transition: 'width 350ms', width: breakpoint, flex: 1 }}
            ref={iframeRef}
            head={
              <>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet" />
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
