import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Loader, LoaderProps } from '.'
import { Section } from '@/components/Layout'

export default {
  title: 'Rereshed-Docs/Loader',
  component: Loader,
  decorators: [
    (Story: Story) => (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <div className="column is-half-desktop">
          <Story />
        </div>
      </Section>
    ),
  ],
}

export const Default: Story<LoaderProps> = (args) => <Loader {...args} />
Default.args = {}

export const BodyIsFalse: Story<LoaderProps> = (args) => <Loader {...args} />
BodyIsFalse.args = {
  body: false,
}
