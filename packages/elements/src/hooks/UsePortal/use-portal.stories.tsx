import React, { useState, useEffect } from 'react'

import { storiesOf } from '@storybook/react'
import { Button } from '../../components/Button'
import { usePortal, PortalProvider } from '.'

const UsePortalComponent = () => {
  const [count, setCount] = useState(0)
  const [showPortal] = usePortal(
    () => (
      <div className="section">
        <b>Outside app root</b>: {count}
      </div>
    ),
    [count],
  )
  useEffect(() => {
    showPortal()
  }, [])

  return (
    <Button type="button" variant="secondary" onClick={() => setCount(count + 1)}>
      Increase {count}
    </Button>
  )
}

const BasicUsage = () => {
  return (
    <PortalProvider>
      <section className="section">
        <UsePortalComponent></UsePortalComponent>
      </section>
    </PortalProvider>
  )
}

storiesOf('UsePortal', module).add('Usage', () => <BasicUsage />)
