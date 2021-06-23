import React, { useState, useEffect } from 'react'
import { Story } from '@storybook/react/types-6-0'
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

export default {
  title: 'Utils/UsePortal',
  component: <div />,
}

export const Usage: Story = () => {
  return (
    <PortalProvider>
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <UsePortalComponent></UsePortalComponent>
      </Section>
    </PortalProvider>
  )
}
