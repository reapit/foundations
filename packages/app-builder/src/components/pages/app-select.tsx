import { reapitConnectBrowserSession } from '@/core/connect-session'
import { cx } from '@linaria/core'
import {
  Loader,
  CardMainWrap,
  CardHeadingWrap,
  CardSubHeading,
  Button,
  CardWrap,
  elFlex,
  elFlex1,
  elFlexAlignCenter,
  elFlexJustifyCenter,
  elFlexColumn,
  elMb10,
  Icon,
  useSnack,
  elMr6,
  Title,
  elFlexRow,
  elFlexJustifyStart,
  elFlexAlignStart,
  elP6,
  elFlexWrap,
  elMb6,
  CardHeading,
  CardListMainWrap,
  CardListItem,
  elFlexJustifyEnd,
  elMt12,
  elMl4,
} from '@reapit/elements'
import React from 'react'
import { useHistory } from 'react-router'
import formatDistance from 'date-fns/formatDistance'

import { useCreateApp } from '../hooks/apps/use-create-app'
import { useGetUserApps } from '../hooks/apps/use-user-apps'
import { ejectUri } from '@/core/config'

const getUserId = async () => {
  const session = await reapitConnectBrowserSession.connectSession()
  const userId = session?.loginIdentity.orgId
  return userId || undefined
}

export const useUserId = () => {
  const [userId, setUserId] = React.useState<string | undefined>(undefined)
  React.useEffect(() => {
    getUserId().then(setUserId)
  }, [])
  return userId
}

const CreateNew = ({ className }: { className?: string }) => {
  const { createApp, loading } = useCreateApp()
  const { success, error } = useSnack()
  const userId = useUserId()
  const history = useHistory()

  return (
    <Button
      className={className}
      loading={loading}
      onClick={() => {
        const name = window.prompt('Enter a name for your app')
        if (!name) return
        createApp({
          variables: {
            name,
            userId,
          },
        })
          .then(
            ({
              data: {
                _createApp: { id },
              },
            }) => {
              success('App created successfully')
              history.push(id)
            },
          )
          .catch(() => {
            error('Failed to create app')
          })
      }}
    >
      Create New
    </Button>
  )
}

const AppSelector = () => {
  const userId = useUserId()
  const { loading, error, data } = useGetUserApps(userId)
  const history = useHistory()
  if (error) return <div>Error</div>

  return (
    <div className={elP6} style={{ width: 'calc(100vw - 80px)' }}>
      <Title className={cx(elFlexAlignCenter, elFlex)}>
        My Apps {!!data?.length && <CreateNew className={elMl4} />}
      </Title>
      <div className={cx(elFlex, elFlex1, elFlexRow, elFlexJustifyStart, elFlexAlignStart, elFlexWrap)}>
        {!data?.length && (
          <div
            className={cx(elFlex, elFlex1, elFlexAlignCenter, elFlexJustifyCenter, elFlexColumn)}
            style={{ width: 'calc(100vw - 80px)' }}
          >
            {loading && <Loader className={elMt12} />}
            {!loading && (
              <>
                <Icon icon="welcomeAnimated1" iconSize="largest" className={elMb10} />
                <div className={elMb10}>No Apps Yet!</div>
                <CardWrap>
                  <CreateNew />
                </CardWrap>
              </>
            )}
          </div>
        )}
        {data?.map((app) => (
          <CardWrap key={app.id} className={cx(elMr6, elMb6)}>
            <CardMainWrap>
              <CardHeadingWrap>
                <CardHeading>{app.name}</CardHeading>
                <CardSubHeading>
                  Last Updated: {formatDistance(new Date(app.updatedAt), new Date(), { addSuffix: true })}
                </CardSubHeading>
              </CardHeadingWrap>
            </CardMainWrap>
            <CardListMainWrap className={cx(elFlexJustifyEnd)}>
              <CardListItem>
                <Button
                  intent="primary"
                  onClick={() => {
                    history.push(app.id)
                  }}
                >
                  Edit
                </Button>
                <Button
                  intent="secondary"
                  onClick={() => {
                    window.open(`${ejectUri}eject/${app.id}`)
                  }}
                >
                  Eject
                </Button>
              </CardListItem>
            </CardListMainWrap>
          </CardWrap>
        ))}
      </div>
    </div>
  )
}

export default AppSelector
