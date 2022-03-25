import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  ButtonGroup,
  FormLayout,
  Input,
  InputAddOn,
  InputGroup,
  InputWrap,
  Label,
  Modal,
  PersistantNotification,
  Title,
} from '@reapit/elements'
import { AppTypeEnum, PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import Yup, { mixed, object, string } from 'yup'
import errorMessages from '@/constants/error-messages'
import { httpsUrlRegex, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useReapitUpdate } from '@reapit/utils-react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

type PipelineModelSchema = Omit<
  PipelineModelInterface,
  'created' | 'modified' | 'id' | 'organisationId' | 'developerId' | 'appType' | 'appId' | 'buildStatus' | 'subDomain'
>

const pipelineUpdateFormHandle =
  (
    updatePipeline: (values: Partial<PipelineModelInterface>) => Promise<boolean | PipelineModelInterface>,
    refresh: (pipeline: PipelineModelInterface) => void,
    appId: string,
  ) =>
  async (values: PipelineModelInterface) => {
    const result = await updatePipeline({
      ...values,
      appId,
      appType: AppTypeEnum.REACT, // TODO make this an option
    })

    if (result && typeof result !== 'boolean') refresh(result)
  }

interface PipelineUpdateModalInterface {
  // open: boolean
  // onModalClose: () => void
  appId: string
  refreshPipeline: (pipeline: PipelineModelInterface) => void
  pipeline: PipelineModelInterface
}

export const EditPipeline: FC<PipelineUpdateModalInterface> = ({ pipeline, appId, refreshPipeline }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
    defaultValues: pipeline,
    resolver: yupResolver(schema),
  })

  const [loading, , send, submissionErrors] = useReapitUpdate<Partial<PipelineModelInterface>, PipelineModelInterface>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updatePipeline],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  return (
    <>
      <Button intent="secondary" onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onModalClose={() => setIsOpen(false)}>
        <Title>Edit Pipeline</Title>
        {submissionErrors && <PersistantNotification isInline>{submissionErrors}</PersistantNotification>}
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
          <ButtonGroup alignment="right">
            <Button
              onClick={handleSubmit(
                pipelineUpdateFormHandle(
                  send,
                  (pipeline) => {
                    setIsOpen(false)
                    refreshPipeline(pipeline)
                  },
                  appId,
                ),
              )}
              loading={loading}
              intent={'primary'}
            >
              Update
            </Button>
            <Button onClick={() => setIsOpen(false)} intent="secondary">
              Cancel
            </Button>
          </ButtonGroup>
        </FormLayout>
      </Modal>
    </>
  )
}
