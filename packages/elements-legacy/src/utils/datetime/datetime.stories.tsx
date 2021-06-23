import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Form, Formik } from 'formik'
import { DatePicker } from '../../components/DatePicker'
import { getTime, getDate, isSameDay, closestTo } from './datetime'

export default {
  title: 'Utils/DateTime',
  component: <div />,
}

export const Usage: Story = () => {
  const arrDates = ['2019-11-01T00:00:00', '2019-11-06T00:00:00', '2019-11-12T00:00:00']
  return (
    <div>
      <Formik
        initialValues={{ inputDate: '' }}
        onSubmit={(values) => {
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
              <p>
                Result function getTime: <strong>{inputDate ? getTime(inputDate) : null}</strong>
              </p>
              <p>
                Result function getDay: <strong>{inputDate ? getDate(inputDate) : null}</strong>
              </p>
              <p>
                Result function isSameDay: <strong>{inputDate ? isSameDay(inputDate).toString() : null}</strong>
              </p>
              <p>
                Date closest to in list [{arrDates.join(', ')}]:
                <strong>{inputDate ? closestTo(inputDate, arrDates) : null}</strong>
              </p>
            </>
          )
        }}
      />
    </div>
  )
}
