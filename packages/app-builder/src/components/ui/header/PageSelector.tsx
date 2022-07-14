import { useAppPages } from '@/components/hooks/apps/use-app'
import { useCreatePage, useDeletePage, useUpdatePageName } from '@/components/hooks/apps/use-update-app'
import { usePageId } from '@/components/hooks/use-page-id'
import Delete from '@/components/icons/delete'
import Plus from '@/components/icons/plus'
import { cx } from '@linaria/core'
import { elFlex, elFlex1, elFlexAlignCenter, elFlexJustifyStart, elM2 } from '@reapit/elements'
import React from 'react'
import { AppBuilderIconButton, AppBuilderSelect, SelectOrInput } from '../components'

export const PageSelector = () => {
  const { appId, pageId, setPageId } = usePageId()
  const { pages } = useAppPages(appId)
  const { updatePageName } = useUpdatePageName(appId, pageId)
  const { deletePage, loading } = useDeletePage(appId)
  const { createPage, loading: createPageLoading } = useCreatePage(appId)
  const currentPage = pages?.find((page) => page.id === pageId)

  return (
    <div className={cx(elFlex1, elFlex, elFlexAlignCenter, elFlexJustifyStart)}>
      <SelectOrInput
        defaultValue={currentPage?.name || ''}
        onInputSubmit={(e) => {
          e.preventDefault()
          if (!currentPage) {
            return
          }
          const name = e.currentTarget.value
          updatePageName(name)
        }}
      >
        <AppBuilderSelect
          id="page_selector"
          name="page_selector"
          value={pageId}
          onChange={(e) => {
            setPageId(e.target.value)
          }}
        >
          {pages?.map(({ id: value, name: label }) => (
            <option key={value} value={value}>
              {label || 'Home'}
            </option>
          ))}
        </AppBuilderSelect>
      </SelectOrInput>
      <AppBuilderIconButton
        loading={createPageLoading}
        className={elM2}
        onClick={async () => {
          const pageName = prompt('Page name?')
          if (!pageName) {
            return
          }
          const newApp = await createPage(pageName)
          const page = newApp.pages.find((page) => page.name === pageName)
          if (!page) {
            return
          }
          setPageId(page.id)
        }}
      >
        <Plus />
      </AppBuilderIconButton>
      <AppBuilderIconButton
        loading={loading}
        onClick={() => {
          if (pageId) {
            deletePage(pageId).then(() => {
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
