import React from 'react'

import { storiesOf } from '@storybook/react'
import { RadioSelect } from '.'
import { Formik, Form } from 'formik'
import { action } from '@storybook/addon-actions'

storiesOf('RadioSelect', module).add('Primary', () => {
  const mockProps = {
    name: 'mockName',
    labelText: 'mockLabelText',
    id: 'mockId',
    dataTest: 'mockDatatest',
    options: [{ label: 'label', value: 'value' }, { label: 'label1', value: 'value1' }]
  }
  return (
    <section className="section">
      <Formik
        initialValues={{ demo: 'b' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <RadioSelect {...mockProps} />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
})
