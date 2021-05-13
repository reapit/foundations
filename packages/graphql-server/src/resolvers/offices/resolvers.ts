import officeServices from './services'
import logger from '../../logger'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetOfficeByIdArgs,
  CreateOfficeArgs,
  GetOfficesArgs,
  UpdateOfficeArgs,
  QueryGetOfficeByIdReturn,
  QueryGetOfficesReturn,
  MutationCreateOfficeReturn,
  MutationUpdateOfficeReturn,
} from './offices'

export const queryGetOfficeById = resolverHandler<GetOfficeByIdArgs, QueryGetOfficeByIdReturn>((
  _: any,
  args: GetOfficeByIdArgs,
  context: ServerContext,
): QueryGetOfficeByIdReturn => {
  const traceId = context.traceId
  logger.info('queryGetOfficeById', { traceId, args })
  return officeServices.getOfficeById(args, context)
})

export const queryGetOffices = resolverHandler<GetOfficesArgs, QueryGetOfficesReturn>((_: any, args: GetOfficesArgs, context: ServerContext): QueryGetOfficesReturn => {
  const traceId = context.traceId
  logger.info('queryGetOffices', { traceId, args })
  return officeServices.getOffices(args, context)
})

export const mutationCreateOffice = resolverHandler<CreateOfficeArgs, MutationCreateOfficeReturn>((
  _: any,
  args: CreateOfficeArgs,
  context: ServerContext,
): MutationCreateOfficeReturn => {
  const traceId = context.traceId
  logger.info('mutationCreateOffice', { traceId, args })
  return officeServices.createOffice(args, context)
})

export const mutationUpdateOffice = resolverHandler<UpdateOfficeArgs, MutationUpdateOfficeReturn>((
  _: any,
  args: UpdateOfficeArgs,
  context: ServerContext,
): MutationUpdateOfficeReturn => {
  const traceId = context.traceId
  logger.info('mutationUpdateOffice', { traceId, args })
  return officeServices.updateOffice(args, context)
})

export default {
  Query: {
    GetOfficeById: queryGetOfficeById,
    GetOffices: queryGetOffices,
  },
  Mutation: {
    CreateOffice: mutationCreateOffice,
    UpdateOffice: mutationUpdateOffice,
  },
}
