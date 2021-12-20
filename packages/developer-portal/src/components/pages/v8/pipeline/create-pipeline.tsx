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
  InputWrapFull,
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
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

export const pipelineCreateFormHandle =
  (createPipeline: (values: Partial<PipelineModelInterface>) => Promise<boolean>, refresh: () => void, appId: string) =>
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
      packageManager: PackageManagerEnum.YARN,
    },
  })

  const [loading, , send, submissionErrors] = useReapitUpdate<Partial<PipelineModelInterface>, PipelineModelInterface>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updatePipeline],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  return (
    <Modal isOpen={open} onModalClose={onModalClose}>
      <Title>Create Pipeline</Title>
      {submissionErrors && <PersistantNotification isInline>{submissionErrors}</PersistantNotification>}
      <BodyText hasGreyText>
        Sed lobortis egestas tellus placerat condimentum. Orci varius natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus.
      </BodyText>
      <form onSubmit={handleSubmit(pipelineCreateFormHandle(send, refreshPipeline, appId))}>
        <FormLayout>
          <InputWrap>
            <InputGroup>
              <Label>Name</Label>
              <Input {...register('name')} />
              {errors.name?.message && <InputAddOn intent="danger">{errors.name.message}</InputAddOn>}
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
          <InputWrapFull>
            <ButtonGroup alignment="right">
              <Button loading={loading} intent={'primary'}>
                Create
              </Button>
            </ButtonGroup>
          </InputWrapFull>
        </FormLayout>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus sem nec sagittis aliquet. Praesent
            malesuada non mi sed tristique. Proin fermentum metus quis ante tempor egestas. Class aptent taciti sociosqu
            ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas et lacinia neque.
          </BodyText>
          <Button
            intent="primary"
            chevronRight
            onClick={() => setModalOpen(true)}
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
            Praesent malesuada non mi sed tristique. Proin fermentum metus quis ante tempor egestas. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas et lacinia neque. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus sem nec sagittis aliquet.
          </BodyText>
          <Button
            intent="low"
            onClick={openNewPage(ExternalPages.webhooksDocs)}
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
