import React, { useRef, useEffect } from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { DatePicker } from '.'
import { Form, Formik } from 'formik'

storiesOf('DatePicker', module)
  .add('Primary', () => (
    <section className="section">
      <Formik
        initialValues={{ demo: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
        render={() => (
          <Form>
            <div className="column is-half-desktop">
              <DatePicker name="demo" labelText="demo" id="demo" />
            </div>
          </Form>
        )}
      />
    </section>
  ))
  .add('Date Picker - Empty', () => (
    <section className="section">
      <Formik
        initialValues={{ demo: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
        render={() => (
          <Form>
            <div className="column is-half-desktop">
              <DatePicker name="demo" labelText="demo" id="demo" />
            </div>
          </Form>
        )}
      />
    </section>
  ))
  .add('Date Picker - Error', () => {
    const Parent = () => {
      const ref = useRef(null)
      useEffect(() => {
        console.log((ref.current as any).setTouched({ demo: true }))
      }, [])
      return (
        <section className="section">
          <Formik
            ref={ref}
            validate={() => {
              return {
                demo: 'error'
              }
            }}
            initialValues={{ demo: new Date() }}
            onSubmit={values => {
              action('Form Values' + values)
            }}
            render={() => (
              <Form>
                <div className="column is-half-desktop">
                  <DatePicker name="demo" labelText="Demo" id="test" />
                </div>
              </Form>
            )}
          />
        </section>
      )
    }

    return <Parent />
  })
