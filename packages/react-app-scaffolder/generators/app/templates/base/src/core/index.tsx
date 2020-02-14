import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'
<<<<<<< HEAD
=======
import { Provider } from 'react-redux'
>>>>>>> update

<% if (redux) { %>
import store from './store'
  import { Provider } from 'react-redux'
<% } %>

<% if (noRedux) { %>
  import { AuthProvider } from '@/context/authContext'
<% } %>

<% if (graphql) { %>
import { ApolloProvider } from '@apollo/react-hooks'
<% } %>

<% if (stylesSolution == 'sass') { %>
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

    <% if (noRedux) { %>
      <AuthProvider>
    <% } %>

      <Router />

    <% if (noRedux) { %>
      </AuthProvider>
    <% } %>

    <% if (redux) { %>
      </Provider>
    <% } %>

    <% if (graphql) { %>
      </ApolloProvider>
    <% } %>

    <% if (stylesSolution === 'styledComponents') { %>
      <GlobalStyle />
    <% } %>
  </>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
