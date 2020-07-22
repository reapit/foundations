import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { FileInput } from '.'
import { Form, Formik } from 'formik'
import { Section } from '@/components/Layout'

storiesOf('FileInput', module)
  .add('Primary', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
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
    </Section>
  ))
  .add('Required', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
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
    </Section>
  ))
  .add('Disabled', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
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
    </Section>
  ))
  .add('Click on filename', () => (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
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
    </Section>
  ))
