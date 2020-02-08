import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'

<% if (redux) { %>
import store from './store'
  import { Provider } from 'react-redux'
<% } %>

<% if (graphql) { %>
import { ApolloProvider } from '@apollo/react-hooks'
<% } %>

<% if (!styledComponents) { %>
import '@/styles/index.scss'
<% } else { %>
import { createGlobalStyle } from 'styled-components'
  import globalCss from 'raw-loader!@reapit/elements/dist/index.css'
  const GlobalStyle = createGlobalStyle`
  ${globalCss};
  body {
    background-color: unset;
  }
`
    <% } %>

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <>
    <% if (graphql) { %>
      <ApolloProvider client={client}>
        <% } %>

      <% if (redux) { %>
          <Provider store={store.reduxStore}>
            <% } %>

      <% if (styledComponents) { %>
              <GlobalStyle />
              <% } %>

      <Router />

            <% if (redux) { %>
    </Provider>
          <% } %>

    <% if (graphql) { %>
      </ApolloProvider>
      <% } %>
  </>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
