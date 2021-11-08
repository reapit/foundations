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
  Title,
} from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
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
  return (
    <Modal isOpen={open} onModalClose={onModalClose}>
      <form>
        <FormLayout>
          <InputWrap>
            <InputGroup>
              <Label>Github Repository</Label>
              <Input />
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Package Manager</Label>
              <Label>
                <Input name="package_manager" type="radio" value="yarn" checked /> Yarn
              </Label>
              <Label>
                <Input name="package_manager" type="radio" value="npm" /> Npm
              </Label>
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Build Command</Label>
              <Input />
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Tests</Label>
              <Input type="checkbox" />
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

export const AppPipeline = ({ appDetailData }: { appDetailData: AppDetailModel }) => {
  // TODO make some fetching func to get pipeline for app if exists
  const pipeline = undefined

  console.log('app', appDetailData)
  return (
    <>
      <Title>Pipeline</Title>
      <BodyText hasGreyText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus sem nec sagittis aliquet. Praesent
        malesuada non mi sed tristique. Proin fermentum metus quis ante tempor egestas. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos. Maecenas et lacinia neque. Integer vulputate ante
        orci, ut dictum arcu eleifend non. Aenean lacinia justo nisl, in tempor tellus posuere in.
      </BodyText>
      {!pipeline ? <NoPipeline /> : <></>}
    </>
  )
}
