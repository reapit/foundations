import React from 'react'
import {
  ProgressBar,
  H3,
  LevelRight,
  LevelItem,
  LevelLeft,
  Level,
  Button,
  AcLink,
  EntityType,
  SubTitleH5,
  FadeIn,
  Section,
} from '@reapit/elements-legacy'
import { SectionsStatus } from '@/reducers/checklist-detail'
import { IdentityCheckModel, ContactModel } from '@reapit/foundations-ts-definitions'
import { Dispatch } from 'redux'
import { checklistDetailShowModal } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import { connect } from 'react-redux'
import {
  selectCheckListDetailStatus,
  selectCheckListDetailContact,
  selectCheckListDetailIdCheck,
} from '@/selectors/checklist-detail'
import { ID_STATUS } from './modal/modal'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type AMLProgressBarProps = AMLProgressBarMappedActions & AMLProgressBarMappedProps

export const calculateProgress = (status: SectionsStatus) => {
  const count = Object.keys(status).length
  const completedCount = Object.keys(status).filter((key) => status[key]).length
  return { percentage: Math.floor((completedCount / count) * 100), completed: completedCount, total: count }
}

export const AMLProgressBar: React.FC<AMLProgressBarProps> = ({ contact, idCheck, status, showModal }) => {
  const progress = React.useMemo(() => calculateProgress(status), [status])
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  const { id, title, forename, surname } = contact || {}
  const name = `${title || ''} ${forename || ''} ${surname || ''}`.trim()

  return (
    <FadeIn>
      <Section hasMargin={false}>
        <Level>
          <LevelLeft>
            <LevelItem>
              <Section isFlex isFlexColumn hasPadding={false} hasMargin={false}>
                <H3 className="mb-5">
                  <AcLink
                    dynamicLinkParams={{
                      appMode: connectIsDesktop ? 'DESKTOP' : 'WEB',
                      entityType: EntityType.CONTACT,
                      entityCode: id,
                    }}
                  >
                    {name}
                  </AcLink>
                </H3>
                <SubTitleH5>{idCheck && idCheck.status && `Status: ${idCheck.status.toUpperCase()}`}</SubTitleH5>
              </Section>
            </LevelItem>
          </LevelLeft>
          <LevelRight>
            <LevelItem>
              <Button disabled={!idCheck} type="button" variant="primary" onClick={() => showModal(ID_STATUS.UPDATE)}>
                Update Status
              </Button>
            </LevelItem>
          </LevelRight>
        </Level>
        <ProgressBar percentage={progress.percentage} />
        <div className="has-text-right">
          {progress.completed}/{progress.total} <span>Completed</span>
        </div>
      </Section>
    </FadeIn>
  )
}

export interface AMLProgressBarMappedProps {
  contact: ContactModel | null
  idCheck: IdentityCheckModel | null
  status: SectionsStatus
}

export const mapStateToProps = (state: ReduxState): AMLProgressBarMappedProps => ({
  contact: selectCheckListDetailContact(state),
  idCheck: selectCheckListDetailIdCheck(state),
  status: selectCheckListDetailStatus(state),
})

export interface AMLProgressBarMappedActions {
  showModal: (modalType: string) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): AMLProgressBarMappedActions => ({
  showModal: (modalType: string) => dispatch(checklistDetailShowModal(modalType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AMLProgressBar)
