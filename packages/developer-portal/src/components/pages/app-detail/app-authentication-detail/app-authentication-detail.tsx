import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Loader, Content, H5 } from '@reapit/elements'
import { FaCopy } from 'react-icons/fa'
import CopyToClipboard from 'react-copy-to-clipboard'
import { selectAppAuthenticationLoading, selectAppAuthenticationCode } from '@/selector/app-authentication'
import { fetchtAppAuthentication } from '@/actions/apps'
import { authenticationCodeWrap, btnCopy, tooltiptext } from './__styles__/app-authentication-detail'

export type AppAuthenticationDetailProps = {
  appId: string
  withCustomHeader?: boolean
}

export const handleCopyCode = (setTooltipMessage: React.Dispatch<React.SetStateAction<string>>) => {
  return () => {
    setTooltipMessage('Copied')
  }
}

export const handleShowAuthCode = (
  appId: string,
  dispatch: Dispatch,
  setIsShowedSecret: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (e) => {
    e.preventDefault()
    dispatch(fetchtAppAuthentication(appId))
    setIsShowedSecret(true)
  }
}

export const handleMouseLeave = (setTooltipMessage: React.Dispatch<React.SetStateAction<string>>) => {
  return () => {
    setTooltipMessage('Copy')
  }
}

export const AppAuthenticationDetail: React.FunctionComponent<AppAuthenticationDetailProps> = ({
  appId,
  withCustomHeader,
}) => {
  const dispatch = useDispatch()
  const [tooltipMessage, setTooltipMessage] = React.useState('Copy')
  const [isShowedSecret, setIsShowedSecret] = React.useState(false)
  const loading = useSelector(selectAppAuthenticationLoading)
  const code = useSelector(selectAppAuthenticationCode)

  return (
    <>
      <Content data-test="app-authentication-detail">
        {!withCustomHeader && <H5>Authentication:</H5>}
        <a href="#" onClick={handleShowAuthCode(appId, dispatch, setIsShowedSecret)} className="text-underline">
          Show Secret
        </a>
      </Content>
      {loading && <Loader body={false} />}
      {isShowedSecret && !loading && code && (
        <div className={authenticationCodeWrap}>
          <p className="authentication-code">{code}</p>
          <CopyToClipboard text={code} onCopy={handleCopyCode(setTooltipMessage)}>
            <div onMouseLeave={handleMouseLeave(setTooltipMessage)} role="button" className={btnCopy}>
              <FaCopy size={24} />
              <span className={tooltiptext}>{tooltipMessage}</span>
            </div>
          </CopyToClipboard>
        </div>
      )}
    </>
  )
}

export default AppAuthenticationDetail
