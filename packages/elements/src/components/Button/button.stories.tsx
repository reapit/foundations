import React from 'react'

import { storiesOf } from '@storybook/react'
import { Button } from '.'
import { action } from '@storybook/addon-actions'
import { ButtonGroup } from './index'

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

storiesOf('Button', module).add('Info', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Button
        type="submit"
        variant="info"
        onClick={action('Clicking Secondary')}
        disabled={false}
        loading={false}
        fullWidth={false}
      >
        Info
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

storiesOf('Button', module).add('IsCentered', () => (
  <section className="section">
    <div className="column is-half-desktop">
      <Button
        className="is-centered"
        type="submit"
        variant="primary"
        onClick={action('Clicking Loading')}
        disabled={false}
        loading={false}
        fullWidth={false}
      >
        Centered
      </Button>
    </div>
  </section>
))

storiesOf('Button', module).add('ButtonGroup', () => {
  const [isActive, setIsActive] = React.useState(0)
  return (
    <section className="section">
      <div className="column is-half-desktop">
        <ButtonGroup>
          <Button
            type="button"
            className={`${isActive === 0 ? 'is-info' : ''}`}
            variant="secondary"
            onClick={() => setIsActive(0)}
            disabled={false}
            loading={false}
            fullWidth={false}
          >
            Left
          </Button>
          <Button
            type="button"
            className={`${isActive === 1 ? 'is-info' : ''}`}
            variant="secondary"
            onClick={() => setIsActive(1)}
            disabled={false}
            loading={false}
            fullWidth={false}
          >
            Center
          </Button>
          <Button
            type="button"
            className={`${isActive === 2 ? 'is-info' : ''}`}
            variant="secondary"
            onClick={() => setIsActive(2)}
            disabled={false}
            loading={false}
            fullWidth={false}
          >
            Right
          </Button>
        </ButtonGroup>
      </div>
    </section>
  )
})
