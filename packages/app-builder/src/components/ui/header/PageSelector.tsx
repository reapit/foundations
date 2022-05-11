import { nodesObjtoToArr } from '@/components/hooks/apps/node-helpers'
import { useApp } from '@/components/hooks/apps/use-app'
import { useDeletePage, useUpdatePage } from '@/components/hooks/apps/use-update-app'
import { usePageId } from '@/components/hooks/use-page-id'
import Delete from '@/components/icons/delete'
import Plus from '@/components/icons/plus'
import { cx } from '@linaria/core'
import { styled } from '@linaria/react'
import { Button, elFlex, elFlex1, elFlexAlignCenter, elFlexJustifyStart, elM2, Select } from '@reapit/elements'
import React from 'react'
import slugify from 'slugify'
import { emptyState } from '../../hooks/apps/emptyState'

export const newPage = (name: string) => {
  const page = {
    id: slugify(name),
    name,
    nodes: emptyState,
  }
  return page
}

const AppBuilderSelect = styled(Select)`
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  max-width: 297px;
  margin-right: 4px;

  &:focus {
    border-bottom-color: #e3e3e3;
  }
`

export const AppBuilderIconButton = styled(Button)`
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  margin-left: 4px;
  margin-right: 4px;
  border: none;
  border-radius: 4px;

  svg {
    fill: white;
  }

  background: ${({ intent }) => {
    if (intent === 'primary') {
      return '#23A4DE'
    }

    return '#f2f2f2'
  }};
`

export const PageSelector = ({ pageId, onChange }: { pageId?: string; onChange: (id: string) => void }) => {
  const { appId, setPageId } = usePageId()
  const { app } = useApp(appId)
  const pages = app?.pages || []
  const { updatePage } = useUpdatePage()
  const { deletePage, loading } = useDeletePage()

  return (
    <div className={cx(elFlex1, elFlex, elFlexAlignCenter, elFlexJustifyStart)}>
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
