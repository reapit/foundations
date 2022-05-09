import { useEditor } from '@craftjs/core'
import { cx } from '@linaria/core'
import { Button, ButtonGroup, elFlex1, elMbAuto, elMtAuto, elPr1, FlexContainer, ToggleRadio } from '@reapit/elements'
import React from 'react'
import ReactTooltip from 'react-tooltip'

import Checkmark from '../../icons/check'
import Customize from '../../icons/customize'
import { buttonIcon, header } from './styles'

import { PageSelector } from './PageSelector'
import { usePageId } from '@/components/hooks/use-page-id'
import { DESKTOP_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../viewport/__styles__/media'
import { styled } from '@linaria/react'
import { useApp } from '@/components/hooks/apps/use-app'

const Breakpoints = styled.div`
  height: 35px;
  display: flex;
  justify-content: center;
  margin-top: 8px;
`

const AppName = () => {
  const { appId } = usePageId()
  const { app } = useApp(appId)

  if (!app) {
    return null
  }

  return (
    <h1>
      {app.developerName} / {app.name}
    </h1>
  )
}

const Header = ({ setBreakpoint, breakpoint }) => {
  const { pageId, setPageId } = usePageId()
  const { enabled, actions } = useEditor((state) => ({
    enabled: state.options.enabled,
  }))

  return (
    <FlexContainer className={header} isFlexJustifyCenter>
      <FlexContainer isFlexAlignCenter isFlexJustifyEnd className={cx(elFlex1, elMtAuto, elMbAuto, elPr1)}>
        {enabled && <AppName />}
        {enabled && <PageSelector pageId={pageId} onChange={setPageId} />}
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
        <ButtonGroup>
          <Button
            size={2}
            style={{ zoom: 0.8 }}
            intent="success"
            className={cx('transition cursor-pointer', enabled ? 'bg-green-400' : 'bg-primary')}
            onClick={() => {
              actions.setOptions((options) => (options.enabled = !enabled))
            }}
          >
            <div className={buttonIcon}>{enabled ? <Checkmark /> : <Customize />}</div>
            {enabled ? 'Preview' : 'Edit'}
          </Button>
        </ButtonGroup>
      </FlexContainer>
      <ReactTooltip place="bottom" effect="solid" />
    </FlexContainer>
  )
}

export default Header
