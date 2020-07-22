import React from 'react'
import { Form, Formik } from 'formik'

import { storiesOf } from '@storybook/react'
import { SelectBox, SelectBoxOptions } from '.'
import { action } from '@storybook/addon-actions'
import { Section } from '@/components/Layout'

storiesOf('SelectBox', module)
  .add('Primary', () => {
    const mockedOptions: SelectBoxOptions[] = [
      { label: 'option1', value: 'a' },
      { label: 'option2', value: 'b' },
    ]

    return (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Formik
          initialValues={{ demo: null }}
          onSubmit={values => {
            action('Form Values' + values)
          }}
        >
          {() => (
            <Form>
              <div className="column is-half-desktop">
                <SelectBox
                  helpText="This is helper text"
                  name="demo"
                  options={mockedOptions}
                  labelText="Demo"
                  id="test"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Section>
    )
  })
  .add('Required', () => {
    const Parent = () => {
      const mockedOptions: SelectBoxOptions[] = [
        { label: 'option1', value: 'a' },
        { label: 'option2', value: 'b' },
      ]
      return (
        <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
          <Formik
            initialValues={{ demo: '' }}
            onSubmit={values => {
              action('Form Values' + values)
            }}
          >
            {() => (
              <Form>
                <div className="column is-half-desktop">
                  <SelectBox required name="demo" options={mockedOptions} labelText="Demo" id="test" />
                </div>
              </Form>
            )}
          </Formik>
        </Section>
      )
    }

    return <Parent />
  })
