import React, { Dispatch, FC, SetStateAction, useContext, useEffect } from 'react'
import { FormLayout, Input, InputError, InputGroup, InputWrap, Label, Select } from '@reapit/elements'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { httpsUrlRegex } from '@reapit/utils-common'
import {
  AppTypeEnum,
  Marketplace,
  PackageManagerEnum,
  PipelineModelInterface,
} from '@reapit/foundations-ts-definitions'
import { specialCharsTest } from '../../../../utils/yup'
import { NavigateFunction, useLocation, useNavigate } from 'react-router'
import Routes from '../../../../constants/routes'
import { UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { object, SchemaOf, string } from 'yup'
import { GithubContext } from '../github'
import { useAppState } from '../../state/use-app-state'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { RepositoryList } from './repository-list'

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

export const PipelineConfigureForm: FC = () => {
  const navigate = useNavigate()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appPipelineState, appId, appsDataState } = useAppState()
  const { appPipelineRefresh, appPipelineSaving, appPipeline, setAppPipelineSaving } = appPipelineState
  const { appDetail } = appsDataState

  const {
    register,
    handleSubmit,
    setValue,
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
            <RepositoryList
              onChange={({ repository, installation }) => {
                setValue('repository.installationId', installation.id)
                setValue('repository.repositoryId', repository.id)
                setValue('repository.repositoryUrl', `https://github.com/${repository.full_name}`)
              }}
              placeholder="https://github.com/org/repo"
              value={
                appPipeline?.repository
                  ? {
                      repositoryUrl: appPipeline?.repository?.repositoryUrl as string,
                      repositoryId: appPipeline?.repository?.repositoryId as number,
                      installationId: appPipeline?.repository?.installationId as number,
                    }
                  : undefined
              }
            />
            {/* <Input {...register('repository.repositoryUrl')} placeholder="https://github.com/org/repo" />
              {errors.repository?.repositoryUrl?.message && (
                <InputError message={errors.repository?.repositoryUrl.message} />
              )} */}
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
  )
}
