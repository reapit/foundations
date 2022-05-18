import { nodesObjtoToArr } from '@/components/hooks/apps/node-helpers'
import { useApp } from '@/components/hooks/apps/use-app'
import { useDeletePage, useUpdatePage } from '@/components/hooks/apps/use-update-app'
import { usePageId } from '@/components/hooks/use-page-id'
import Delete from '@/components/icons/delete'
import Plus from '@/components/icons/plus'
import { cx } from '@linaria/core'
import { elFlex, elFlex1, elFlexAlignCenter, elFlexJustifyStart, elM2 } from '@reapit/elements'
import React from 'react'
import slugify from 'slugify'
import { emptyState } from '../../hooks/apps/emptyState'
import { AppBuilderIconButton, AppBuilderSelect, SelectOrInput } from '../components'

export const newPage = (name: string) => {
  const page = {
    id: slugify(name),
    name,
    nodes: emptyState,
  }
  return page
}

export const PageSelector = ({ pageId, onChange }: { pageId?: string; onChange: (id: string) => void }) => {
  const { appId, setPageId } = usePageId()
  const { app } = useApp(appId)
  const pages = app?.pages || []
  const { updatePage } = useUpdatePage()
  const { deletePage, loading } = useDeletePage()
  const currentPage = pages.find((page) => page.id === pageId)

  return (
    <div className={cx(elFlex1, elFlex, elFlexAlignCenter, elFlexJustifyStart)}>
      <SelectOrInput
        defaultValue={currentPage?.name || ''}
        onInputSubmit={(e) => {
          e.preventDefault()
          const newPage = {
            ...currentPage,
            name: e.currentTarget.value,
          }
          console.log(newPage)
          updatePage(appId, newPage)
        }}
      >
        <AppBuilderSelect
          id="page_selector"
          name="page_selector"
          value={pageId}
          onChange={(e) => {
            onChange(e.target.value)
          }}
        >
          {pages.map(({ id: value, name: label }) => (
            <option key={value} value={value}>
              {label || 'Home'}
            </option>
          ))}
        </AppBuilderSelect>
      </SelectOrInput>
      <AppBuilderIconButton
        className={elM2}
        onClick={() => {
          const pageName = prompt('Page name?')
          if (!pageName) {
            return
          }
          const page = newPage(pageName)
          updatePage(appId, {
            ...page,
            nodes: nodesObjtoToArr(appId, page.id, page.nodes),
          })
          onChange(page.id)
        }}
      >
        <Plus />
      </AppBuilderIconButton>
      <AppBuilderIconButton
        loading={loading}
        onClick={() => {
          if (pageId) {
            deletePage(appId, pageId).then(() => {
              setPageId('')
            })
          }
        }}
      >
        <Delete />
      </AppBuilderIconButton>
    </div>
  )
}
