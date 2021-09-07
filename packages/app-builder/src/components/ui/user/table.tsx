import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import { useTypeList } from '@/components/hooks/objects/use-type-list'
import Container from './container'
import { useEditor } from '@craftjs/core'
import { DestinationPage } from './link'
import { TableProps, Table as ETable } from './ejectable/table'

const defaultProps = {
  destination: '/',
}

const Table = (props: TableProps) => {
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }))

  return <ETable {...props} disabled={isEditing} />
}

const ContainerSettings = Container.craft.related.toolbar

const TableSettings = () => {
  const { data, loading } = useTypeList()

  return (
    <>
      <ContainerSettings />
      <ToolbarSection
        title="Type Name"
        props={['typeName']}
        summary={({ typeName }: any) => {
          return `Table of ${typeName || ''}${typeName ? 's' : ''}`
        }}
      >
        <ToolbarItem type={ToolbarItemType.Select} propKey="typeName" title="Object Type">
          {(data || []).map((typeName) => (
            <option key={typeName} value={typeName}>
              {typeName}
            </option>
          ))}
          <option value="" disabled>
            {loading ? 'Loading...' : 'Select a Type'}
          </option>
        </ToolbarItem>
      </ToolbarSection>
      <DestinationPage sectionTitle="Edit Page" propKey="editPageId" title="Edit Page" />
      <ToolbarSection
        title="Controls"
        props={['showControls']}
        summary={({ showControls }: any) => {
          return `${showControls ? 'Show' : 'Hide'} Controls`
        }}
      >
        <ToolbarItem type={ToolbarItemType.Select} propKey="showControls" title="Show Controls?">
          <option value="true">Yes</option>
          <option value="">No</option>
        </ToolbarItem>
      </ToolbarSection>
    </>
  )
}

Table.craft = {
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: TableSettings,
  },
}

export default Table
