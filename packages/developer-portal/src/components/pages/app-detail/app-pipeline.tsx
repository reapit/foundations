import { cx } from '@linaria/core'
import {
  BodyText,
  Button,
  ButtonGroup,
  elM6,
  FlexContainer,
  FormLayout,
  Input,
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
  PipelineModelInterface,
  PipelineRunnerModelInterface,
} from '@reapit/foundations-ts-definitions'
import React, { useState } from 'react'

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

const PipelineCreationModal = ({ open, onModalClose }: { open: boolean; onModalClose: () => void }) => {
  const [repository, setRepository] = useState<string>('')
  const [packageManager, setPackageManager] = useState<string>('yarn')
  const [buildCommand, setBuildCommand] = useState<string>('build')
  const [testCommand, setTestCommand] = useState<string>('')

  return (
    <Modal isOpen={open} onModalClose={onModalClose}>
      <Title>Create Pipeline</Title>
      <BodyText hasGreyText>
        Sed lobortis egestas tellus placerat condimentum. Orci varius natoque penatibus et magnis dis parturient montes,
        nascetur ridiculus mus.
      </BodyText>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          console.log('values', {
            repository,
            buildCommand,
            testCommand,
            packageManager,
          })
        }}
      >
        <FormLayout>
          <InputWrap>
            <InputGroup>
              <Label>Github Repository</Label>
              <Input
                value={repository}
                onChange={(event) => {
                  setRepository(event.target.value)
                }}
              />
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Package Manager</Label>
              <Label>
                <Input
                  name="package_manager"
                  type="radio"
                  value="yarn"
                  checked={packageManager === 'yarn'}
                  onChange={() => {
                    setPackageManager('yarn')
                  }}
                />{' '}
                Yarn
              </Label>
              <Label>
                <Input
                  name="package_manager"
                  type="radio"
                  value="npm"
                  checked={packageManager === 'npm'}
                  onChange={() => {
                    setPackageManager('npm')
                  }}
                />{' '}
                Npm
              </Label>
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Build Command</Label>
              <Input value={buildCommand} onChange={(event) => setBuildCommand(event.target.value)} />
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Test Command</Label>
              <Input value={testCommand} onChange={(event) => setTestCommand(event.target.value)} />
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
