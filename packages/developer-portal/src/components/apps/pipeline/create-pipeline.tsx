import React, { useState } from 'react'
import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  ButtonGroup,
  ColSplit,
  elM6,
  elMb10,
  elMt10,
  FlexContainer,
  FormLayout,
  Grid,
  Input,
  InputAddOn,
  InputGroup,
  InputWrap,
  Label,
  Modal,
  PersistantNotification,
  Subtitle,
  Title,
} from '@reapit/elements'
import { IconContainer } from '../../webhooks/__styles__'
import { WebhooksAnimatedNewIcon } from '../../webhooks/webhooks-animated-new-icon'
import { WebhooksAnimatedDocsIcon } from '../../webhooks/webhooks-animated-docs-icon'
import { ExternalPages, openNewPage } from '@/utils/navigation'
import Yup, { mixed, object, string } from 'yup'
import { AppTypeEnum, PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { httpsUrlRegex, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import errorMessages from '@/constants/error-messages'
import { useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

export const pipelineCreateFormHandle =
  (
    createPipeline: (values: Partial<PipelineModelInterface>) => Promise<boolean | PipelineModelInterface>,
    refresh: () => void,
    appId: string,
  ) =>
  async (values: PipelineModelInterface) => {
    const result = await createPipeline({
      ...values,
      appId,
      appType: AppTypeEnum.REACT, // TODO make this an option
    })

    if (result) refresh()
  }

interface PipelineCreationModalInterface {
  open: boolean
  onModalClose: () => void
  appId: string
  refreshPipeline: () => void
}

type PipelineModelSchema = Omit<
  PipelineModelInterface,
  'created' | 'modified' | 'id' | 'organisationId' | 'developerId' | 'appType' | 'appId' | 'buildStatus' | 'subDomain'
>

const PipelineCreationModal = ({ open, onModalClose, appId, refreshPipeline }: PipelineCreationModalInterface) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const schema: Yup.SchemaOf<PipelineModelSchema> = object().shape({
    name: string().required(),
    branch: string().required(),
    repository: string()
      .trim()
      .required(errorMessages.FIELD_REQUIRED)
      .matches(httpsUrlRegex, 'Should be a secure https url'),
    buildCommand: string().trim().required('A build command is required'),
    packageManager: mixed().oneOf(Object.values(PackageManagerEnum)),
    outDir: string().required(),
    testCommand: string(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PipelineModelInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      buildCommand: 'build',
      branch: 'master',
      packageManager: PackageManagerEnum.YARN,
    },
  })

  const [loading, , send, submissionErrors] = useReapitUpdate<Partial<PipelineModelInterface>, PipelineModelInterface>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updatePipeline],
    uriParams: {
      pipelineId: appId,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  return (
    <Modal isOpen={open} onModalClose={onModalClose}>
      <Title>Create Pipeline</Title>
      {submissionErrors && <PersistantNotification isInline>{submissionErrors}</PersistantNotification>}
      <BodyText hasGreyText hasSectionMargin>
        Sed lobortis egestas tellus placerat condimentum. Orci varius natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus.
      </BodyText>
      <form>
        <FormLayout hasMargin>
          <InputWrap>
            <InputGroup>
              <Label>Name</Label>
              <Input {...register('name')} />
              {errors.name?.message && <InputAddOn intent="danger">{errors.name.message}</InputAddOn>}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Deployment Branch</Label>
              <Input {...register('branch')} />
              {errors.branch?.message && <InputAddOn intent="danger">{errors.branch.message}</InputAddOn>}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Github Repository</Label>
              <Input {...register('repository')} placeholder="https://github.com/org/repo" />
              {errors.repository?.message && <InputAddOn intent="danger">{errors.repository.message}</InputAddOn>}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Package Manager</Label>
              <Label>
                <Input {...register('packageManager')} type="radio" value="yarn" /> Yarn
              </Label>
              <Label>
                <Input {...register('packageManager')} type="radio" value="npm" /> Npm
              </Label>
              {errors.packageManager?.message && (
                <InputAddOn intent="danger">{errors.packageManager.message}</InputAddOn>
              )}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Build Command</Label>
              <Input {...register('buildCommand')} />
              {errors.buildCommand?.message && <InputAddOn intent="danger">{errors.buildCommand.message}</InputAddOn>}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Build Directory</Label>
              <Input {...register('outDir')} />
              {errors.outDir?.message && <InputAddOn intent="danger">{errors.outDir.message}</InputAddOn>}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Test Command</Label>
              <Input {...register('testCommand')} />
              {errors.testCommand?.message && <InputAddOn intent="danger">{errors.testCommand.message}</InputAddOn>}
            </InputGroup>
          </InputWrap>
        </FormLayout>
        <ButtonGroup alignment="right">
          <Button
            onClick={handleSubmit(pipelineCreateFormHandle(send, refreshPipeline, appId))}
            loading={loading}
            intent={'primary'}
          >
            Create
          </Button>
        </ButtonGroup>
      </form>
    </Modal>
  )
}

interface CreatePipelineInterface {
  appId: string
  refreshPipeline: () => void
}

export const CreatePipeline = ({ appId, refreshPipeline }: CreatePipelineInterface) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newPipelineAnimated, setNewPipelineAnimated] = useState<boolean>(false)
  const [docsIsAnimated, setDocsIsAnimated] = useState<boolean>(false)

  return (
    <>
      <PersistantNotification className={cx(elM6)} isExpanded intent="danger" isFullWidth isInline>
        No Pipeline configuration found for app.
      </PersistantNotification>
      <Grid>
        <ColSplit>
          <IconContainer className={elMb10}>
            <WebhooksAnimatedNewIcon isAnimated={newPipelineAnimated} />
          </IconContainer>
          <Subtitle>Pipeline Deployments</Subtitle>
          <BodyText hasGreyText>
            Pipelines are configurations used to deploy applications to our infrastructure. A Pipeline can be created
            via the developer portal or via CLI.
          </BodyText>
          <BodyText hasGreyText>Once you have created a Pipeline, you will be able to make deployments using</BodyText>
          <BodyText hasGreyText>Repository Commit using either Reapit&apos;s Github App or Bitbucket App</BodyText>
          <BodyText hasGreyText>CLI release</BodyText>
          <BodyText hasGreyText>Github Actions</BodyText>
          <BodyText hasGreyText>Dashboard Trigger</BodyText>
          <Button
            intent="primary"
            chevronRight
            onClick={(e) => {
              e.preventDefault()
              setModalOpen(true)
            }}
            onMouseOver={() => {
              setNewPipelineAnimated(true)
            }}
            onMouseOut={() => {
              setNewPipelineAnimated(false)
            }}
          >
            Create Pipeline
          </Button>
        </ColSplit>
        <ColSplit>
          <IconContainer className={elMb10}>
            <WebhooksAnimatedDocsIcon isAnimated={docsIsAnimated} />
          </IconContainer>
          <Subtitle>Pipeline Documentation</Subtitle>
          <BodyText hasGreyText>
            Read our documentation on Pipelines and see how they can benefit you and your development process.
          </BodyText>
          <Button
            intent="low"
            onClick={openNewPage(ExternalPages.pipelineDocs)}
            onMouseOver={() => {
              setDocsIsAnimated(true)
            }}
            onMouseOut={() => {
              setDocsIsAnimated(false)
            }}
          >
            View Docs
          </Button>
        </ColSplit>
      </Grid>
      <FlexContainer className={cx(elMt10)} isFlexJustifyCenter isFlexAlignCenter isFlexColumn>
        <PipelineCreationModal
          refreshPipeline={refreshPipeline}
          appId={appId}
          open={modalOpen}
          onModalClose={() => setModalOpen(false)}
        />
      </FlexContainer>
    </>
  )
}
