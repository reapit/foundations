import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Breadcrumb, BreadcrumbItem, H1, Section, Formik, Form } from '@reapit/elements-legacy'
import { AfterInputText, Button, Input, InputGroup, Label } from '@reapit/elements'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { pipelineServiceCreate } from '@/platform-api/pipelines'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)

  const createPipeline = async (pipeline: Partial<PipelineModelInterface>): Promise<void> => {
    setLoading(true)
    const result = await pipelineServiceCreate(connectSession as ReapitConnectSession, pipeline)
    if (result) {
      // TODO navigate to display pipeline
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
        <H1>Pipeline Creation</H1>
        <Formik
          initialValues={{
            build: 'build',
            package: 'yarn',
            projectName: '',
            repository: '',
          }}
          onSubmit={async (values) => {
            console.log(values)
            await createPipeline(values)
          }}
        >
          <Form>
            <InputGroup>
              <Label>Project Name</Label>
              <Input id="projectName" name="projectName" placeholder="Project Name" />
            </InputGroup>
            <InputGroup>
              <Label>Repository</Label>
              <Input id="repository" name="repository" placeholder="Git Repository git@github.com:reapit/my-app" />
            </InputGroup>
            <Label>Package Manager</Label>
            <InputGroup>
              <Input name="package" type="radio" value="yarn" />
              <AfterInputText>yarn</AfterInputText>
            </InputGroup>
            <InputGroup>
              <Input name="package" type="radio" value="npm" />
              <AfterInputText>npm</AfterInputText>
            </InputGroup>
            <InputGroup>
              <Label>Build Command</Label>
              <Input id="build" />
            </InputGroup>
            <br />
            <Button loading={loading} intent="primary">
              Create
            </Button>
          </Form>
        </Formik>
      </Section>
    </>
  )
}
