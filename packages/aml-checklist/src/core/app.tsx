import { PortalProvider } from '@reapit/elements'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import * as React from 'react'
import { ToastMessage, useOfflinePLugin } from '@reapit/elements'

const App = () => {
  const { isNewVersionAvailable } = useOfflinePLugin()

  return (
    <Provider store={store.reduxStore}>
      <PortalProvider>
        <Router />
      </PortalProvider>
      <ToastMessage
        preventClose={true}
        visible={isNewVersionAvailable}
        variant="primary"
        onCloseToast={location.reload}
        /* eslint-disable-next-line max-len */
        message="A new version is available. Please refresh your browser or click on this notification to receive the latest update."
      />
    </Provider>
  )
}

export default App
