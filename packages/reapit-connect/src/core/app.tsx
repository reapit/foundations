import * as React from 'react'
import Router from './router'
import { global } from '@/styles'

const App = () => {
  return (
    <div className={global}>
      <Router />
    </div>
  )
}

export default App
