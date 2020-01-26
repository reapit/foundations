import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Form, Formik } from 'formik'
import { DatePicker } from '../../components/DatePicker'
import { getTime, getDate, isSameDay, closestTo } from './datetime'

storiesOf('Datetime', module).add('Primary', () => {
  const arrDates = ['2019-11-1T00:00:00', '2019-11-06T00:00:00', '2019-11-12T00:00:00']
  return (
    <section className="section">
      <Formik
        initialValues={{ inputDate: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
        render={({ values: { inputDate } }) => {
          return (
            <>
              <Form>
                <div className="column is-half-desktop">
                  <DatePicker name="inputDate" id="inputDate" labelText="Date" />
                </div>
              </Form>
              <p>Result function getTime: {inputDate ? getTime(inputDate) : null}</p>
              <p>Result function getDay: {inputDate ? getDate(inputDate) : null}</p>
              <p>Result function isSameDay: {inputDate ? isSameDay(inputDate).toString() : null}</p>
              <p>
                Date closest to in list [{arrDates.join(', ')}]: {inputDate ? closestTo(inputDate, arrDates) : null}
              </p>
            </>
          )
        }}
      />
    </section>
  )
})
