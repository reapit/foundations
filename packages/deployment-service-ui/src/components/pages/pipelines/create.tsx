import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Breadcrumb, BreadcrumbItem, Section, Formik, Form } from '@reapit/elements-legacy'
import { InputAddOn, Button, Input, InputGroup, Label, Title } from '@reapit/elements'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { pipelineServiceCreate } from '@/platform-api/pipelines'
import { useHistory } from 'react-router'

const isNull = (value: any): boolean => !value || value === '' || value === null || typeof value === 'undefined'

const isUrl = (value: string): boolean =>
  new RegExp(
    // eslint-disable-next-line max-len
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  ).test(value)

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()

  const createPipeline = async (pipeline: Partial<PipelineModelInterface>): Promise<PipelineModelInterface | void> => {
    setLoading(true)
    const result = await pipelineServiceCreate(connectSession as ReapitConnectSession, pipeline)
    if (result) {
      history.push(Routes.PIPELINES_SHOW.replace(':pipelineId', result.id as string))
    }
    setLoading(false)
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={Routes.PIPELINES}>Pipelines</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent={true}>
          <a href="#">Create</a>
        </BreadcrumbItem>
      </Breadcrumb>
      <Section>
        <Title>Pipeline Creation</Title>
        <Formik
          initialValues={{
            buildCommand: 'build',
            packageManager: PackageManagerEnum.YARN,
            name: '',
            repository: '',
            outDir: 'dist',
          }}
          validate={(values) => {
            const errors: { [s: string]: string } = {}

            if (isNull(values.name)) {
              errors.name = 'Please enter a name for the project'
            }

            if (isNull(values.repository)) {
              errors.repository = 'Please enter a repository'
            }

            if (!isUrl(values.repository)) {
              errors.repository = 'Please enter a valid repository url'
            }

            if (isNull(values.packageManager)) {
              errors.packageManager = 'Please select a package manager'
            }

            if (isNull(values.buildCommand)) {
              errors.buildCommand = 'Please enter a build command'
            }

            if (isNull(values.outDir)) {
              errors.outDir = 'Please enter an our Directory'
            }

            if (Object.keys(errors).length >= 1) {
              return errors
            }
          }}
          onSubmit={async (values) => {
            await createPipeline(values)
          }}
        >
          {({ errors, values, setFieldValue }) => (
            <Form>
              <InputGroup>
                <Label>Project Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(event) => setFieldValue('name', event.target.value)}
                />
                {errors.name && <InputAddOn intent="danger">{errors.name}</InputAddOn>}
              </InputGroup>
              <InputGroup>
                <Label>Repository</Label>
                <Input
                  id="repository"
                  name="repository"
                  placeholder="https://github.com/reapit/my-app"
                  value={values.repository}
                  onChange={(event) => setFieldValue('repository', event.target.value)}
                />
                {errors.repository && <InputAddOn intent="danger">{errors.repository}</InputAddOn>}
              </InputGroup>
              <Label>Package Manager</Label>
              <InputGroup>
                <Input
                  name="package"
                  type="radio"
                  value={PackageManagerEnum.YARN}
                  checked={values.packageManager === PackageManagerEnum.YARN}
                  onChange={(event) => setFieldValue('package', event.target.value)}
                />
                <InputAddOn>yarn</InputAddOn>
              </InputGroup>
              <InputGroup>
                <Input
                  name="package"
                  type="radio"
                  value={PackageManagerEnum.NPM}
                  checked={values.packageManager === PackageManagerEnum.NPM}
                  onChange={(event) => setFieldValue('package', event.target.value)}
                />
                <InputAddOn>npm</InputAddOn>
              </InputGroup>
              {errors.packageManager && <InputAddOn intent="danger">{errors.packageManager}</InputAddOn>}
              <InputGroup>
                <Label>Build Command</Label>
                <Input
                  id="build"
                  value={values.buildCommand}
                  onChange={(event) => setFieldValue('build', event.target.value)}
                />
                {errors.buildCommand && <InputAddOn intent="danger">{errors.buildCommand}</InputAddOn>}
              </InputGroup>
              <InputGroup>
                <Label>Out Directory</Label>
                <Input
                  id="outDir"
                  value={values.outDir}
                  onChange={(event) => setFieldValue('outDir', event.target.value)}
                />
                {errors.outDir && <InputAddOn intent="danger">{errors.outDir}</InputAddOn>}
              </InputGroup>
              <br />
              <Button type="submit" loading={loading} intent="primary">
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Section>
    </>
  )
}
