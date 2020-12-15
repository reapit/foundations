import DataLoader from 'dataloader'
import { getCompanies } from './services'
import { ServerContext } from '@/index'
import { CompanyModel, PagedResultCompanyModel_ } from '@/types'
import logger from '@/logger'
import handleError from '@/utils/handle-error'

export const generateCompanyBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  logger.info('generateCompanyBatchLoaderFn', { traceId })
  try {
    const companiesResult = (await getCompanies({ id: keys }, context)) as PagedResultCompanyModel_
    const result = keys.map((key: string) => {
      return (companiesResult?._embedded ?? []).find((company: CompanyModel) => company.id === key)
    })
    return result
  } catch (err) {
    await handleError({ error: err, traceId, caller: 'generateCompanyBatchLoaderFn' })
    return keys.map(() => err)
  }
}

export const generateCompanyLoader = (context: ServerContext) => new DataLoader(generateCompanyBatchLoaderFn(context))
