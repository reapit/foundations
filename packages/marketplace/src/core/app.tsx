import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import ToastMessage from '../components/ui/toast-message'
import { PortalProvider, useOfflinePLugin, ToastMessage as ReapitElementsToastMessage } from '@reapit/elements'

const bindedWindowLocation = location.reload.bind(window.location)

const App = () => {
  const { isNewVersionAvailable } = useOfflinePLugin()

  return (
    <Provider store={store.reduxStore}>
      <PortalProvider>
        <Router />
      </PortalProvider>
      <Toast />
      <ToastMessage />
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
