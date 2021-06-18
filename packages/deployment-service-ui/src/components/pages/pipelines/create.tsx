import Routes from '@/constants/routes'
import { Breadcrumb, BreadcrumbItem, H1, Section, Formik, Form } from '@reapit/elements'
import { AfterInputText, Button, Input, InputGroup, Label } from '@reapit/elements/v3'
import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
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
          onSubmit={(values) => {
            console.log(values)
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
            <Button intent="primary">Create</Button>
          </Form>
        </Formik>
      </Section>
    </>
  )
}
