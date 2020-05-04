import '../styles/index.scss'
import React from 'react'
import { Provider } from 'react-redux'
import Router from './router'
import { PortalProvider, useOfflinePLugin } from '@reapit/elements'
import store from './store'
import { ToastMessage as ReapitElementsToastMessage } from '@reapit/elements'

const bindedWindowLocation = location.reload.bind(window.location)

const App = () => {
  const { isNewVersionAvailable } = useOfflinePLugin()

  return (
    <Provider store={store.reduxStore}>
      <PortalProvider>
        <Router />
      </PortalProvider>
      <ReapitElementsToastMessage
        preventClose={true}
        visible={isNewVersionAvailable}
        variant="primary"
        onCloseToast={bindedWindowLocation}
        /* eslint-disable-next-line max-len */
        message="A new version is available. Please refresh your browser or click on this notification to receive the latest update."
      />
    </Provider>
  )
}

export default App
