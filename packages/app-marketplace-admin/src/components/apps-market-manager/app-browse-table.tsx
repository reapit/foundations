import { ReapitConnectSession } from '@reapit/connect-session'
import {
  Button,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  TableRowContainer,
  Title,
} from '@reapit/elements'
import { AppsBrowseConfigEnum, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitUpdate } from '@reapit/utils-react'
import React, { FC } from 'react'
import { colorSquare } from './app-browse.styles'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { shleemy } from 'shleemy'

export const AppBrowseTable: FC<{
  type: AppsBrowseConfigEnum
  items: AppsBrowseConfigItemInterface[]
  setEditType: () => void
  setSelectedItem: (item?: AppsBrowseConfigItemInterface) => void
  deleteItem: (type: AppsBrowseConfigEnum, id: string) => void
  connectSession: ReapitConnectSession
}> = ({ type, items, setEditType, setSelectedItem, connectSession, deleteItem, ...rest }) => (
  <div {...rest}>
    <Title>{type}</Title>
    <Table>
      <TableHeadersRow>
        <TableHeader>Title</TableHeader>
        <TableHeader>BrandColor</TableHeader>
        <TableHeader>Apps</TableHeader>
        <TableHeader>Live</TableHeader>
        <TableHeader></TableHeader>
      </TableHeadersRow>
      {items.map((item) => {
        const [deleteLoading, , send] = useReapitUpdate({
          action: getActions(window.reapit.config.appEnv)[GetActionNames.postAppMarketAdmin],
          reapitConnectBrowserSession,
          method: 'DELETE',
          uriParams: {
            id: item.id,
          },
          headers: {
            Authorization: connectSession?.idToken as string,
          },
        })

        return (
          <TableRowContainer key={JSON.stringify(item)}>
            <TableRow>
              <TableCell>{item.content?.title}</TableCell>
              <TableCell>
                {item.content?.brandColour && (
                  <span className={colorSquare} style={{ background: item.content?.brandColour }}></span>
                )}
                {item.content?.brandColour}
              </TableCell>
              <TableCell>{item.filters?.id?.length}</TableCell>
              <TableCell>
                {item.live.isLive
                  ? 'Live'
                  : item.live.timeFrom && new Date(item.live.timeFrom).getTime() > new Date().getTime()
                  ? `going live ${shleemy(item.live.timeFrom).forHumans}`
                  : item.live.timeTo && new Date(item.live.timeTo).getTime() > new Date().getTime()
                  ? `Completing ${shleemy(item.live.timeTo).forHumans}`
                  : 'Not Live'}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setSelectedItem(item)
                  }}
                >
                  Edit
                </Button>
                <Button
                  intent="danger"
                  onClick={async () => {
                    await send(item)
                    deleteItem(item.configType, item.id as string)
                  }}
                  disabled={deleteLoading}
                  loading={deleteLoading}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableRowContainer>
        )
      })}
    </Table>
    <br />
    <Button intent="primary" onClick={setEditType}>
      Add
    </Button>
  </div>
)
