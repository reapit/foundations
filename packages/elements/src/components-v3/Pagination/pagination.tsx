import { cx } from 'linaria'
import React, { FC, HTMLAttributes } from 'react'
import { Icon } from '../Icon'
import { ElPaginationButton, elPaginationPrimary, ElPaginationText, ElPaginationWrap } from './__styles__'

export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
  callback: (nextPage: number) => void
  currentPage: number
  numberPages: number
}

export interface PaginationWrapProps extends HTMLAttributes<HTMLDivElement> {}

export interface PaginationTextProps extends HTMLAttributes<HTMLDivElement> {}

export interface PaginationButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const handlePageChange = (nextPage: number | null, callback: (page: number) => void) => () => {
  if (nextPage) {
    callback(nextPage)
  }
}

export const PaginationWrap: FC<PaginationWrapProps> = ({ children, ...rest }) => (
  <ElPaginationWrap {...rest}>{children}</ElPaginationWrap>
)

export const PaginationText: FC<PaginationTextProps> = ({ children, ...rest }) => (
  <ElPaginationText {...rest}>{children}</ElPaginationText>
)

export const PaginationButton: FC<PaginationButtonProps> = ({ children, ...rest }) => (
  <ElPaginationButton {...rest}>{children}</ElPaginationButton>
)

export const Pagination: FC<PaginationProps> = ({ callback, currentPage, numberPages, ...rest }) => {
  const nextPage = currentPage < numberPages ? currentPage + 1 : null
  const prevPage = currentPage > 1 ? currentPage - 1 : null
  return (
    <PaginationWrap {...rest}>
      <PaginationText>
        <strong>{currentPage}</strong> of {numberPages}
      </PaginationText>
      <PaginationButton onClick={handlePageChange(prevPage, callback)}>
        <Icon icon="solidBack" className={cx(prevPage && elPaginationPrimary)} />
      </PaginationButton>
      <PaginationButton onClick={handlePageChange(nextPage, callback)}>
        <Icon icon="solidNext" className={cx(nextPage && elPaginationPrimary)} />
      </PaginationButton>
    </PaginationWrap>
  )
}
