import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { action } from '@storybook/addon-actions'
import { Input, InputProps } from '.'
import { Form, Formik } from 'formik'
import { FaSearch } from 'react-icons/fa'
import { Section } from '@/components/Layout'

export default {
  title: 'Rereshed-Docs/Input',
  component: Input,
  decorators: [
    (Story: Story) => (
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <Formik
          initialValues={{ text: '', email: '', password: '', tel: '' }}
          onSubmit={(values) => {
            action('Form Values' + values)
          }}
        >
          <Form>
            <div className="column is-half-desktop">
              <Story />
            </div>
          </Form>
        </Formik>
      </Section>
    ),
  ],
}

export const Required: Story<InputProps> = (args) => <Input {...args} />
Required.args = {
  id: 'text',
  type: 'text',
  placeholder: 'Some text here',
  name: 'text',
  labelText: 'Text',
  required: true,
}

export const Email: Story<InputProps> = (args) => <Input {...args} />
Email.args = {
  id: 'email',
  type: 'email',
  placeholder: 'bob@acme.com',
  name: 'email',
  labelText: 'Email',
}

export const Password: Story<InputProps> = (args) => <Input {...args} />
Password.args = {
  id: 'password',
  type: 'password',
  placeholder: '********',
  name: 'password',
  labelText: 'Password',
}

export const Telephone: Story<InputProps> = (args) => <Input {...args} />
Telephone.args = {
  id: 'tel',
  type: 'tel',
  placeholder: '0800 800 800',
  name: 'tel',
  labelText: 'Telephone',
}

export const Search: Story<InputProps> = (args) => <Input {...args} />
Search.args = {
  id: 'search',
  type: 'text',
  rightIcon: <FaSearch />,
  placeholder: 'Search...',
  name: 'search',
  labelText: 'Telephone',
}
