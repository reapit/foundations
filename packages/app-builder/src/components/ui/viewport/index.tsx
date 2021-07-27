import React, { useState } from 'react'
import { useEditor } from '@craftjs/core'
import {
  elFlex,
  elFlex1,
  elFlexColumn,
  elFlexRow,
  elHFull,
  elMAuto,
  elPb4,
  elPt4,
  elWFull,
  ToggleRadio,
} from '@reapit/elements'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import IFrame from 'react-frame-component'

import Toolbox from '../toolbox'
import Header from '../header'
import Sidebar from '../sidebar'

import { BREAKPOINT } from '../../../utils/breakpoints'
import {
  flexAlignStretch,
  hScreen,
  justifyStretch,
  overflowAuto,
  overflowHidden,
  relative,
  transition,
} from '../styles'
import { InjectFrameStyles } from './InjectFrameStyles'

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

const Viewport = ({ children, iframeRef }) => {
  const { connectors } = useEditor()
  const [breakpoint, setBreakpoint] = useState(BREAKPOINT.Tablet)

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
            <div id="page-container" className={cx(elFlex, elFlex1, elHFull, elFlexColumn, elPt4)}>
              <div
                id="craftjs-renderer"
                className={cx(elFlex1, elHFull, elWFull, transition, elPb4, overflowAuto)}
                ref={(ref) => ref && connectors.select(connectors.hover(ref, ''), '')}
              >
                <div className={cx(elFlex, elFlexRow, flexAlignStretch, relative, elPt4, elMAuto)}>
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
