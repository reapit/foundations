import qs from 'query-string'
import {
  CreateApplicantArgs,
  GetApplicantsArgs,
  GetApplicantsReturn,
  CreateApplicantReturn,
  GetApplicantByIdArgs,
  GetApplicantByIdReturn,
  UpdateApplicantArgs,
  UpdateApplicantReturn,
  GetApplicantRelationshipsArgs,
  GetApplicantRelationshipsReturn,
  CreateApplicantRelationshipReturn,
  CreateApplicantRelationshipArgs,
  GetApplicantRelationshipsByIdArgs,
  GetApplicantRelationshipsByIdReturn,
  DeleteApplicantRelationshipArgs,
  DeleteApplicantRelationshipReturn,
} from './applicants'
import errors from '../../errors'

import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { ServerContext } from '../../utils'
import { URLS } from '../../constants/api'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetApplicantByIdAPI = async (
  args: GetApplicantByIdArgs,
  context: ServerContext,
): GetApplicantByIdReturn => {
  const traceId = context.traceId
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetApplicantByIdReturn>(
      `${URLS.applicants}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetApplicantByIdAPI' })
    return handleErrorResult
  }
}

export const callGetApplicantsAPI = async (args: GetApplicantsArgs, context: ServerContext): GetApplicantsReturn => {
  const traceId = context.traceId
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetApplicantsReturn>(`${URLS.applicants}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetApplicantsAPI' })
    return handleErrorResult
  }
}

export const callCreateApplicantAPI = async (
  args: CreateApplicantArgs,
  context: ServerContext,
): CreateApplicantReturn => {
  const traceId = context.traceId
  try {
    const response = await createPlatformAxiosInstance().post<CreateApplicantReturn>(URLS.applicants, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetApplicantByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateApplicantAPI' })
    return handleErrorResult
  }
}

export const callUpdateApplicantAPI = async (
  args: UpdateApplicantArgs,
  context: ServerContext,
): UpdateApplicantReturn => {
  const traceId = context.traceId
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateApplicantReturn>(
      `${URLS.applicants}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetApplicantByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateApplicantAPI' })
    return handleErrorResult
  }
}

export const callGetApplicantRelationshipByIdAPI = async (
  args: GetApplicantRelationshipsByIdArgs,
  context: ServerContext,
): GetApplicantRelationshipsByIdReturn => {
  const traceId = context.traceId
  try {
    const response = await createPlatformAxiosInstance().get<GetApplicantRelationshipsByIdReturn>(
      `${URLS.applicants}/${args.id}/relationships/${args.relationshipId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetApplicantRelationshipByIdAPI' })
    return handleErrorResult
  }
}

export const callGetApplicantRelationshipsAPI = async (
  args: GetApplicantRelationshipsArgs,
  context: ServerContext,
): GetApplicantRelationshipsReturn => {
  const traceId = context.traceId
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetApplicantRelationshipsReturn>(
      `${URLS.applicants}/${args.id}/relationships?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetApplicantRelationshipsAPI' })
    return handleErrorResult
  }
}

export const callCreateApplicantRelationshipAPI = async (
  args: CreateApplicantRelationshipArgs,
  context: ServerContext,
): CreateApplicantRelationshipReturn => {
  const traceId = context.traceId
  try {
    const response = await createPlatformAxiosInstance().post<CreateApplicantRelationshipReturn>(
      `${URLS.applicants}/${args.id}/relationships`,
      args,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    const relationshipId = getIdFromCreateHeaders({ headers: response.headers })
    if (relationshipId) {
      return callGetApplicantRelationshipByIdAPI({ id: args.id, relationshipId }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateApplicantRelationshipsAPI' })
    return handleErrorResult
  }
}

export const callDeleteApplicantRelationshipAPI = async (
  args: DeleteApplicantRelationshipArgs,
  context: ServerContext,
): DeleteApplicantRelationshipReturn => {
  const traceId = context.traceId
  try {
    const response = await createPlatformAxiosInstance().delete<DeleteApplicantRelationshipReturn>(
      `${URLS.applicants}/${args.id}/relationships/${args.relationshipId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    if (response.status === 204) {
      return args.relationshipId
    }
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callDeleteApplicantRelationshipsByIdAPI' })
    return handleErrorResult
  }
}
