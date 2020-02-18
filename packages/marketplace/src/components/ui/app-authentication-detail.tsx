import * as React from 'react'
import { ReduxState } from '@/types/core'
import { connect } from 'react-redux'
import { requestAuthenticationCode } from '@/actions/app-detail'
import { errorThrownComponent } from '@/actions/error'
import appDetailStyles from '@/styles/blocks/app-detail.scss?mod'
import styles from '@/styles/blocks/app-authentication-detail.scss?mod'
import { Loader } from '@reapit/elements'
import { FaCopy } from 'react-icons/fa'
import { clipboardCopy } from '@/utils/clipboard-copy'

export type AppAuthenticationDetailInnerProps = {
  appId: string
}

export interface AppAuthenticationDetailMappedProps {
  loading: boolean
  code: string
}

export interface AppAuthenticationDetailMappedActions {
  requestAuthenticationCode: (appId: string) => void
  showError: (message: string) => void
}

export type AppAuthenticationDetailProps = AppAuthenticationDetailInnerProps &
  AppAuthenticationDetailMappedProps &
  AppAuthenticationDetailMappedActions

export const handleCopyCode = (code, setTooltipMessage, showError) => {
  if (code) {
    clipboardCopy(code)
      .then(() => {
        setTooltipMessage('Copied')
      })
      .catch(() => {
        showError('Cannot copy text')
      })
  }
}

export const AppAuthenticationDetail: React.FunctionComponent<AppAuthenticationDetailProps> = ({
  appId,
  requestAuthenticationCode,
  showError,
  loading,
  code,
}) => {
  const [tooltipMessage, setTooltipMessage] = React.useState('Copy')

  const handleShowAuthCode = event => {
    event.preventDefault()
    requestAuthenticationCode(appId)
  }

  const handleCopy = () => {
    handleCopyCode(code, setTooltipMessage, showError)
  }

  const handleMouseLeave = () => {
    setTooltipMessage('Copy')
  }

  return (
    <>
      <div className={appDetailStyles.appInfoRow}>
        <p className={appDetailStyles.appInfoProperty}>Authentication:</p>
        <a href="#" onClick={handleShowAuthCode} className={styles.btnShowAuthentication}>
          Show Secret
        </a>
      </div>
      {loading && <Loader body={false} />}
      {!loading && code && (
        <div className={styles.authenticationCodeWrap}>
          <p>{code}</p>
          <div onMouseLeave={handleMouseLeave} role="button" onClick={handleCopy} className={styles.btnCopy}>
            <FaCopy size={24} />
            <span className={styles.tooltiptext}>{tooltipMessage}</span>
          </div>
        </div>
      )}
    </>
  )
}

export const mapStateToProps = (state: ReduxState): AppAuthenticationDetailMappedProps => {
  return {
    loading: state.appDetail.authentication.loading,
    code: state.appDetail.authentication.code,
  }
}

export const mapDispatchToProps = (dispatch: any): AppAuthenticationDetailMappedActions => ({
  requestAuthenticationCode: appId => dispatch(requestAuthenticationCode(appId)),
  showError: message =>
    dispatch(
      errorThrownComponent({
        type: 'COMPONENT',
        message,
      }),
    ),
})

const AppAuthenticationDetailConnect = connect(mapStateToProps, mapDispatchToProps)(AppAuthenticationDetail)

AppAuthenticationDetailConnect.displayName = 'AppAuthenticationDetailConnect'

export default AppAuthenticationDetailConnect
