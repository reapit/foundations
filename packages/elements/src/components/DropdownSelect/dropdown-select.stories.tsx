import React from 'react'
import { Form, Formik } from 'formik'

import { storiesOf } from '@storybook/react'
import { DropdownSelect } from '.'
import { action } from '@storybook/addon-actions'
import { options } from './__stubs__/options'
import { Button } from '../Button'

storiesOf('DropdownSelect', module)
  .add('Mode tags', () => {
    return (
      <section className="section">
        <Formik
          initialValues={{ desktopTypes: [] }}
          onSubmit={values => {
            action('Form Values')(values)
          }}
        >
          <Form>
            <div>In this mode, you can create your own tags by typing in the tag name</div>
            <DropdownSelect
              mode="tags"
              id="desktopTypes"
              placeholder="Please select"
              name="desktopTypes"
              labelText="Dropdown Select"
              options={options}
            />
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Formik>
      </section>
    )
  })
  .add('Mode multiple', () => {
    return (
      <section className="section">
        <Formik
          initialValues={{ desktopTypes: [] }}
          onSubmit={values => {
            action('Form Values')(values)
          }}
        >
          <Form>
            <div>
              In this mode, you can only select tags that exist in <code>options</code> props
            </div>
            <DropdownSelect
              mode="multiple"
              id="desktopTypes"
              placeholder="Please select"
              name="desktopTypes"
              labelText="Dropdown Select"
              options={options}
            />
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Formik>
      </section>
    )
  })
