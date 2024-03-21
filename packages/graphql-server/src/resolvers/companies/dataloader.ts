import DataLoader from 'dataloader'
import { getCompanies } from './services'
import { ServerContext } from '../../utils'
import { CompanyModel, CompanyModelPagedResult } from '@reapit/foundations-ts-definitions'
import handleError from '../../utils/handle-error'

export const generateCompanyBatchLoaderFn = (context: ServerContext) => async (keys: string[]) => {
  if (keys.length < 1) {
    return []
  }
  const traceId = context.traceId
  try {
    const companiesResult = (await getCompanies({ id: keys }, context)) as CompanyModelPagedResult
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
