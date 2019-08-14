import React from 'react'

import { storiesOf } from '@storybook/react'
import { Button } from '.'
import { action } from '@storybook/addon-actions'

storiesOf('Button', module).add('Primary', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Button
        type="submit"
        variant="primary"
        onClick={action('Clicking Primary')}
        disabled={false}
        loading={false}
        fullWidth={false}
      >
        Primary
      </Button>
    </div>
  </section>
))

storiesOf('Button', module).add('Secondary', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Button
        type="submit"
        variant="secondary"
        onClick={action('Clicking Secondary')}
        disabled={false}
        loading={false}
        fullWidth={false}
      >
        Secondary
      </Button>
    </div>
  </section>
))

storiesOf('Button', module).add('Danger', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Button
        type="submit"
        variant="danger"
        onClick={action('Clicking Danger')}
        disabled={false}
        loading={false}
        fullWidth={false}
      >
        Danger
      </Button>
    </div>
  </section>
))

storiesOf('Button', module).add('Disabled', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Button
        type="submit"
        variant="primary"
        onClick={action('Clicking Disabled')}
        disabled
        loading={false}
        fullWidth={false}
      >
        Disabled
      </Button>
    </div>
  </section>
))

storiesOf('Button', module).add('Loading', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Button
        type="submit"
        variant="primary"
        onClick={action('Clicking Loading')}
        disabled={false}
        loading
        fullWidth={false}
      >
        Loading
      </Button>
    </div>
  </section>
))
