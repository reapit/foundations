import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Input } from '../../components/Input'
import { Form, Formik } from 'formik'
import { Button } from '@/components/Button'
import { Section } from '@/components/Layout'
import { isBase64 } from '.'

const validate = values => {
  const { pattern } = values
  const errors = { pattern: '' }
  if (!isBase64(pattern)) {
    errors.pattern = 'Pattern does not match base64'
  }
  return errors
}

storiesOf('IsBase64', module).add('Primary', () => {
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        initialValues={{ pattern: '' }}
        validate={validate}
        onSubmit={values => {
          action('Form Values' + values)
        }}
        render={() => (
          <Form>
            <div className="column is-half-desktop">
              <Input type="text" id="pattern" name="pattern" labelText="Input pattern" />
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        )}
      />
    </Section>
  )
})
