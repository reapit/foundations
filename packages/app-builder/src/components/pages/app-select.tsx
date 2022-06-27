import { getReapitConnectBrowserSession } from '@/core/connect-session'
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
import { useEjectApp } from '../hooks/apps/use-eject-app'
import { GraphQLError } from 'graphql'

const getDeveloperId = async () => {
  const session = await getReapitConnectBrowserSession(window.reapit.config).connectSession()
  const developerId = session?.loginIdentity.developerId
  return developerId || undefined
}

export const useDeveloperId = () => {
  const [developerId, setDeveloperId] = React.useState<string | undefined>(undefined)
  React.useEffect(() => {
    getDeveloperId().then(setDeveloperId)
  }, [])
  return developerId
}

const CreateNew = ({ className }: { className?: string }) => {
  const { createApp, loading } = useCreateApp()
  const { success, error } = useSnack()
  const developerId = useDeveloperId()
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
            developerId,
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
          .catch((e: GraphQLError) => {
            error(`Failed to create app: ${e.message}`)
          })
      }}
    >
      Create New
    </Button>
  )
}

export const generateAppUrl = (subdomain: string) => {
  const { port, hostname, protocol } = window.location
  if (parseInt(port, 10) !== 443) {
    return `${protocol}//${subdomain}.${hostname}:${port}`
  }
  return `https://${subdomain}.${hostname}`
}

const AppSelector = () => {
  const developerId = useDeveloperId()
  const { loading, error, data } = useGetUserApps(developerId)
  const history = useHistory()
  const { loading: ejectLoading, ejectApp } = useEjectApp()
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
                  intent="secondary"
                  loading={ejectLoading}
                  onClick={() => {
                    window.open(generateAppUrl(app.subdomain))
                  }}
                >
                  View Live
                </Button>
                <Button
                  intent="primary"
                  onClick={() => {
                    history.push(app.id + '/')
                  }}
                >
                  Edit
                </Button>
                <Button
                  intent="secondary"
                  loading={ejectLoading}
                  onClick={() => {
                    ejectApp(app.id, app.name)
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
