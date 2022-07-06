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

const isValidNode = (node: any) => {
  if (!node.id) {
    console.log('node is invalid', node)
  }
  return !!node.id
}

export const PageSelector = () => {
  const { appId, pageId, setPageId } = usePageId()
  const { app } = useApp(appId)
  const pages = app?.pages || []
  const { updatePage } = useUpdatePage(appId)
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
          if (!app) {
            return
          }
          updatePage(newPage, { header: app.header, footer: app.footer })
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
          if (!app) {
            return
          }
          const pageName = prompt('Page name?')
          if (!pageName) {
            return
          }
          const page = newPage(pageName)
          updatePage(
            {
              ...page,
              nodes: nodesObjtoToArr(appId, page.id, page.nodes).filter(isValidNode),
            },
            { header: app.header, footer: app.footer },
          ).then(() => {
            setTimeout(() => {
              setPageId(page.id)
            }, 300)
          })
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
