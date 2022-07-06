import { getReapitConnectBrowserSession } from '@/core/connect-session'
import {
  Loader,
  Button,
  Icon,
  useSnack,
  Title,
  useModal,
  ButtonGroup,
  FormLayout,
  InputWrapFull,
  InputGroup,
  elFadeIn,
  Card,
  Grid,
  elMb11,
  Col,
  FlexContainer,
  PageContainer,
  elHFull,
  PersistentNotification,
  SecondaryNavContainer,
  elMb5,
  Subtitle,
  SmallText,
  MainContainer,
} from '@reapit/elements'
import React from 'react'
import { useHistory } from 'react-router'
import formatDistance from 'date-fns/formatDistance'
import { useCreateApp } from '../hooks/apps/use-create-app'
import { useGetUserApps } from '../hooks/apps/use-user-apps'
import { useEjectApp } from '../hooks/apps/use-eject-app'
import { GraphQLError } from 'graphql'
import { object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Nav from '../ui/nav'

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

export const validationSchema = object().shape({
  name: string().trim().required(),
})

const CreateNew = ({ className }: { className?: string }) => {
  const { Modal, openModal, closeModal } = useModal()
  const { createApp, loading } = useCreateApp()
  const { success, error } = useSnack()
  const developerId = useDeveloperId()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
    },
  })

  return (
    <>
      <Button intent="primary" className={className} loading={loading} onClick={openModal}>
        Create New
      </Button>
      <Modal title="Create New App">
        <form
          onSubmit={handleSubmit(({ name }) => {
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
              .finally(() => {
                closeModal()
              })
          })}
        >
          <FormLayout hasMargin>
            <InputWrapFull>
              <InputGroup
                {...register('name')}
                label="App Name"
                placeholder="Enter a  name for your app"
                errorMessage={errors?.name?.message}
                icon={errors?.name?.message ? 'asteriskSystem' : null}
                intent="danger"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.form?.requestSubmit()
                  }
                }}
              />
            </InputWrapFull>
          </FormLayout>
          <ButtonGroup alignment="center">
            <Button intent="low" fixedWidth onClick={closeModal}>
              Close
            </Button>
            <Button intent="primary" fixedWidth type="submit">
              Create
            </Button>
          </ButtonGroup>
        </form>
      </Modal>
    </>
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
  const { ejectApp } = useEjectApp()
  if (error) return <div>Error</div>

  return (
    <MainContainer>
      <Nav />
      <FlexContainer isFlexAuto>
        <SecondaryNavContainer>
          <Title>App Builder</Title>
          <Icon className={elMb5} icon="myAppsInfographic" iconSize="large" />
          <Subtitle>Apps List</Subtitle>
          <SmallText hasGreyText>
            Apps you are currently developing withing the app builder application are available here. The apps exist
            both as app builder projects and Reapit Developer Portal Apps.
          </SmallText>
          <Button className={elMb5} intent="neutral" onClick={console.log}>
            View Docs
          </Button>
          <CreateNew />
        </SecondaryNavContainer>
        <PageContainer className={elHFull}>
          <Title>My Apps</Title>
          {!data?.length && (
            <>
              {loading && <Loader />}
              {!loading && (
                <PersistentNotification intent="secondary" isExpanded isFullWidth isInline>
                  No apps found. You can create a new app from the sidebar.
                </PersistentNotification>
              )}
            </>
          )}
          <Grid className={elMb11}>
            {data?.map(({ id, name, updatedAt, subdomain }) => (
              <Col key={id}>
                <Card
                  className={elFadeIn}
                  style={{ cursor: 'pointer' }}
                  onClick={() => history.push(id + '/')}
                  hasMainCard
                  mainContextMenuItems={[
                    {
                      icon: 'viewSolidSystem',
                      onClick: () => {
                        window.open(generateAppUrl(subdomain))
                      },
                      intent: 'primary',
                    },
                    {
                      icon: 'warningSolidSystem',
                      onClick: () => {
                        ejectApp(id, name)
                      },
                      intent: 'danger',
                    },
                  ]}
                  mainCardHeading={name}
                  mainCardSubHeading={`Last Updated: ${formatDistance(new Date(updatedAt), new Date(), {
                    addSuffix: true,
                  })}`}
                />
              </Col>
            ))}
          </Grid>
        </PageContainer>
      </FlexContainer>
    </MainContainer>
  )
}

export default AppSelector
