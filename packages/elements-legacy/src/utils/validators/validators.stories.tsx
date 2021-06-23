import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Form, Formik } from 'formik'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { H3 } from '@/components/Typography'
import {
  validateMaxCharacterLength,
  validateMinCharacterLength,
  validateRequire,
  validateURI,
  validateEmail,
  validatePassword,
} from './index'

export default {
  title: 'Utils/Validators',
  component: <div />,
}

export const Usage: Story = () => (
  <div>
    <Formik
      initialValues={{ name: '', email: '', uri: '' }}
      validate={(values) => {
        let errors = {}

        errors = validateRequire({ values, currentErrors: errors, keys: ['name'] })
        errors = validateMinCharacterLength({ values, currentErrors: errors, keys: ['name'], length: 3 })
        errors = validateMaxCharacterLength({ values, currentErrors: errors, keys: ['name'], length: 10 })
        errors = validateEmail({ values, currentErrors: errors, keys: ['email'] })
        errors = validateURI({ values, currentErrors: errors, keys: ['uri'] })
        errors = validatePassword({ values, currentErrors: errors, keys: ['password'] })

        return errors
      }}
      onSubmit={(values) => {
        action('Form Values' + values)
      }}
      render={() => {
        return (
          <Form>
            <div className="column is-half-desktop">
              <H3>Validate required, min length 3 and max length 10</H3>
              <Input type="text" name="name" id="name" labelText="Name" />
              <H3>Validate email</H3>
              <Input type="email" name="email" id="email" labelText="Email" />
              <H3>Validate URI</H3>
              <Input type="text" name="uri" id="uri" labelText="Uri" />
              <H3>Validate Password</H3>
              <Input type="password" name="password" id="password" labelText="Password" />
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        )
      }}
    />
  </div>
)
