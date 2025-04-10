import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { BodyText, FormLayout, Input, InputError, InputGroup, InputWrap, Label, Select } from '@reapit/elements'
import { object, SchemaOf, string } from 'yup'
import {
  Marketplace,
  AppTypeEnum,
  PackageManagerEnum,
  PipelineModelInterface,
} from '@reapit/foundations-ts-definitions'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { useAppState } from '../state/use-app-state'
import { NavigateFunction, useLocation, useNavigate } from 'react-router'
import Routes from '../../../constants/routes'
import { PipelineTabs } from './pipeline-tabs'
import { specialCharsTest } from '../../../utils/yup'
import { httpsUrlRegex } from '@reapit/utils-common'

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
  | 'certificateStatus'
  | 'customDomain'
> & {
  packageManager: string
}

const schema: SchemaOf<PipelineModelSchema> = object().shape({
  name: string().required('Required - defaults to your app name').test(specialCharsTest),
  branch: string().required('Required - eg "main", "master"').test(specialCharsTest),
  repository: object().shape({
    repositoryUrl: string()
      .trim()
      .test({
        name: 'isValidDescription',
        message: 'Should be a secure https url if supplied',
        test: (value) => {
          if (!value) return true
          return httpsUrlRegex.test(value)
        },
      })
      .test(specialCharsTest),
  }),
  buildCommand: string().trim().required('A build command is required eg "build" or "bundle"').test(specialCharsTest),
  packageManager: string().required('Required - Please select a package manager'),
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
    const updateModel = {
      ...values,
      packageManager:
        values.packageManager === PackageManagerEnum.YARN_BERRY
          ? PackageManagerEnum.YARN_BERRY
          : values.packageManager === PackageManagerEnum.YARN
            ? PackageManagerEnum.YARN
            : PackageManagerEnum.NPM,
      appId: appId ?? '',
      appType: AppTypeEnum.REACT, // TODO make this an option
    }

    if (!updateModel.repository) {
      delete updateModel.repository
    }

    const result = await updatePipeline(updateModel)

    if (result) {
      setAppPipelineSaving(false)
      refresh()
    }
  }

export const handleUpdateSuccess =
  (navigate: NavigateFunction, appId: string | null, updateSuccessful?: boolean) => () => {
    if (updateSuccessful && appId) {
      navigate(Routes.APP_PIPELINE.replace(':appId', appId))
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

export const getDefaultValues = (
  appPipeline: PipelineModelInterface | null,
  appDetail: Marketplace.AppDetailModel | null,
) => {
  if (appPipeline) {
    const { name, branch, repository, buildCommand, packageManager, outDir } = appPipeline
    return {
      name,
      branch,
      repository,
      buildCommand,
      outDir,
      packageManager,
    }
  }

  return {
    name: appDetail?.name,
    buildCommand: 'build',
    outDir: 'build',
    branch: 'main',
    packageManager: PackageManagerEnum.NPM,
  }
}

export const PipelineConfigure: FC = () => {
  const navigate = useNavigate()
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
    action: updateActions[appPipeline ? UpdateActionNames.updatePipeline : UpdateActionNames.createPipeline],
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

  useEffect(handleUpdateSuccess(navigate, appId, updateSuccessful), [updateSuccessful, appId])

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
              <Input {...register('repository.repositoryUrl')} placeholder="https://github.com/org/repo" />
              {errors.repository?.repositoryUrl?.message && (
                <InputError message={errors.repository?.repositoryUrl.message} />
              )}
            </InputGroup>
          </InputWrap>
          <InputWrap>
            <InputGroup>
              <Label>Package Manager</Label>
              <Select id="package-manager-select" {...register('packageManager')}>
                <option value={PackageManagerEnum.NPM}>NPM</option>
                <option value={PackageManagerEnum.YARN}>YARN</option>
                <option value={PackageManagerEnum.YARN_BERRY}>YARN BERRY</option>
              </Select>
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
