import React from 'react'

import { storiesOf } from '@storybook/react'
import { Loader } from '.'
import { Section } from '@/components/Layout'

storiesOf('Loader', module).add('Loader', () => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <div className="column is-half-desktop">
      <Loader body={false} />
    </div>
  </Section>
))

storiesOf('Loader', module).add('LoaderBody', () => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <div className="column is-half-desktop">
      <Loader />
    </div>
  </Section>
))
