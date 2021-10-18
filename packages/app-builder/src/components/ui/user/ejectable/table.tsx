import React, { forwardRef } from 'react'
import { Button, elFlex, elFlex1, elFlexColumn, Input, Loader, Table as ELTable, useSnack } from '@reapit/elements'
import { useHistory } from 'react-router'
import qs from 'query-string'
import path from 'path'
import { cx } from '@linaria/core'

import { Container, ContainerProps } from './container'
import { uppercaseSentence } from './utils'

import { useObjectList } from '../../../hooks/objects/use-object-list'
import { useObjectSearch } from '../../../hooks/objects/use-object-search'
import { useObjectDelete, useObjectUpdate } from '../../../hooks/objects/use-object-mutate'
import { lowercaseFirstLetter, useSubObjects } from '../../../../components/hooks/objects/use-sub-objects'
import { notEmpty } from '../../../../components/hooks/use-introspection/helpers'
import { usePageId } from '../../../../components/hooks/use-page-id'
import { useObjectSpecials } from '../../../../components/hooks/objects/use-object-specials'

export interface TableProps extends ContainerProps {
  typeName?: string
  editPageId?: string
  showControls?: string
  showSearch?: string
  [key: string]: any
}

const ObjectTableCell = ({ obj }) => {
  if (!obj) {
    return null
  }
  if (Array.isArray(obj)) {
    return (
      <>
        {obj.map((item: any, i: number) => (
          <>
            <ObjectTableCell key={item.id} obj={item} />
            {i !== obj.length - 1 && <span>, </span>}
          </>
        ))}
      </>
    )
  }
  if (typeof obj !== 'object') {
    return obj
  }
  return (
    <span>
      {Object.entries(obj)
        .filter(([key, value]) => !key.startsWith('_') && typeof value !== 'object' && key !== 'id')
        .map((kv) => kv[1])
        .join(' ')}
    </span>
  )
}

const DeleteButton = ({ disabled, typeName, id }: { disabled?: boolean; typeName: string; id: string | number }) => {
  const { mutateFunction, loading } = useObjectDelete(typeName)
  const { error, success } = useSnack()
  return (
    <Button
      disabled={disabled}
      loading={loading}
      intent="danger"
      onClick={(e) => {
        e.preventDefault()
        mutateFunction({ variables: { id } })
          .then(() => {
            success(`Deleted ${typeName}`)
          })
          .catch(() => {
            error(`Failed to delete ${typeName}`)
          })
      }}
    >
      Delete
    </Button>
  )
}

const shouldDisplay = ([key, value]: [string, any | undefined | null], subobjectNames: string[]) => {
  const isHidden = key.startsWith('_')
  const isId = key === 'id'
  const isArray = value && Array.isArray(value)
  const isSubObject = isArray
    ? value.length > 0 && subobjectNames.includes(value[0].__typename)
    : value && notEmpty(value) && subobjectNames.includes(value.__typename)

  return !isHidden && !isId && !isSubObject
}

const getDataCells = (row: any, subobjectNames: string[]) =>
  Object.entries(row)
    .filter((entry) => shouldDisplay(entry, subobjectNames))
    .map(([label, value]) => ({
      label: uppercaseSentence(label),
      value: (typeof value === 'object' ? undefined : value) as string,
      children: typeof value === 'object' ? <ObjectTableCell obj={value} /> : undefined,
      narrowTable: {
        showLabel: true,
      },
    }))

const getAdditionalCells = (
  specialsAndSubobjects: { name: string; label: string }[],
  props: Record<string, any>,
  rowId: string,
  typeName: string,
  context: any,
  historyPush: (dest: string) => void,
  appId?: string,
) =>
  specialsAndSubobjects.map(({ name, label }) => {
    const pageId = props[`${name}Page`]
    if (!pageId) return null
    return {
      label,
      value: '',
      children: (
        <Button
          onClick={() => {
            const pathname = path.join('/', appId || '', pageId === '~' ? '' : pageId)
            const ctx = {
              ...context,
              [lowercaseFirstLetter(`${typeName}Id`)]: rowId,
            }
            historyPush(`${pathname}?${qs.stringify(ctx)}`)
          }}
        >
          {label}
        </Button>
      ),
      narrowTable: {
        showLabel: true,
      },
    }
  })

export const Table = forwardRef<HTMLDivElement, TableProps & { disabled?: boolean }>(
  ({ typeName, editPageId, showControls, disabled, showSearch, ...props }, ref) => {
    const { data: listResults, loading: listLoading } = useObjectList(typeName)
    const { available: deletionAvailable } = useObjectDelete(typeName)
    const { available: updateAvailable } = useObjectUpdate(typeName)
    const subobjects = useSubObjects(typeName)
    const [queryStr, setQueryStr] = React.useState('')
    const {
      available: searchAvailable,
      data: searchResults,
      loading: searchLoading,
    } = useObjectSearch(typeName, queryStr)
    const { specials } = useObjectSpecials(typeName)
    const history = useHistory()
    const { context, appId } = usePageId()
    const loading = listLoading || searchLoading

    const subobjectNames = subobjects.data.map(({ object: { name } }) => name)
    const specialsAndSubobjects = [
      ...specials.map(({ name }) => ({ name, label: uppercaseSentence(name) })),
      ...subobjects.data.map(({ object }) => ({
        name: object.name,
        label: `View ${uppercaseSentence(object.name)}s`,
      })),
    ]

    const data = searchResults || listResults

    const rows =
      data &&
      typeName &&
      data.map((row) => {
        const cells = [
          ...getDataCells(row, subobjectNames),
          ...getAdditionalCells(specialsAndSubobjects, props, row.id, typeName, context, history.push, appId),
        ].filter(notEmpty)

        if (!showControls) {
          return { cells }
        }

        return {
          cells: [
            ...cells,
            updateAvailable
              ? {
                  label: 'Edit',
                  value: '',
                  children: (
                    <Button
                      disabled={disabled}
                      intent="secondary"
                      onClick={() => {
                        if (editPageId) {
                          history.push(`${appId}/${editPageId}?editObjectId=${row.id}`)
                        }
                      }}
                    >
                      Edit
                    </Button>
                  ),
                }
              : undefined,
            deletionAvailable
              ? {
                  label: 'Delete',
                  value: '',
                  children: <DeleteButton disabled={disabled} id={row.id} typeName={typeName} />,
                }
              : undefined,
          ].filter(notEmpty),
        }
      })

    return (
      <Container {...props} ref={ref}>
        <div className={cx(elFlex, elFlex1, elFlexColumn)}>
          {searchAvailable && showSearch && (
            <Input type="text" placeholder="Search" value={queryStr} onChange={(e) => setQueryStr(e.target.value)} />
          )}
          {loading && <Loader label="Loading" />}
          {typeName && (
            <ELTable
              style={{ flex: 1, opacity: searchLoading ? 0.5 : 1, transition: '300ms opacity' }}
              rows={rows || undefined}
            />
          )}
          {!loading && !rows?.length ? (
            <span>{searchAvailable && queryStr ? 'No results found' : 'Nothing found'}</span>
          ) : null}
          {!loading && !typeName && <div>No type selected</div>}
        </div>
      </Container>
    )
  },
)
