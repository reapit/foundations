import React from 'react'

import { storiesOf } from '@storybook/react'
import { fetcher } from './fetcher'
import { Form, Formik } from 'formik'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { H1 } from '../../components/Typography'

storiesOf('Fetcher', module).add('Primary', () => {
  const [repo, setRepo] = React.useState<any[] | null>(null)
  const fetchData = async (values, formikAction) => {
    const { username } = values
    const { setSubmitting } = formikAction
    const res = await fetcher({
      api: 'https://api.github.com/',
      url: `users/${username}/repos?type=all&sort=updated`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setRepo(res)
    setSubmitting(false)
  }

  return (
    <section className="section">
      <H1>Show Github repositories</H1>
      <Formik
        initialValues={{ username: '' }}
        onSubmit={fetchData}
        render={({ isSubmitting }) => (
          <Form>
            <Input type="text" name="username" id="username" labelText="Username" />
            <Button type="submit" variant="primary" loading={isSubmitting}>
              Fetch Data
            </Button>
          </Form>
        )}
      />
      <ul className="mt-5">
        {repo &&
          repo.map(item => (
            <li key={item.id}>
              <a href={item.html_url}>{item.name}</a>
            </li>
          ))}
      </ul>
    </section>
  )
})
