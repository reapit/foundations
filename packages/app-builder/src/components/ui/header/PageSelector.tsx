import { cx } from '@linaria/core'
import { Button, elFlex, elFlex1, elFlexAlignCenter, elFlexJustifyStart, elM1, Select } from '@reapit/elements'
import React from 'react'

import { newPage, usePages } from './saveState'

export const PageSelector = ({ pageId, onChange }: { pageId?: string; onChange: (id: string) => void }) => {
  const pages = usePages()

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
          onChange(page.id)
        }}
      >
        New
      </Button>
    </div>
  )
}
