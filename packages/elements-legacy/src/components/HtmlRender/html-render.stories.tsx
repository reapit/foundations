import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { HTMLRender, HTMLRenderProps } from '.'

const html = `
    <h1>heading h1</h1>
    <h2>heading h2</h2>
    <b>Bold with entities&nbsp;</b>
    <div>
        <b>bold</b>
    </div>
    <div><i>italic</i></div>
    <div><u>underline</u></div>
    <pre>pre tag</pre>
    <strike>strike</strike>
    <p><a href="https://google.com">Link</a></p>
    <div>
        <ul>
            <li>bullet points</li>
            <li>bullet points</li>
        </ul>
    </div>
`

export default {
  title: 'Components/HTMLRender',
  component: HTMLRender,
}

export const Usage: Story<HTMLRenderProps> = (args) => <HTMLRender {...args} />
Usage.args = {
  html,
}
