import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Loader, LoaderProps } from './loader'
import Button from '../button'

const Template: Story<LoaderProps> = args => <Loader {...args} />
const EmbeddedTemplate: Story<LoaderProps> = args => {
  const [isLoading, setIsLoading] = React.useState(true)
  return (
    <div>
      <Loader {...args} isLoading={isLoading}>
        <div
          style={{
            padding: 10,
            border: '1px solid grey',
            borderRadius: 5,
          }}
        >
          <h3>Your content</h3>
          <hr />
          <p>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in
            some form, by injected humour, or randomised words which dont look even slightly believable. If you are
            going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
            necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin
            words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
            The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic
            words etc
          </p>
        </div>
      </Loader>
      <Button style={{ marginTop: 10 }} onClick={() => setIsLoading(!isLoading)}>
        Toggle Loading
      </Button>
    </div>
  )
}

export const Basic = Template.bind({})
Basic.args = {
  isLoading: true,
}
Basic.argTypes = {
  indicator: {
    control: 'code',
  },
}

export const EmbeddedMode = EmbeddedTemplate.bind({})
EmbeddedMode.args = {
  ...Basic.args,
}
EmbeddedMode.argTypes = {
  ...Basic.argTypes,
}

export const CustomIndicator = EmbeddedTemplate.bind({})
CustomIndicator.args = {
  ...Basic.args,
  indicator: <strong style={{ color: 'red' }}>Your Custom Loading Indicator</strong>,
}
CustomIndicator.argTypes = {
  ...Basic.argTypes,
}

export default {
  title: 'Loader',
  component: Loader,
} as Meta
