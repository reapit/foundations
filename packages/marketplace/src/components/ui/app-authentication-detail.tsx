import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { requestAuthenticationCode } from '@/actions/app-detail'
import { errorThrownComponent } from '@/actions/error'
import styles from '@/styles/blocks/app-authentication-detail.scss?mod'
import { Loader, Content, H5 } from '@reapit/elements'
import { FaCopy } from 'react-icons/fa'
import { clipboardCopy } from '@/utils/clipboard-copy'
import { selectAppAuthenticationCode, selectAppAuthenticationLoading } from '@/selector/app-detail'

export type AppAuthenticationDetailProps = {
  appId: string
  withCustomHeader?: boolean
}

export const handleCopyCode = (code, setTooltipMessage, dispatch) => {
  return async () => {
    if (!code) {
      return
    }
    try {
      await clipboardCopy(code)
      setTooltipMessage('Copied')
    } catch (error) {
      dispatch(
        errorThrownComponent({
          type: 'COMPONENT',
          message: 'Cannot copy text',
        }),
      )
    }
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
          <div
            onMouseLeave={handleMouseLeave(setTooltipMessage)}
            role="button"
            onClick={handleCopyCode(code, setTooltipMessage, dispatch)}
            className={styles.btnCopy}
          >
            <FaCopy size={24} />
            <span className={styles.tooltiptext}>{tooltipMessage}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default AppAuthenticationDetail
