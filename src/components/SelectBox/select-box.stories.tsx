import React from 'react'
import { Form, Formik } from 'formik'

import { storiesOf } from '@storybook/react'
import { SelectBox, SelectBoxOptions } from '.'
import { action } from '@storybook/addon-actions'

storiesOf('SelectBox', module)
  .add('Primary', () => {
    const mockedOptions: SelectBoxOptions[] = [{ label: 'option1', value: 'a' }, { label: 'option2', value: 'b' }]

    return (
      <section className="section">
        <Formik
          initialValues={{ demo: new Date().toString() }}
          onSubmit={values => {
            action('Form Values' + values)
          }}
        >
          {() => (
            <Form>
              <div className="column is-half-desktop">
                <SelectBox name="demo" options={mockedOptions} labelText="Demo" id="test" />
              </div>
            </Form>
          )}
        </Formik>
      </section>
    )
  })
  .add('HasError', () => {
    const Parent = () => {
      const mockedOptions: SelectBoxOptions[] = [{ label: 'option1', value: 'a' }, { label: 'option2', value: 'b' }]
      return (
        <section className="section">
          <Formik
            validate={() => {
              return {
                demo: 'error'
              }
            }}
            initialValues={{ demo: new Date().toString() }}
            onSubmit={values => {
              action('Form Values' + values)
            }}
          >
            {() => (
              <Form>
                <div className="column is-half-desktop">
                  <SelectBox name="demo" options={mockedOptions} labelText="Demo" id="test" />
                </div>
              </Form>
            )}
          </Formik>
        </section>
      )
    }

    return <Parent />
  })
