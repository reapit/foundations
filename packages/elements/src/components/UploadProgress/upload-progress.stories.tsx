import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { UploadProgress, UploadProgressProps } from './index'

export default {
  title: 'Rereshed-Docs/UploadProgress',
  component: UploadProgress,
}

export const Default: Story<UploadProgressProps> = args => <UploadProgress {...args} />
Default.args = {
  percentage: 52,
  totalCount: 50,
  completedCount: 26,
  visible: true,
}

export const Animated: Story = () => {
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
Animated.args = {}
