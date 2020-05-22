import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { FileInput } from '.'
import { Form, Formik } from 'formik'

storiesOf('FileInput', module)
  .add('Primary', () => (
    <section className="section">
      <Formik
        initialValues={{ fileInput: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <FileInput id="fileInput" allowClear name="fileInput" labelText="File Input" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  ))
  .add('Required', () => (
    <section className="section">
      <Formik
        initialValues={{ fileInput: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <FileInput required id="fileInput" allowClear name="fileInput" labelText="File Input" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  ))
  .add('Disabled', () => (
    <section className="section">
      <Formik
        initialValues={{ fileInput: '' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <FileInput
                id="fileInput"
                allowClear
                name="fileInput"
                labelText="File Input"
                inputProps={{ disabled: true }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  ))
  .add('Click on filename', () => (
    <section className="section">
      <Formik
        initialValues={{ fileInput: 'file-234' }}
        onSubmit={values => {
          action('Form Values' + values)
        }}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <FileInput
                id="fileInput"
                allowClear
                name="fileInput"
                labelText="File Input"
                onFilenameClick={e => {
                  e.preventDefault()
                  alert('filename clicked')
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  ))
