import { AppTypeEnum, PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { PipelineRunnerResponse } from '../../components/apps/pipeline/pipeline-deployments-table'

export const mockPipelineModelInterface: PipelineModelInterface = {
  buildCommand: 'build',
  outDir: 'build',
  buildStatus: 'FAILED',
  id: '9763dbf0-f62c-474e-8a42-835977584cf1',
  created: '2022-04-14T16:55:20.023Z',
  modified: '2022-04-21T11:16:06.000Z',
  name: 'reapit-ltd-internal-tested-dress',
  appType: 'react' as AppTypeEnum.REACT,
  packageManager: 'yarn' as PackageManagerEnum.YARN,
  repository: 'https://github.com/bashleigh/reapit-react-test',
  developerId: '421b65bc-dd09-4c34-90fa-dacc3cd2ff5a',
  subDomain: 'beautiful-land',
  appId: '9763dbf0-f62c-474e-8a42-835977584cf1',
  branch: 'master',
}

export const mockPipelineRunnerResponse: PipelineRunnerResponse = {
  items: [
    {
      currentlyDeployed: true,
      id: 'c947af4f-a89f-4a0e-a9ac-953362d9c4b3',
      created: '2022-04-20T14:30:26.396Z',
      modified: '2022-04-20T14:30:34.000Z',
      buildStatus: 'SUCCEEDED',
      s3BuildLogsLocation:
        'https://cloud-deployment-usercodedeploymentlogdevd52b2ed4df81d2ac2d65.s3.eu-west-2.amazonaws.com/40a3fd04-617f-432a-bc60-9ee4dc890f2d.gz?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAVI3TO7F7IOG7QAP7%2F20220420%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220420T143034Z&X-Amz-Expires=604800&X-Amz-Security-Token=FwoGZXIvYXdzEHAaDC0WYfIcqQ5h6Lh%2FqCK2ATFhz7WT5v9UVTDO9TaD0zQkh8MrHhdvxopm2W6JdULyCFbXbCGFU8e%2Fv9C0Hh6RaHd2IyfvZ4KFhxoGiUNOGBjorM5UkXkU5R4lNYHyh3%2F4tOhlZYEhv8AiWe1kJpego%2FJ6f2Ar06NX%2BOvMEBeqGH5mpsrFLIFkVMTc4QMnywwoQGZ7WX9lNw%2Bjh7q8N3%2BfypaiNKuQd5Jetk0sNlr0IZvSSPKXjGva72bbqdu8Vka6HyJcowCJKIqygJMGMi2wRmSczuSNERUtIvguJNZFNSA7y96gcYBzq8GBE%2F%2Bb0iqYSoaqk4LZP0pWd4Y%3D&X-Amz-Signature=2e379e98ae32fefa3f00ff4cbf6827ef5bae5b2d93e40298c5de6a003b1fe059&X-Amz-SignedHeaders=host',
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
