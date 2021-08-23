import React from 'react'
import { ToolbarItem, ToolbarItemType, ToolbarSection } from '../toolbar'
import Container, { ContainerProps } from './container'
import { Button, Loader, Table as ELTable } from '@reapit/elements'
import { useTypeList } from '@/components/hooks/objects/use-type-list'
import { useObjectList } from '@/components/hooks/objects/use-object-list'

const defaultProps = {
  destination: '/',
}

interface TableProps extends ContainerProps {
  typeName?: string
}

const ObjectTableCell = ({ __typename }: any) => {
  return <span>[{__typename} embedded object]</span>
}

const Table = ({ typeName, ...props }: TableProps) => {
  const { data, loading } = useObjectList(typeName)
  const rows =
    data &&
    data.map((row) => {
      const cells = Object.entries(row)
        .map(([label, value]) => ({
          label,
          value: typeof value === 'object' ? undefined : value,
          children: typeof value === 'object' ? <ObjectTableCell {...value} /> : undefined,
          narrowTable: {
            showLabel: true,
          },
        }))
        .filter((cell) => {
          return !cell.label.startsWith('__') && cell.label !== 'id'
        })

      return {
        cells: [
          ...cells,
          {
            label: 'edit',
            children: <Button intent="secondary">Edit</Button>,
          },
          {
            label: 'delete',
            children: <Button intent="danger">Delete</Button>,
          },
        ],
      }
    })

  return (
    <Container {...props}>
      {loading && <Loader label="Loading" />}
      {typeName && <ELTable style={{ flex: 1 }} rows={rows} />}
      {!loading && !typeName && <div>No type selected</div>}
    </Container>
  )
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
