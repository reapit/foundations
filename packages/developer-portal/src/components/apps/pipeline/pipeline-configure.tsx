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
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import Routes from '../../../constants/routes'
import { PipelineTabs } from './pipeline-tabs'
import { specialCharsTest } from '../../../utils/yup'

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
  | 'testCommand'
  | 'installationId'
  | 'repositoryId'
  | 'bitbucketClientId'
> & {
  packageManager: boolean
}

const schema: SchemaOf<PipelineModelSchema> = object().shape({
  name: string().required('Required - defaults to your app name').test(specialCharsTest),
  branch: string().required('Required - eg "main", "master"').test(specialCharsTest),
  repository: string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(httpsUrlRegex, 'Should be a secure https url'),
  buildCommand: string().trim().required('A build command is required eg "build" or "bundle"').test(specialCharsTest),
  packageManager: boolean().required('Required - either yarn or NPM'),
  outDir: string().required('Required eg "dist" or "public').test(specialCharsTest),
})

export const handlePipelineUpdate =
  (
    updatePipeline: (values: Partial<PipelineModelInterface>) => Promise<boolean | PipelineModelInterface>,
    setAppPipelineSaving: Dispatch<SetStateAction<boolean>>,
    refresh: () => void,
    appId: string | null,
  ) =>
  async (values: PipelineModelSchema) => {
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
    const { name, branch, repository, buildCommand, packageManager, outDir } = appPipeline
    return {
      name,
      branch,
      repository,
      buildCommand,
      outDir,
      packageManager: packageManager === PackageManagerEnum.YARN,
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
  const location = useLocation()
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
    action: updateActions(window.reapit.config.appEnv)[
      appPipeline ? UpdateActionNames.updatePipeline : UpdateActionNames.createPipeline
    ],
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
      {!location.pathname.includes('new') && <PipelineTabs />}
      <BodyText hasGreyText>
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
        </FormLayout>
      </form>
    </>
  )
}
