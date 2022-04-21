import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import {
  BodyText,
  ElToggleItem,
  FormLayout,
  Input,
  InputError,
  InputGroup,
  InputWrap,
  Label,
  Title,
  Toggle,
} from '@reapit/elements'
import { boolean, object, SchemaOf, string } from 'yup'
import {
  AppDetailModel,
  AppTypeEnum,
  PackageManagerEnum,
  PipelineModelInterface,
} from '@reapit/foundations-ts-definitions'
import { httpsUrlRegex, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import errorMessages from '@/constants/error-messages'
import { useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { useAppState } from '../state/use-app-state'
import { useHistory } from 'react-router'
import { History } from 'history'
import Routes from '../../../constants/routes'

type PipelineModelSchema = Omit<
  PipelineModelInterface,
  | 'created'
  | 'modified'
  | 'id'
  | 'organisationId'
  | 'developerId'
  | 'appType'
  | 'appId'
  | 'buildStatus'
  | 'subDomain'
  | 'packageManager'
> & {
  packageManager: boolean
}

export const handlePipelineUpdate =
  (
    updatePipeline: (values: Partial<PipelineModelInterface>) => Promise<boolean | PipelineModelInterface>,
    setAppPipelineSaving: Dispatch<SetStateAction<boolean>>,
    refresh: () => void,
    appId: string | null,
  ) =>
  async (values: PipelineModelSchema) => {
    console.log(values)
    const result = await updatePipeline({
      ...values,
      packageManager: values.packageManager ? PackageManagerEnum.YARN : PackageManagerEnum.NPM,
      appId: appId ?? '',
      appType: AppTypeEnum.REACT, // TODO make this an option
    })

    if (result) {
      setAppPipelineSaving(false)
      refresh()
    }
  }

const schema: SchemaOf<PipelineModelSchema> = object().shape({
  name: string().required('Required - defaults to your app name'),
  branch: string().required('Required - eg "main", "master"'),
  repository: string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(httpsUrlRegex, 'Should be a secure https url'),
  buildCommand: string().trim().required('A build command is required eg "build" or "bundle"'),
  packageManager: boolean().required('Required - either yarn or NPM'),
  outDir: string().required('Required eg "dist" or "public'),
  testCommand: string(),
})

export const handleUpdateSuccess = (history: History, appId: string | null, updateSuccessful?: boolean) => () => {
  if (updateSuccessful && appId) {
    history.push(Routes.APP_PIPELINE.replace(':appId', appId))
  }
}

export const handleSavePipeline =
  (submitHandler: () => void, appPipelineSaving: boolean, setAppPipelineSaving: Dispatch<SetStateAction<boolean>>) =>
  () => {
    if (appPipelineSaving) {
      submitHandler()
      setAppPipelineSaving(false)
    }
  }

export const getDefaultValues = (appPipeline: PipelineModelInterface | null, appDetail: AppDetailModel | null) => {
  if (appPipeline) {
    return {
      ...appPipeline,
      packageManager: appPipeline.packageManager === PackageManagerEnum.YARN,
    }
  }

  return {
    name: appDetail?.name,
    buildCommand: 'build',
    branch: 'main',
    packageManager: true,
  }
}

export const PipelineConfigure: FC = () => {
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState, appId, appsDataState } = useAppState()
  const { appPipelineRefresh, appPipelineSaving, appPipeline, setAppPipelineSaving } = appPipelineState
  const { appDetail } = appsDataState

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PipelineModelSchema>({
    resolver: yupResolver(schema),
    defaultValues: getDefaultValues(appPipeline, appDetail),
  })

  const [, , updatePipeline, updateSuccessful] = useReapitUpdate<
    Partial<PipelineModelInterface>,
    PipelineModelInterface
  >({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updatePipeline],
    method: appPipeline ? 'PUT' : 'POST',
    uriParams: {
      pipelineId: appId,
    },
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const submitHandler = handleSubmit(
    handlePipelineUpdate(updatePipeline, setAppPipelineSaving, appPipelineRefresh, appId),
  )

  useEffect(handleUpdateSuccess(history, appId, updateSuccessful), [updateSuccessful, appId])

  useEffect(handleSavePipeline(submitHandler, appPipelineSaving, setAppPipelineSaving), [appPipelineSaving])

  return (
    <>
      <Title>Configure Pipeline</Title>
      <BodyText hasGreyText hasSectionMargin>
        Tell us about how we should build your application here. We assume that your application is a front end app and
        that, it uses either yarn or npm to run scripts decalared in a package.json file. We assume also that your
        application is bundled and that bundle is output to a local directory that we can deploy for you.
      </BodyText>
      <form>
        <FormLayout hasMargin>
          <InputWrap>
            <InputGroup>
              <Label>Name</Label>
              <Input {...register('name')} />
              {errors.name?.message && <InputError message={errors.name.message} />}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Deployment Branch</Label>
              <Input {...register('branch')} />
              {errors.branch?.message && <InputError message={errors.branch.message} />}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Github Repository</Label>
              <Input {...register('repository')} placeholder="https://github.com/org/repo" />
              {errors.repository?.message && <InputError message={errors.repository.message} />}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Toggle id="package-manager-toggle" hasGreyBg {...register('packageManager')}>
                <ElToggleItem>Yarn</ElToggleItem>
                <ElToggleItem>NPM</ElToggleItem>
              </Toggle>
              <Label>Package Manager</Label>
              {errors.packageManager?.message && <InputError message={errors.packageManager.message} />}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Build Command</Label>
              <Input {...register('buildCommand')} />
              {errors.buildCommand?.message && <InputError message={errors.buildCommand.message} />}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Build Directory</Label>
              <Input {...register('outDir')} />
              {errors.outDir?.message && <InputError message={errors.outDir.message} />}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Test Command</Label>
              <Input {...register('testCommand')} />
              {errors.testCommand?.message && <InputError message={errors.testCommand.message} />}
            </InputGroup>
          </InputWrap>
        </FormLayout>
      </form>
    </>
  )
}
