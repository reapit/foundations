import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container, { ContainerProps } from './container'
import { Loader, Table as ELTable } from '@reapit/elements'
import { useTypeList } from '@/components/hooks/objects/use-type-list'
import { useObjectList } from '@/components/hooks/objects/use-object.list'
import { notEmpty } from '@/components/hooks/use-introspection/helpers'

const defaultProps = {
  destination: '/',
}

interface TableProps extends ContainerProps {
  typeName?: string
}

const ObjectTableCell = ({ __typename }: any) => {
  return <span>{__typename} embedded object</span>
}

const Table = ({ typeName, ...props }: TableProps) => {
  const { data, loading } = useObjectList(typeName)
  const rows =
    data &&
    data.map((row) => ({
      cells: Object.entries(row)
        .map(([label, value]) => ({
          label,
          value: typeof value === 'object' ? undefined : value,
          children: typeof value === 'object' ? <ObjectTableCell {...value} /> : undefined,
          narrowTable: {
            showLabel: true,
          },
        }))
        .filter((cell) => {
          return !cell.label.startsWith('__')
        }),
    }))

  return (
    <Container {...props}>
      <ELTable rows={rows}>{loading && <Loader label="Loading" />}</ELTable>
    </Container>
  )
}

const ContainerSettings = Container.craft.related.toolbar

const TableSettings = () => {
  const { data } = useTypeList()

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
          <option value="">Select a page</option>
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
