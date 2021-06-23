import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Input } from '../../components/Input'
import { Form, Formik } from 'formik'
import { Button } from '@/components/Button'
import { isBase64 } from '.'

export default {
  title: 'Utils/IsBase64',
  component: <div />,
}

export const Usage: Story = () => {
  return (
    <div>
      <Formik
        initialValues={{ pattern: '' }}
        validate={(values) => {
          const { pattern } = values
          const errors = { pattern: '' }
          if (!isBase64(pattern)) {
            errors.pattern = 'Pattern does not match base64'
          }
          return errors
        }}
        onSubmit={(values) => {
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
    </div>
  )
}
