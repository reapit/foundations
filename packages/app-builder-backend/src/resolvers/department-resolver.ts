import { gql } from 'apollo-server-core'
import { Authorized, Ctx, Query, Resolver } from 'type-graphql'

import { query } from '../utils/graphql-fetch'
import { Context } from '../types'
import { Department, DepartmentFragment } from '../entities/department'
import { DepartmentModelPagedResult } from '@reapit/foundations-ts-definitions/types'

const getDepartmentsQuery = gql`
  ${DepartmentFragment}

  query GetDepartments {
    GetDepartments {
      _embedded {
        ...DepartmentFragment
      }
    }
  }
`
const getDepartments = async (accessToken: string, idToken: string): Promise<Department[]> => {
  const departments = await query<DepartmentModelPagedResult>(getDepartmentsQuery, {}, 'GetDepartments', {
    accessToken,
    idToken,
  })

  return (departments._embedded as Department[]) || []
}

@Resolver(() => Department)
export class DepartmentResolver {
  @Authorized()
  @Query(() => [Department])
  async listDepartments(@Ctx() { accessToken, idToken }: Context): Promise<Department[]> {
    const departments = await getDepartments(accessToken, idToken)
    return departments
  }
}
