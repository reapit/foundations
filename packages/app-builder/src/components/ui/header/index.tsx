import { cx } from '@linaria/core'
import { elFlex1, elMbAuto, elMtAuto, FlexContainer, ToggleRadio } from '@reapit/elements'
import React from 'react'
import ReactTooltip from 'react-tooltip'

import HomeIcon from '../../icons/home'
import { header } from './styles'

import { PageSelector } from './PageSelector'
import { usePageId } from '@/components/hooks/use-page-id'
import { DESKTOP_BREAKPOINT, MOBILE_BREAKPOINT, TABLET_BREAKPOINT } from '../viewport/__styles__/media'
import { styled } from '@linaria/react'
import { useApp } from '@/components/hooks/apps/use-app'
import { Link } from 'react-router-dom'
import Play from '@/components/icons/play'
import { AppBuilderIconButton } from '../components'
import { Zoomer } from './zoomer'
import { useUpdateAppName } from '@/components/hooks/apps/use-update-app'
import { generateAppUrl } from '@/components/pages/app-select'

const Breakpoints = styled.div`
  height: 35px;
  display: flex;
  justify-content: center;
`

const AppNameContainer = styled.div`
  height: 32px;
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -1%;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding-left: 12px;

  margin-right: 21px;
  display: flex;
  align-items: center;
`

const DeveloperName = styled.span`
  color: #646464;
`

const AppNameInput = styled.input`
  border: none;
  outline: none;
  background: none;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;

  letter-spacing: -0.01em;
  margin-left: 8px;
`

const AppName = () => {
  const { appId } = usePageId()
  const { app } = useApp(appId)
  const { updateAppName } = useUpdateAppName(appId)

  return (
    <AppNameContainer>
      <DeveloperName>{app?.developerName} /</DeveloperName>{' '}
      <AppNameInput
        defaultValue={app?.name}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            e.stopPropagation()
            if (e.currentTarget.value !== app?.name) {
              updateAppName(e.currentTarget.value)
            }
          }
        }}
        onBlur={(e) => {
          if (e.currentTarget.value !== app?.name) {
            updateAppName(e.currentTarget.value)
          }
        }}
      />
    </AppNameContainer>
  )
}

const Home = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  background: #eaf5fc;
  border-radius: 4px;
  width: 32px;
  height: 32px;
`

const AppBuilderToggleRadio = styled(ToggleRadio)`
  border-radius: 4px;
  padding: 0;
  height: 100%;

  .el-toggle-radio-item {
    font-size: 14px;
    border-radius: 0;
    border: none;
    color: #646464;
    padding-top: 8px;
    padding-bottom: 6px;
  }

  svg {
    fill: #bebebe;
  }

  .el-toggle-radio:checked + label .el-toggle-radio-item {
    color: black;
    background: #eaf5fc;

    svg {
      fill: #23a4de;
    }
  }

  .el-toggle-radio-label:last-child {
    margin-right: 0;
  }
`

const DesktopIcon = () => (
  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.17043 0.0239258H18.8296C19.4641 0.0239258 19.984 0.549426 19.984 1.1921V11.1279H0.0165263V1.1921C0.0165263 0.550017 0.535869 0.0239258 1.17102 0.0239258H1.17043ZM4.49857 17.1169H6.90335L7.19147 15.1936H12.8072L13.096 17.1169H15.5008V18.0712H4.49786V17.1169H4.49857ZM19.984 12.0824V13.0714C19.984 13.7135 19.4646 14.2395 18.8295 14.2395H1.17036C0.535796 14.2395 0.0158691 13.714 0.0158691 13.0714V12.0824H19.984Z"
    />
  </svg>
)

const TabletIcon = () => (
  <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.2949 0C23.2357 0 24 0.688477 24 1.53604V15.1596C24 16.0072 23.2357 16.6956 22.2949 16.6956H1.70508C0.764248 16.6956 0 16.0072 0 15.1596V1.53604C0 0.688477 0.764248 0 1.70508 0H22.2949ZM19.3043 7.30434C18.4399 7.30434 17.7391 8.00511 17.7391 8.86955C17.7391 9.734 18.4399 10.4348 19.3043 10.4348C20.1688 10.4348 20.8695 9.734 20.8695 8.86955C20.8695 8.00511 20.1688 7.30434 19.3043 7.30434Z"
    />
  </svg>
)

const MobileIcon = () => (
  <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_204_5115)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2222 1.6356C12.2222 0.733102 11.5185 0 10.6522 0H1.57001C0.703707 0 0 0.733102 0 1.6356V18.3644C0 19.2669 0.703707 20 1.57001 20H10.6522C11.5185 20 12.2222 19.2669 12.2222 18.3644V1.6356ZM4.44444 17.2222C4.44444 16.3017 5.19064 15.5556 6.11111 15.5556C7.03159 15.5556 7.77778 16.3017 7.77778 17.2222C7.77778 18.1427 7.03159 18.8889 6.11111 18.8889C5.19064 18.8889 4.44444 18.1427 4.44444 17.2222ZM4.44444 1.11111C3.83079 1.11111 3.33333 1.60857 3.33333 2.22222C3.33333 2.83587 3.83079 3.33333 4.44444 3.33333H7.77778C8.39143 3.33333 8.88889 2.83587 8.88889 2.22222C8.88889 1.60857 8.39143 1.11111 7.77778 1.11111H4.44444Z"
      />
    </g>
    <defs>
      <clipPath id="clip0_204_5115">
        <rect width="12.2222" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

const ToggleRadioContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`

const Header = ({ setBreakpoint, breakpoint, setShowNewPage, showNewPage }) => {
  const { appId } = usePageId()
  const { app } = useApp(appId)

  return (
    <FlexContainer className={header} isFlexJustifyCenter>
      <FlexContainer
        isFlexAlignCenter
        isFlexJustifyEnd
        className={cx(elFlex1, elMtAuto, elMbAuto)}
        style={{ paddingLeft: 17, paddingRight: 17 }}
      >
        <Home to="/" style={{ marginRight: 8 }}>
          <HomeIcon />
        </Home>
        <AppName />
        <PageSelector showNewPage={showNewPage} setShowNewPage={setShowNewPage} />
        <Breakpoints>
          <AppBuilderToggleRadio
            name="responsive preview"
            isFullWidth
            onChange={(e) => setBreakpoint(parseInt(e.currentTarget.value, 10))}
            options={[
              {
                id: DESKTOP_BREAKPOINT.toString(),
                value: DESKTOP_BREAKPOINT.toString(),
                text: (
                  <ToggleRadioContainer>
                    <DesktopIcon /> Desktop
                  </ToggleRadioContainer>
                ) as unknown as string,
                isChecked: breakpoint === DESKTOP_BREAKPOINT,
              },
              {
                id: TABLET_BREAKPOINT.toString(),
                value: (TABLET_BREAKPOINT + 1).toString(),
                text: (
                  <ToggleRadioContainer>
                    <TabletIcon /> Tablet
                  </ToggleRadioContainer>
                ) as unknown as string,
                isChecked: breakpoint === TABLET_BREAKPOINT + 1,
              },
              {
                id: MOBILE_BREAKPOINT.toString(),
                value: (MOBILE_BREAKPOINT - 1).toString(),
                text: (
                  <ToggleRadioContainer>
                    <MobileIcon /> Mobile
                  </ToggleRadioContainer>
                ) as unknown as string,
                isChecked: breakpoint === MOBILE_BREAKPOINT - 1,
              },
            ]}
          />
        </Breakpoints>
        <Zoomer />
        <AppBuilderIconButton
          intent="primary"
          style={{ marginLeft: 21, marginRight: 0 }}
          onClick={(e) => {
            e.preventDefault()
            if (!app) {
              return
            }
            window.open(generateAppUrl(app.subdomain), '_blank', 'noopener,noreferrer')
          }}
        >
          <Play />
        </AppBuilderIconButton>
      </FlexContainer>
      <ReactTooltip place="bottom" effect="solid" />
    </FlexContainer>
  )
}

export default Header
