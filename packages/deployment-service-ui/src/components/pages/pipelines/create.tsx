import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Formik, Form } from '@reapit/elements-legacy'
import {
  InputAddOn,
  Button,
  Input,
  InputGroup,
  Label,
  Title,
  FlexContainer,
  SecondaryNavContainer,
  elMb5,
  elHFull,
  Icon,
  Subtitle,
  BodyText,
  PageContainer,
  elW6,
  elP6,
  elW3,
  elMlAuto,
  ButtonGroup,
} from '@reapit/elements'
import React, { useState } from 'react'
import { PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { pipelineServiceCreate } from '@/platform-api/pipelines'
import { useHistory } from 'react-router'
import { cx } from '@linaria/core'

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
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Pipelines</Title>
        <Icon className={elMb5} icon="apiDocsInfographic" iconSize="large" />
        <Subtitle>Pipeline Manager</Subtitle>
        <BodyText hasGreyText>
          Create your live time pipleline here by providing a target for your build. For more information read the
          documentation below:
        </BodyText>
        <Button className={elMb5} intent="neutral">
          View Docs
        </Button>
        <Button className={elMb5} intent="critical" onClick={() => history.push(Routes.PIPELINES)}>
          View Pipelines
        </Button>
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Title>Create Pipeline</Title>
        <Formik
          initialValues={{
            buildCommand: 'build',
            packageManager: PackageManagerEnum.YARN,
            name: '',
            repository: '',
            outDir: 'build',
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
              <FlexContainer isFlexWrap>
                <InputGroup className={cx(elW6, elP6)}>
                  <Label>Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={(event) => setFieldValue('name', event.target.value)}
                  />
                  {errors.name && <InputAddOn intent="danger">{errors.name}</InputAddOn>}
                </InputGroup>
                <InputGroup className={cx(elW6, elP6)}>
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

                <InputGroup className={cx(elW3, elP6)}>
                  <Label>Yarn</Label>
                  <Input
                    name="package"
                    type="radio"
                    value={PackageManagerEnum.YARN}
                    defaultChecked={values.packageManager === PackageManagerEnum.YARN}
                    onChange={(event) => setFieldValue('package', event.target.value)}
                  />
                </InputGroup>
                <InputGroup className={cx(elW3, elP6)}>
                  <Label>NPM</Label>
                  <Input
                    name="package"
                    type="radio"
                    value={PackageManagerEnum.NPM}
                    defaultChecked={values.packageManager === PackageManagerEnum.NPM}
                    onChange={(event) => setFieldValue('package', event.target.value)}
                  />
                </InputGroup>
                {errors.packageManager && <InputAddOn intent="danger">{errors.packageManager}</InputAddOn>}
                <InputGroup className={cx(elW6, elP6)}>
                  <Label>Build Command</Label>
                  <Input
                    id="build"
                    value={values.buildCommand}
                    onChange={(event) => setFieldValue('build', event.target.value)}
                  />
                  {errors.buildCommand && <InputAddOn intent="danger">{errors.buildCommand}</InputAddOn>}
                </InputGroup>
                <InputGroup className={cx(elW6, elP6)}>
                  <Label>Out Directory</Label>
                  <Input
                    id="outDir"
                    value={values.outDir}
                    onChange={(event) => setFieldValue('outDir', event.target.value)}
                  />
                  {errors.outDir && <InputAddOn intent="danger">{errors.outDir}</InputAddOn>}
                </InputGroup>
              </FlexContainer>
              <ButtonGroup>
                <Button className={elMlAuto} type="submit" loading={loading} intent="critical" chevronRight>
                  Create
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </PageContainer>
    </FlexContainer>
  )
}
