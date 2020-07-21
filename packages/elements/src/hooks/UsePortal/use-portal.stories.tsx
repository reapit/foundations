import React, { useState, useEffect } from 'react'

import { storiesOf } from '@storybook/react'
import { Button } from '../../components/Button'
import { usePortal, PortalProvider } from '.'
import { Section } from '@/components/Layout'

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
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <UsePortalComponent></UsePortalComponent>
      </Section>
    </PortalProvider>
  )
}

storiesOf('UsePortal', module).add('Usage', () => <BasicUsage />)
