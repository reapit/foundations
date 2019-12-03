import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Input } from '.'
import { Form, Formik } from 'formik'
import { FaSearch } from 'react-icons/fa'

storiesOf('Input', module).add('InputVariants', () => (
  <section className="section">
    <Formik
      initialValues={{ text: '', email: '', password: '', tel: '' }}
      onSubmit={values => {
        action('Form Values' + values)
      }}
    >
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <Input id="text" type="text" placeholder="Some text here" name="text" labelText="Text" />
            <Input id="email" type="email" placeholder="bob@acme.com" name="email" labelText="Email" />
            <Input id="password" type="password" placeholder="********" name="password" labelText="Password" />
            <Input id="tel" type="tel" placeholder="0800 800 800" name="tel" labelText="Telephone" />
            <Input id="search" type="text" rightIcon={<FaSearch />} placeholder="Search..." name="search" />
          </div>
        </Form>
      )}
    </Formik>
  </section>
))
