import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Editor, EditorProps } from './index'

const handleChange = (html: string) => {
  action(html)
}

// TODO: this componnet is just a loose wrapper around something called pell - again,
// this is react specific. How should we portray the CSS styles
export default {
  title: 'Components/Editor',
  component: Editor,
}

export const Default: Story<EditorProps> = (args) => <Editor {...args} />
Default.args = {
  placeholder: 'Some text here',
  onChange: handleChange,
}
