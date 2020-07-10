import * as React from 'react'
import Router from './router'
import ErrorBoundary from '@/components/hocs/error-boundary'

import store from './store'
import { Provider } from 'react-redux'

<% if(sass){ %>
import '@/styles/index.scss'
<% } else { %>
import '@/styles/index.css'
 <% } %>

const App = () => {
  return (
    <Provider store={store.reduxStore}>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </Provider>
  )
}

export default App
