import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Formik, Form, Loader, H1 } from '@reapit/elements-legacy'
import {
  InputAddOn,
  Button,
  Input,
  InputGroup,
  Label,
  Title,
  FlexContainer,
  SecondaryNavContainer,
  Subtitle,
  BodyText,
  SecondaryNav,
  SecondaryNavItem,
  PageContainer,
  elHFull,
  elMb5,
  elMb8,
  Icon,
} from '@reapit/elements'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { pipelineServiceGet, pipelineServiceUpdate } from '@/platform-api/pipelines'
import { useHistory, useLocation, useParams } from 'react-router'

const isNull = (value: any): boolean => !value || value === '' || value === null || typeof value === 'undefined'

const isUrl = (value?: string): boolean =>
  typeof value !== 'undefined' &&
  new RegExp(
    // eslint-disable-next-line max-len
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  ).test(value)

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const [pipeline, setPipeline] = useState<PipelineModelInterface | undefined>()
  const params = useParams<{ pipelineId: string }>()
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)

  const history = useHistory()
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    const fetchPipeline = async () => {
      setLoading(true)
      const serviceResponse = await pipelineServiceGet(connectSession as ReapitConnectSession, params.pipelineId)
      setLoading(false)
      if (serviceResponse) {
        setPipeline(serviceResponse)
      }
    }
    if (connectSession) {
      fetchPipeline()
    }
  }, [connectSession])

  const updatePipeline = async (pipeline: Partial<PipelineModelInterface>): Promise<PipelineModelInterface | void> => {
    setUpdateLoading(true)
    const result = await pipelineServiceUpdate(connectSession as ReapitConnectSession, pipeline)
    if (result) {
      // history.push(Routes.PIPELINES_SHOW.replace(':pipelineId', result.id as string))
    }
    setUpdateLoading(false)
  }

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Pipelines</Title>
        <Icon className={elMb5} icon="developersMenu" iconSize="large" />
        <Subtitle>Deployment pipeline manager</Subtitle>
        <BodyText hasGreyText>description about the pipeline service</BodyText>
        <SecondaryNav className={elMb8}>
          <SecondaryNavItem onClick={() => history.push(Routes.PIPELINES)} active={pathname === Routes.PIPELINES}>
            My Pipelines
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={() => history.push(Routes.PIPELINES_CREATION)}
            active={pathname === Routes.PIPELINES_CREATION}
          >
            Create new Pipeline
          </SecondaryNavItem>
        </SecondaryNav>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        {loading ? (
          <FlexContainer isFlexJustifyCenter>
            <Loader />
          </FlexContainer>
        ) : pipeline ? (
          <>
            <Title>Pipeline Update</Title>
            <Formik
              initialValues={pipeline}
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
                  errors.outDir = 'Please enter an out dir'
                }

                console.log('errors', errors)

                if (Object.keys(errors).length >= 1) {
                  return errors
                }
              }}
              onSubmit={async (values) => {
                await updatePipeline(values)
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
                  <Button type="submit" loading={updateLoading} intent="primary">
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <H1>No pipeline found</H1>
            <Link to={Routes.PIPELINES}>Back</Link>
          </>
        )}
      </PageContainer>
    </FlexContainer>
  )
}
