import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { requestAuthenticationCode } from '@/actions/app-detail'
import styles from '@/styles/blocks/app-authentication-detail.scss?mod'
import { Loader, Content, H5 } from '@reapit/elements'
import { FaCopy } from 'react-icons/fa'
import CopyToClipboard from 'react-copy-to-clipboard'
import { selectAppAuthenticationCode, selectAppAuthenticationLoading } from '@/selector/app-detail'

export type AppAuthenticationDetailProps = {
  appId: string
  withCustomHeader?: boolean
}

export const handleCopyCode = (setTooltipMessage: React.Dispatch<React.SetStateAction<string>>) => {
  return () => {
    setTooltipMessage('Copied')
  }
}

export const handleShowAuthCode = (appId: string, dispatch: Dispatch) => {
  return e => {
    e.preventDefault()
    dispatch(requestAuthenticationCode(appId))
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
  const loading = useSelector(selectAppAuthenticationLoading)
  const code = useSelector(selectAppAuthenticationCode)

  return (
    <>
      <Content data-test="app-authentication-detail">
        {!withCustomHeader && <H5>Authentication:</H5>}
        <a href="#" onClick={handleShowAuthCode(appId, dispatch)} className={styles.btnShowAuthentication}>
          Show Secret
        </a>
      </Content>
      {loading && <Loader body={false} />}
      {!loading && code && (
        <div className={styles.authenticationCodeWrap}>
          <p className={styles.authenticationCode}>{code}</p>
          <CopyToClipboard text={code} onCopy={handleCopyCode(setTooltipMessage)}>
            <div onMouseLeave={handleMouseLeave(setTooltipMessage)} role="button" className={styles.btnCopy}>
              <FaCopy size={24} />
              <span className={styles.tooltiptext}>{tooltipMessage}</span>
            </div>
          </CopyToClipboard>
        </div>
      )}
    </>
  )
}

export default AppAuthenticationDetail
