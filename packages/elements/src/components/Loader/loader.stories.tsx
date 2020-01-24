import React from 'react'

import { storiesOf } from '@storybook/react'
import { Loader } from '.'

storiesOf('Loader', module).add('Loader', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Loader body={false} />
    </div>
  </section>
))

storiesOf('Loader', module).add('LoaderBody', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Loader />
    </div>
  </section>
))
