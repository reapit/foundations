import React, { forwardRef } from 'react'
import { Button, Loader, Table as ELTable, useSnack } from '@reapit/elements'
import { useHistory } from 'react-router'

import { Container, ContainerProps } from './container'
import { uppercaseSentence } from './utils'

import { useObjectList } from '../../../hooks/objects/use-object-list'
import { useObjectDelete } from '../../../hooks/objects/use-object-mutate'

export interface TableProps extends ContainerProps {
  typeName?: string
  editPageId?: string
  showControls?: string
}

const ObjectTableCell = ({ firstName, lastName }: any) => {
  return (
    <span>
      {firstName} {lastName}
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

export const Table = forwardRef<HTMLDivElement, TableProps & { disabled?: boolean }>(
  ({ typeName, editPageId, showControls, disabled, ...props }, ref) => {
    const { data, loading } = useObjectList(typeName)
    const history = useHistory()
    const rows =
      data &&
      typeName &&
      data.map((row) => {
        const cells = Object.entries(row)
          .map(([label, value]) => ({
            label: uppercaseSentence(label),
            value: typeof value === 'object' ? undefined : value,
            children: typeof value === 'object' ? <ObjectTableCell {...value} /> : undefined,
            narrowTable: {
              showLabel: true,
            },
          }))
          .filter((cell) => {
            return !cell.label.startsWith('__') && cell.label.toLowerCase() !== 'id'
          })

        if (!showControls) {
          return { cells }
        }

        return {
          cells: [
            ...cells,
            {
              label: 'Edit',
              children: (
                <Button
                  disabled={disabled}
                  intent="secondary"
                  onClick={() => {
                    if (editPageId) {
                      history.push(`${editPageId}?editObjectId=${row.id}`)
                    }
                  }}
                >
                  Edit
                </Button>
              ),
            },
            {
              label: 'Delete',
              children: <DeleteButton disabled={disabled} id={row.id} typeName={typeName} />,
            },
          ],
        }
      })

    return (
      <Container {...props} ref={ref}>
        {loading && <Loader label="Loading" />}
        {typeName && <ELTable style={{ flex: 1 }} rows={rows} />}
        {!loading && !typeName && <div>No type selected</div>}
      </Container>
    )
  },
)
