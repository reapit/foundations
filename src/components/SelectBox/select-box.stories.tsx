import React, { useRef, useEffect } from 'react'
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
          initialValues={{ demo: 'b' }}
          onSubmit={values => {
            action('Form Values' + values)
          }}
          render={() => (
            <Form>
              <div className="column is-half-desktop">
                <SelectBox name="demo" options={mockedOptions} labelText="Demo" id="test" />
              </div>
            </Form>
          )}
        />
      </section>
    )
  })
  .add('HasError', () => {
    const Parent = () => {
      const ref = useRef(null)
      const mockedOptions: SelectBoxOptions[] = [{ label: 'option1', value: 'a' }, { label: 'option2', value: 'b' }]
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
            initialValues={{ demo: 'b' }}
            onSubmit={values => {
              action('Form Values' + values)
            }}
            render={() => (
              <Form>
                <div className="column is-half-desktop">
                  <SelectBox name="demo" options={mockedOptions} labelText="Demo" id="test" />
                </div>
              </Form>
            )}
          />
        </section>
      )
    }

    return <Parent />
  })
