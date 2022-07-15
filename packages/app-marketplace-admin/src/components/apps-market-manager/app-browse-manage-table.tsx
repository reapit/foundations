import { ReapitConnectSession } from '@reapit/connect-session'
import { Button, ButtonGroup, Table, Title } from '@reapit/elements'
import { AppsBrowseConfigEnum, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitUpdate } from '@reapit/utils-react'
import React, { FC, useState } from 'react'
import { colorSquare } from './app-browse.styles'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { shleemy } from 'shleemy'

export const AppBrowseManageTable: FC<{
  type: AppsBrowseConfigEnum
  items: AppsBrowseConfigItemInterface[]
  setEditType: () => void
  setSelectedItem: (item?: AppsBrowseConfigItemInterface) => void
  deleteItem: (type: AppsBrowseConfigEnum, id: string) => void
  connectSession: ReapitConnectSession
}> = ({ type, items, setEditType, setSelectedItem, connectSession, deleteItem, ...rest }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const [deleteLoading, , send] = useReapitUpdate<AppsBrowseConfigItemInterface, AppsBrowseConfigItemInterface>({
    action: getActions(window.reapit.config.appEnv)[GetActionNames.postAppMarketAdmin],
    reapitConnectBrowserSession,
    method: 'DELETE',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  return (
    <div {...rest}>
      <Title>{type}</Title>
      <Table
        indexExpandedRow={expandedIndex}
        setIndexExpandedRow={setExpandedIndex}
        rows={items.map((item) => ({
          cells: [
            {
              label: 'Title',
              value: item.content?.title,
            },
            {
              label: 'Brand Colour',
              value: item.content?.brandColour,
              children: (
                <>
                  {item.content?.brandColour && (
                    <span className={colorSquare} style={{ background: item.content?.brandColour }}></span>
                  )}
                  {item.content?.brandColour}
                </>
              ),
            },
            {
              label: 'Apps',
              value: item.filters?.id?.length || 0,
            },
            {
              label: 'Categories',
              value: item.filters?.category?.join(', '),
            },
            {
              label: 'Live',
              value: item.live.isLive,
              children: (
                <>
                  {item.live.isLive
                    ? 'Live'
                    : item.live.timeFrom && new Date(item.live.timeFrom).getTime() > new Date().getTime()
                    ? `going live ${shleemy(item.live.timeFrom).forHumans}`
                    : item.live.timeTo && new Date(item.live.timeTo).getTime() > new Date().getTime()
                    ? `Completing ${shleemy(item.live.timeTo).forHumans}`
                    : 'Not Live'}
                </>
              ),
            },
          ],
          expandableContent: {
            content: (
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setSelectedItem(item)
                  }}
                  intent="secondary"
                >
                  Edit
                </Button>
                <Button
                  intent="danger"
                  onClick={async () => {
                    await send(item, {
                      uriParams: {
                        id: item.id,
                      },
                    })
                    deleteItem(item.configType, item.id as string)
                  }}
                  disabled={deleteLoading}
                  loading={deleteLoading}
                >
                  Delete
                </Button>
              </ButtonGroup>
            ),
          },
        }))}
        numberColumns={6}
      />
      <br />
      <Button intent="primary" onClick={setEditType}>
        Add
      </Button>
    </div>
  )
}
