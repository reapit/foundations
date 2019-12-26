import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'
import { ApolloProvider } from '@apollo/react-hooks'
import client from '../graphql/client'
import '@/styles/index.scss'

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
)

if (rootElement) {
  render(<App />, document.querySelector('#root') as Element)
}

export default App
