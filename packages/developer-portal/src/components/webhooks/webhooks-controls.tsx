import React, { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import {
  Button,
  ButtonGroup,
  elBorderRadius,
  elMb5,
  elMb7,
  elWFull,
  InputGroup,
  Label,
  Select,
  useModal,
} from '@reapit/elements'
import Routes from '../../constants/routes'
import { ControlsContainer, inputFullWidth, overflowHidden } from './__styles__'
import { cx } from '@linaria/core'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { useWebhooksState, WebhooksFilterState } from './state/use-webhooks-state'
import { NavigateFunction, useNavigate } from 'react-router'
import { ExternalPages, openNewPage } from '../../utils/navigation'
import { TopicModel } from '../../types/webhooks'

interface StringMap {
  [key: string]: string
}

export type HandleSelectFilters = (
  setWebhookQueryParams: Dispatch<SetStateAction<WebhooksFilterState>>,
  navigate: NavigateFunction,
) => SelectAppIdEventHandler

export type SelectAppIdEventHandler = (
  event?: React.ChangeEvent<HTMLSelectElement | HTMLInputElement> | undefined,
  applicationId?: string | undefined,
) => void

export const handleHistoryToQueryParams = (): WebhooksFilterState => {
  const queryParams = new URLSearchParams(window.location.search)
  return {
    applicationId: queryParams.get('applicationId') ?? '',
    from: queryParams.get('from') ?? dayjs().format('YYYY-MM-DD'),
    to: queryParams.get('to') ?? dayjs().format('YYYY-MM-DD'),
    entityId: queryParams.get('entityId') ?? '',
    topicId: queryParams.get('topicId') ?? '',
    eventId: queryParams.get('eventId') ?? '',
  }
}

export const handleSelectFilters: HandleSelectFilters =
  (setWebhookQueryParams, navigate) =>
  (event?: ChangeEvent<HTMLSelectElement | HTMLInputElement>, applicationId?: string) => {
    const value = applicationId ? applicationId : event?.target.value
    const name = applicationId ? 'applicationId' : event?.target.name

    if ((applicationId && !value) || !name) return

    const queryParams = handleHistoryToQueryParams()
    const newParams = {
      ...queryParams,
      [name]: value,
    }
    const cleanedParams = Object.keys(newParams).reduce((prev: StringMap | undefined, next: string) => {
      if (newParams[next] && prev) {
        prev[next] = newParams[next]
      }
      return prev
    }, {})
    const newQueryString = new URLSearchParams(cleanedParams).toString()
    setWebhookQueryParams(newParams)
    navigate(`${window.location.pathname}?${newQueryString}`)
  }

export const WebhooksControls: FC = () => {
  const { webhooksFilterState, webhooksDataState, setWebhooksFilterState } = useWebhooksState()
  const navigate = useNavigate()
  const { Modal, openModal, closeModal } = useModal()
  const { to, from, applicationId, topicId, entityId, eventId } = webhooksFilterState
  const { apps, topics } = webhooksDataState
  const { pathname } = window.location
  const isManagePage = pathname === Routes.WEBHOOKS_MANAGE
  const isLogsPage = pathname === Routes.WEBHOOKS_LOGS

  return (
    <>
      {(isManagePage || isLogsPage) && (
        <>
          <div className={cx(elBorderRadius, overflowHidden, elMb5)}>
            <ControlsContainer>
              <InputGroup>
                <Select
                  className={elWFull}
                  value={applicationId ?? ''}
                  name="applicationId"
                  onChange={handleSelectFilters(setWebhooksFilterState, navigate)}
                >
                  <option key="default-option" value="">
                    None selected
                  </option>
                  {apps?.data?.map((app: Marketplace.AppSummaryModel) => (
                    <option key={app.id} value={app.id}>
                      {app.name}
                    </option>
                  ))}
                </Select>
                <Label>App Name</Label>
              </InputGroup>
            </ControlsContainer>
            {isLogsPage && (
              <>
                <ControlsContainer>
                  <InputGroup
                    className={inputFullWidth}
                    value={from}
                    type="date"
                    name="from"
                    label="Date From"
                    min={dayjs(to).subtract(6, 'months').format('YYYY-MM')}
                    max={dayjs(to).format('YYYY-MM-DD')}
                    onChange={handleSelectFilters(setWebhooksFilterState, navigate)}
                  />
                </ControlsContainer>
                <ControlsContainer>
                  <InputGroup
                    className={inputFullWidth}
                    value={to}
                    type="date"
                    name="to"
                    label="Date To"
                    min={dayjs(from).format('YYYY-MM-DD')}
                    max={dayjs().format('YYYY-MM-DD')}
                    onChange={handleSelectFilters(setWebhooksFilterState, navigate)}
                  />
                </ControlsContainer>
                <ControlsContainer>
                  <InputGroup>
                    <Select
                      className={elWFull}
                      value={topicId ?? ''}
                      name="topicId"
                      onChange={handleSelectFilters(setWebhooksFilterState, navigate)}
                    >
                      <option key="default-option" value="">
                        None selected
                      </option>
                      {topics?.map((topic: TopicModel) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.name}
                        </option>
                      ))}
                    </Select>
                    <Label>Topic Name</Label>
                  </InputGroup>
                </ControlsContainer>
                <ControlsContainer>
                  <InputGroup
                    className={inputFullWidth}
                    value={entityId}
                    type="text"
                    name="entityId"
                    label="Entity Id"
                    onChange={handleSelectFilters(setWebhooksFilterState, navigate)}
                  />
                </ControlsContainer>
                <ControlsContainer>
                  <InputGroup
                    className={inputFullWidth}
                    value={eventId}
                    type="text"
                    name="eventId"
                    label="Event Id"
                    onChange={handleSelectFilters(setWebhooksFilterState, navigate)}
                  />
                </ControlsContainer>
              </>
            )}
          </div>
        </>
      )}
      <ButtonGroup className={elMb7}>
        <Button intent="default" onClick={openNewPage(ExternalPages.webhooksDocs)}>
          View Docs
        </Button>
        <Button intent="default" onClick={openModal}>
          Video
        </Button>
      </ButtonGroup>
      <Modal title="Webhooks">
        <iframe
          className={elMb7}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/FmrxP-bn1Vw"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <ButtonGroup alignment="right">
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}

export default WebhooksControls
