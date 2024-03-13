import { PipelineModelInterface } from '@reapit/foundations-ts-definitions'

type Pagination<T> = {
  items: Array<T>
  meta: {
    currentPage: number
    itemCount: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

export const mockPipelineRunnerResponse = {
  items: [
    {
      buildCommand: 'build',
      outDir: 'build',
      buildStatus: 'PRE_PROVISIONED',
      id: 'bb2061b6-b994-4851-bc5c-94f3a42c3a79',
      created: '2022-09-08T15:01:06.002Z',
      modified: '2022-09-08T15:01:06.002Z',
      name: 'reapit-ltd-internal-thoughtless-cub',
      appType: 'node',
      packageManager: 'npm',
      repository: {
        installationId: 0,
        repositoryId: 0,
        repositoryUrl: '',
      },
      bitbucketClientId: '',
      developerId: '421b65bc-dd09-4c34-90fa-dacc3cd2ff5a',
      subDomain: 'gutsy-bikes',
      appId: 'bb2061b6-b994-4851-bc5c-94f3a42c3a79',
      branch: 'master',
    },
  ],
  meta: { totalItems: 51, itemCount: 10, itemsPerPage: 10, totalPages: 6, currentPage: 1 },
} as Pagination<PipelineModelInterface>
