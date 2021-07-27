import { Select } from '@reapit/elements'
import React from 'react'
import { getPages } from './saveState'

export const PageSelector = ({ pageId, onChange }: { pageId?: string; onChange: (id: string) => void }) => (
  <div>
    <Select id="page_selector" name="page_selector" value={pageId} onChange={(value) => onChange(value.toString())}>
      {getPages()
        .map((p) => ({ value: p.id, label: p.name }))
        .map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
    </Select>
  </div>
)
