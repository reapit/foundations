import { AppTypeEnum, PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineRunnerResponse } from '../../components/apps/pipeline/pipeline-deployments-table'

export const mockPipelineModelInterface: PipelineModelInterface & { runtime: 'NODE_16' } = {
  buildCommand: 'build',
  outDir: 'build',
  buildStatus: 'FAILED',
  id: '9763dbf0-f62c-474e-8a42-835977584cf1',
  created: '2022-04-14T16:55:20.023Z',
  modified: '2022-04-21T11:16:06.000Z',
  name: 'reapit-ltd-internal-tested-dress',
  appType: 'react' as AppTypeEnum.REACT,
  packageManager: 'yarn' as PackageManagerEnum.YARN,
  repository: { repositoryUrl: 'https://github.com/bashleigh/reapit-react-test' },
  developerId: '421b65bc-dd09-4c34-90fa-dacc3cd2ff5a',
  subDomain: 'beautiful-land',
  appId: '9763dbf0-f62c-474e-8a42-835977584cf1',
  branch: 'master',
  runtime: 'NODE_16',
}

export const mockPipelineRunnerResponse: PipelineRunnerResponse = {
  items: [
    {
      currentlyDeployed: true,
      id: 'c947af4f-a89f-4a0e-a9ac-953362d9c4b3',
      created: '2022-04-20T14:30:26.396Z',
      modified: '2022-04-20T14:30:34.000Z',
      buildStatus: 'SUCCEEDED',
      s3BuildLogsLocation: 'SOME_LOCATION',
      tasks: [
        {
          id: '2f187892-ed0a-41c9-b4b3-2fa0db20b014',
          created: '2022-04-20T14:30:34.381Z',
          modified: '2022-04-20T15:05:05.000Z',
          functionName: 'INSTALL',
          buildStatus: 'SUCCEEDED',
          elapsedTime: '52',
        },
        {
          id: '36235bef-1185-45b4-9167-b0dd121e28e4',
          created: '2022-04-20T14:30:34.431Z',
          modified: '2022-04-20T14:30:34.431Z',
          functionName: 'DEPLOY',
          buildStatus: 'SUCCEEDED',
          elapsedTime: '8',
        },
        {
          id: '9fc3f9f7-1e11-41d8-86c3-f805fb99b87a',
          created: '2022-04-20T14:30:34.398Z',
          modified: '2022-04-20T15:06:17.000Z',
          functionName: 'BUILD',
          buildStatus: 'SUCCEEDED',
          elapsedTime: '23',
        },
        {
          id: 'c8e4b96e-69c1-44ee-bc1f-86374672060f',
          created: '2022-04-20T14:30:34.415Z',
          modified: '2022-04-20T15:04:12.000Z',
          functionName: 'DOWNLOAD_SOURCE',
          buildStatus: 'SUCCEEDED',
          elapsedTime: '11',
        },
      ],
    },
  ],
  meta: { totalItems: 1, itemCount: 1, itemsPerPage: 10, totalPages: 1, currentPage: 1 },
}
