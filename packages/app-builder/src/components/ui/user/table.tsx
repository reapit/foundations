import React, { useEffect, useState } from 'react'
import { useEditor, useNode } from '@craftjs/core'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container from './container'
import { DestinationPage } from './link'
import { TableProps, Table as ETable } from './ejectable/table'
import { useSubObjects } from '@/components/hooks/objects/use-sub-objects'
import { useObjectSpecials } from '@/components/hooks/objects/use-object-specials'
import { useObjectSearch } from '@/components/hooks/objects/use-object-search'
import { getAvailableIntegrationsForArgs } from '@/core/desktop-integration'
import { useObjectList } from '@/components/hooks/objects/use-object-list'
import { useIntrospection } from '@/components/hooks/use-introspection'
import { CreatePage } from './create-page'
import { TypeList } from './type-list'
import { InputGroup } from '@reapit/elements'
import { useObject } from '@/components/hooks/objects/use-object'

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

const ColumnControls = ({
  availableFields,
  includedFields = [],
  setIncludedFields,
}: {
  availableFields: string[]
  includedFields?: string[]
  setIncludedFields: (fields: string[]) => void
}) => (
  <ToolbarSection
    title="Fields"
    props={['includedFields']}
    summary={() => {
      return `Table with ${(includedFields || []).length} columns`
    }}
  >
    {availableFields.map((field) => (
      <InputGroup
        key={field}
        type="checkbox"
        name={field}
        label={field}
        checked={includedFields.includes(field)}
        onChange={(e) => {
          const { checked } = e.target
          const newFields = checked ? [...includedFields, field] : includedFields.filter((f) => f !== field)
          setIncludedFields(newFields)
        }}
      />
    ))}
  </ToolbarSection>
)
const ContainerSettings = Container.craft.related.toolbar

export const IntegrationLanding = ({ typeName }: { typeName: string | undefined }) => {
  const { args } = useObjectList(typeName)
  const { data } = useIntrospection()
  const integrations = args && data && getAvailableIntegrationsForArgs(args, data)
  const propKey = 'integrationLandingType'

  if (!integrations || !integrations.length) {
    return null
  }

  return (
    <ToolbarSection
      title={'Agency Cloud'}
      props={[propKey]}
      summary={(obj: any) => {
        return `Openable from Agency Cloud: ${obj[propKey] || ''}`
      }}
    >
      <ToolbarItem type={ToolbarItemType.Select} propKey={propKey} title="Openable from Agency Cloud">
        {integrations.map((integrationType) => (
          <option key={integrationType} value={integrationType}>
            {integrationType}
          </option>
        ))}
        <option value="">Select a page</option>
      </ToolbarItem>
    </ToolbarSection>
  )
}

const TableSettings = () => {
  const { typeName, includedFields } = useNode((node) => node.data.props)
  const subobjects = useSubObjects(typeName)
  const { specials } = useObjectSpecials(typeName)
  const { available: searchAvailable } = useObjectSearch(typeName)
  const { object } = useObject(typeName)
  const {
    actions: { setProp },
  } = useNode()

  const [shouldUpdate, setShouldUpdate] = useState(false)

  const sp = (prop: string, value: any) => {
    setProp((props) => {
      props[prop] = value
      return props
    })
  }

  const availableFields = object?.object.fields.map((f) => f.name) || []

  useEffect(() => {
    if (shouldUpdate) {
      setShouldUpdate(false)
      sp('includedFields', availableFields)
    }
  }, [shouldUpdate])

  const updateIn100ms = () => {
    setTimeout(() => {
      setShouldUpdate(true)
    }, 100)
  }

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
        <TypeList onChange={updateIn100ms} />
      </ToolbarSection>
      <DestinationPage
        sectionTitle="Edit Page"
        propKey="editPageId"
        title="Edit Page"
        createControl={
          <CreatePage typeName={typeName} operationType="update" onCreate={(pageId) => sp('editPageId', pageId)} />
        }
      />
      <ColumnControls
        availableFields={availableFields}
        includedFields={includedFields}
        setIncludedFields={(fields: string[]) => sp('includedFields', fields)}
      />
      <IntegrationLanding typeName={typeName} />
      {subobjects.data.map((subobject) => (
        <DestinationPage
          sectionTitle={`${subobject.object.name} page`}
          propKey={`${subobject.object.name}Page`}
          key={subobject.object.name}
          title={`${subobject.object.name} page`}
          createControl={
            <CreatePage
              typeName={subobject.object.name}
              operationType="list"
              onCreate={(pageId) => sp(`${subobject.object.name}Page`, pageId)}
            />
          }
        />
      ))}
      {specials.map((special) => (
        <DestinationPage
          sectionTitle={`${special.name} page`}
          propKey={`${special.name}Page`}
          key={special.name}
          title={`${special.name} page`}
          createControl={
            <CreatePage
              typeName={typeName}
              operationType={special.name}
              onCreate={(pageId) => sp(`${special.name}Page`, pageId)}
            />
          }
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
      {searchAvailable && (
        <ToolbarSection
          title="Search"
          props={['showSearch']}
          summary={({ showSearch }: any) => {
            return `${showSearch ? 'Show' : 'Hide'} Search`
          }}
        >
          <ToolbarItem type={ToolbarItemType.Select} propKey="showSearch" title="Show Search?">
            <option value="true">Yes</option>
            <option value="">No</option>
          </ToolbarItem>
        </ToolbarSection>
      )}
    </>
  )
}

Table.craft = {
  name: 'Table',
  props: {
    ...defaultProps,
    ...Container.craft.props,
  },
  related: {
    toolbar: TableSettings,
  },
}

export default Table
