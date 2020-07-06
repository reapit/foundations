
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
OfflinePluginRuntime.install()

import * as React from 'react'
import Router from './router'

import store from './store'
import { Provider } from 'react-redux'




import '@/styles/index.scss'
  



const App = () => {
  
  
  return (
    
    
    
      <Provider store={store.reduxStore}>
    
      <Router />
    
    
      </Provider>
    
    
    
  )
}

export default App
