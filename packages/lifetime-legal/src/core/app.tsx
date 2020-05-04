import { PortalProvider, useOfflinePLugin, ToastMessage } from '@reapit/elements'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import * as React from 'react'

const bindedWindowLocation = location.reload.bind(window.location)

const App = () => {
  const { isNewVersionAvailable } = useOfflinePLugin()

  return (
    <Provider store={store.reduxStore}>
      <PortalProvider>
        <Router />
        <ToastMessage
          preventClose={true}
          visible={isNewVersionAvailable}
          variant="primary"
          onCloseToast={bindedWindowLocation}
          /* eslint-disable-next-line max-len */
          message="A new version is available. Please refresh your browser or click on this notification to receive the latest update."
        />
      </PortalProvider>
    </Provider>
  )
}

export default App
