import React from 'react'
import { storiesOf } from '@storybook/react'
import { UploadProgress } from './index'

const Demo = () => {
  const [visible, setVisible] = React.useState(false)
  const [percentage, setPercentage] = React.useState(0)

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 500)

    const timer = setInterval(() => {
      setPercentage(current => {
        return current >= 100 ? 0 : current + Math.random() * 10
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <UploadProgress
      percentage={percentage}
      totalCount={10}
      completedCount={Math.floor(percentage / 10)}
      visible={visible}
    />
  )
}

storiesOf('UploadProgress', module).add('Default', () => <Demo />)
