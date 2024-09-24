import { gql } from 'apollo-server-core'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'

import { query } from '../utils/graphql-fetch'
import { Context } from '../types'
import { Department, DepartmentFragment } from '../entities/department'
import { DepartmentModel, DepartmentModelPagedResult } from '@reapit/foundations-ts-definitions'

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
const getDepartmentQuery = gql`
  ${DepartmentFragment}

  query GetDepartmentById($id: String!) {
    GetDepartmentById(id: $id) {
      ...DepartmentFragment
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

const getDepartment = async (accessToken: string, idToken: string, id: string): Promise<Department | undefined> => {
  const department = await query<DepartmentModel>(getDepartmentQuery, { id }, 'GetDepartmentById', {
    accessToken,
    idToken,
  })

  return department as Department
}

@Resolver(() => Department)
export class DepartmentResolver {
  @Authorized()
  @Query(() => [Department])
  async listDepartments(@Ctx() { accessToken, idToken }: Context): Promise<Department[]> {
    const departments = await getDepartments(accessToken, idToken)
    return departments
  }

  @Authorized()
  @Query(() => Department)
  async getDepartment(
    @Ctx() { accessToken, idToken }: Context,
    @Arg('id') id: string,
  ): Promise<Department | undefined> {
    const department = await getDepartment(accessToken, idToken, id)
    return department
  }
}
