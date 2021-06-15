import React, { FC } from 'react'
import { ElPaginationButton, ElPaginationText, ElPaginationWrap } from './__styles__'

export const Pagination: FC = () => {
  return (
    <ElPaginationWrap>
      <ElPaginationText></ElPaginationText>
      <ElPaginationButton></ElPaginationButton>
      <ElPaginationButton></ElPaginationButton>
    </ElPaginationWrap>
  )
}
