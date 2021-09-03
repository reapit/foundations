import { nodesObjtoToArr } from '@/components/hooks/apps/node-helpers'
import { useApp } from '@/components/hooks/apps/use-app'
import { useUpdatePage } from '@/components/hooks/apps/use-update-app'
import { usePageId } from '@/core/usePageId'
import { cx } from '@linaria/core'
import { Button, elFlex, elFlex1, elFlexAlignCenter, elFlexJustifyStart, elM1, Select } from '@reapit/elements'
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

export const PageSelector = ({ pageId, onChange }: { pageId?: string; onChange: (id: string) => void }) => {
  const { appId } = usePageId()
  const { app } = useApp(appId)
  const pages = app?.pages || []
  const { updatePage } = useUpdatePage()

  return (
    <div className={cx(elFlex1, elFlex, elFlexAlignCenter, elFlexJustifyStart)}>
      <Select
        style={{ maxWidth: 150 }}
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
      </Select>
      <Button
        style={{ zoom: 0.78 }}
        className={elM1}
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
        New
      </Button>
    </div>
  )
}
