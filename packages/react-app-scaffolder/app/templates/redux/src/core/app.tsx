import * as React from 'react'
import Router from './router'

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
      <Router />
    </Provider>
  )
}

export default App
