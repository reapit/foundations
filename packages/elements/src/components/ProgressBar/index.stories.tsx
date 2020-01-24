import React from 'react'

import { storiesOf } from '@storybook/react'
import { ProgressBar } from '.'

storiesOf('ProgressBar', module)
  .add('0%', () => {
    return <ProgressBar percentage={0} />
  })
  .add('50%', () => {
    return <ProgressBar percentage={50} />
  })
  .add('70%', () => {
    return <ProgressBar percentage={70} />
  })
  .add('100%', () => {
    return <ProgressBar percentage={100} />
  })
