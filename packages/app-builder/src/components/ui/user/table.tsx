import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import { useTypeList } from '@/components/hooks/objects/use-type-list'
import Container from './container'
import { useEditor, useNode } from '@craftjs/core'
import { DestinationPage } from './link'
import { TableProps, Table as ETable } from './ejectable/table'
import { useSubObjects } from '@/components/hooks/objects/use-sub-objects'
import { useObjectSpecials } from '@/components/hooks/objects/use-object-specials'

const defaultProps = {}

const Table = (props: TableProps) => {
  const { isEditing } = useEditor((state) => ({
    isEditing: state.options.enabled,
  }))
  const {
    connectors: { connect, drag },
  } = useNode()

  return <ETable {...props} ref={(ref) => ref && connect(drag(ref))} disabled={isEditing} />
}

const ContainerSettings = Container.craft.related.toolbar

const TableSettings = () => {
  const { data, loading } = useTypeList()
  const { typeName } = useNode((node) => node.data.props)
  const subobjects = useSubObjects(typeName)
  const { specials } = useObjectSpecials(typeName)

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
      {subobjects.data.map((subobject) => (
        <DestinationPage
          sectionTitle={`${subobject.object.name} page`}
          propKey={`${subobject.object.name}Page`}
          key={subobject.object.name}
          title={`${subobject.object.name} page`}
        />
      ))}
      {specials.map((special) => (
        <DestinationPage
          sectionTitle={`${special.name} page`}
          propKey={`${special.name}Page`}
          key={special.name}
          title={`${special.name} page`}
        />
      ))}
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
