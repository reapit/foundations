import React from 'react'

import { storiesOf } from '@storybook/react'
import { RadioSelect } from '.'

storiesOf('RadioSelect', module).add('RadioSelect', () => {
  const mockProps = {
    name: 'mockName',
    labelText: 'mockLabelText',
    id: 'mockId',
    dataTest: 'mockDatatest',
    options: [{ label: 'label', value: 'value' }, { label: 'label1', value: 'value1' }]
  }
  return <RadioSelect {...mockProps} />
})
