import { createAppPipeline } from '@/actions/apps'
import errorMessages from '@/constants/error-messages'
import { yupResolver } from '@hookform/resolvers/yup'
import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  ButtonGroup,
  elM6,
  FlexContainer,
  FormLayout,
  Input,
  InputAddOn,
  InputGroup,
  InputWrap,
  InputWrapFull,
  Label,
  Modal,
  PersistantNotification,
  Subtitle,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  Title,
} from '@reapit/elements'
import {
  AppDetailModel,
  PackageManagerEnum,
  PipelineModelInterface,
  PipelineRunnerModelInterface,
} from '@reapit/foundations-ts-definitions'
import { httpsUrlRegex } from '@reapit/utils-common'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mixed, object, string } from 'yup'
import { Dispatch as ReduxDispatch } from 'redux'
import { useDispatch } from 'react-redux'

const NoPipeline = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <FlexContainer isFlexJustifyCenter isFlexAlignCenter isFlexColumn>
      <PersistantNotification className={cx(elM6)} isExpanded intent="danger">
        No Pipeline configuration found for app.
      </PersistantNotification>
      <Button intent="primary" onClick={() => setModalOpen(true)}>
        Create Pipeline
      </Button>
      <PipelineCreationModal open={modalOpen} onModalClose={() => setModalOpen(false)} />
    </FlexContainer>
  )
}

export const pipelineCreateFormHandle = (dispatch: ReduxDispatch) => (values: PipelineModelInterface) => {
  dispatch(createAppPipeline(values))
}

const PipelineCreationModal = ({ open, onModalClose }: { open: boolean; onModalClose: () => void }) => {
  const schema = object().shape<PipelineModelInterface>({
    repository: string()
      .trim()
      .required(errorMessages.FIELD_REQUIRED)
      .matches(httpsUrlRegex, 'Should be a secure https url'),
    buildCommand: string().trim().required('A build command is required'),
    packageManager: mixed().oneOf(Object.values(PackageManagerEnum)),
  })

  const dispatch = useDispatch()

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

  return (
    <Modal isOpen={open} onModalClose={onModalClose}>
      <Title>Create Pipeline</Title>
      <BodyText hasGreyText>
        Sed lobortis egestas tellus placerat condimentum. Orci varius natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus.
      </BodyText>
      <form onSubmit={handleSubmit(pipelineCreateFormHandle(dispatch))}>
        <FormLayout>
          <InputWrap>
            <InputGroup>
              <Label>Github Repository</Label>
              <Input {...register('repository')} />
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
              <Label>Test Command</Label>
              <Input {...register('testCommand')} />
              {errors.testCommand?.message && <InputAddOn intent="danger">{errors.testCommand.message}</InputAddOn>}
            </InputGroup>
          </InputWrap>
          <InputWrapFull>
            <ButtonGroup alignment="right">
              <Button intent={'primary'}>Create</Button>
            </ButtonGroup>
          </InputWrapFull>
        </FormLayout>
      </form>
    </Modal>
  )
}

const PipelineInfo = ({ pipeline }: { pipeline: PipelineModelInterface }) => (
  <>
    <InputWrap>
      <Subtitle>Repository</Subtitle>
      <BodyText>{pipeline.repository}</BodyText>
    </InputWrap>
    <InputWrap>
      <Subtitle>Package Manager</Subtitle>
      <BodyText>{pipeline.packageManager}</BodyText>
    </InputWrap>
    <InputWrap>
      <Subtitle>Build Command</Subtitle>
      <BodyText>{pipeline.buildCommand}</BodyText>
    </InputWrap>
    <InputWrap>
      <Subtitle>Tests</Subtitle>
      <BodyText>{pipeline.testCommand}</BodyText>
    </InputWrap>
  </>
)

const PipelineDeployments = () => {
  // TODO make some fetching func to get pipeline deployments and list them below

  const pipelineDeployments: PipelineRunnerModelInterface[] = []

  return (
    <Table>
      <TableHeadersRow>
        <TableHeader>Created</TableHeader>
        <TableHeader>Status</TableHeader>
        <TableHeader></TableHeader>
      </TableHeadersRow>
      {pipelineDeployments.map((deployment) => (
        <TableRow key={deployment.id}>
          <TableCell>{deployment.created}</TableCell>
          <TableCell>{deployment.buildStatus}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      ))}
    </Table>
  )
}

export const AppPipeline = ({ appDetailData }: { appDetailData: AppDetailModel }) => {
  // TODO make some fetching func to get pipeline for app if exists
  const pipeline: PipelineModelInterface | undefined = undefined

  return (
    <>
      <Title>{appDetailData.name} Pipeline</Title>
      <BodyText hasGreyText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus sem nec sagittis aliquet. Praesent
        malesuada non mi sed tristique. Proin fermentum metus quis ante tempor egestas. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Maecenas et lacinia neque. Integer vulputate ante
        orci, ut dictum arcu eleifend non. Aenean lacinia justo nisl, in tempor tellus posuere in.
      </BodyText>
      {!pipeline ? (
        <NoPipeline />
      ) : (
        <>
          <PipelineInfo pipeline={pipeline} />
          <PipelineDeployments />
        </>
      )}
    </>
  )
}
