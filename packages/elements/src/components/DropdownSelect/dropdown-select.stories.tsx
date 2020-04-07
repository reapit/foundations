import React from 'react'
import { Form, Formik } from 'formik'

import { storiesOf } from '@storybook/react'
import { DropdownSelect } from '.'
import { action } from '@storybook/addon-actions'

storiesOf('DropdownSelect', module).add('Primary', () => {
  return (
    <section className="section">
      <DropdownSelect mode="tags" />
    </section>
  )
})
