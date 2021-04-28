import React from 'react'
import { OfficeGroupModel, OfficeGroupModelPagedResult } from '../../../types/organisations-schema'
import { Pagination, Table, FadeIn, Helper } from '@reapit/elements'
import { OfficeModel } from '@reapit/foundations-ts-definitions'
import useSWR from 'swr'
import { URLS } from '../../../constants/api'

export const mergeOfficesGroups = (officeModels: OfficeModel[], officeGroupModels: OfficeGroupModel[]) =>
  officeGroupModels.map((group) => {
    const groupIds = group.officeIds?.split(',')
    if (groupIds?.length) {
      const officeModelsMatched = groupIds
        .map((groupId) => officeModels.find((office) => office.id === groupId))
        .filter((office) => !!office)
      return {
        ...group,
        offices: officeModelsMatched,
      }
    }
  })

export const getOfficeQueryFromGroups = (officeGroupModels?: OfficeGroupModel[]) => {
  if (!officeGroupModels) return null
  const officeIds = officeGroupModels
    ?.map((group) => {
      const ids = group?.officeIds?.split(',')
      if (ids?.length) return ids
    })
    .flat()
  return officeIds?.reduce((query, id, index) => {
    return `${query}${index ? '&id' : 'id'}=${id}`
  }, '?')
}

export const OfficeGroupsContent: React.FC<{
  officeGroups: OfficeGroupModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ officeGroups, columns, onPageChange }) => {
  const { _embedded: officeGroupModels, totalCount, pageSize, pageNumber = 1 } = officeGroups

  const officeIdsQuery = getOfficeQueryFromGroups(officeGroupModels)

  const { data: offices } = useSWR<OfficeGroupModelPagedResult>(
    !officeIdsQuery ? null : `${URLS.OFFICES}/${officeIdsQuery ? officeIdsQuery + '&pageSize=999' : '?pageSize=999'}`,
  )

  const officeModels = offices?._embedded?.length ? offices._embedded : []

  const groupsWithOffices =
    officeModels.length && officeGroupModels?.length
      ? mergeOfficesGroups(officeModels, officeGroupModels)
      : officeGroupModels

  return (
    <>
      <FadeIn>
        {!groupsWithOffices?.length ? (
          <Helper variant="info">No Results</Helper>
        ) : (
          <Table expandable scrollable={true} data={groupsWithOffices || []} columns={columns} />
        )}
      </FadeIn>
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}
