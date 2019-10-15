import React from 'react'
import { storiesOf } from '@storybook/react'
import { Editor } from './index'

const handleChange = (html: string) => {
  console.log(html)
}

storiesOf('Editor', module).add('default', () => (
  <div style={{ padding: 20 }}>
    <Editor placeholder="Some text here" onChange={handleChange} />
  </div>
))
