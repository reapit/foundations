import React from 'react'
import {
  ProgressBar,
  H3,
  LevelRight,
  LevelItem,
  LevelLeft,
  Level,
  Button,
  LoginMode,
  AcLink,
  EntityType,
  SubTitleH5,
  FlexContainerBasic
} from '@reapit/elements'
import styles from '@/styles/ui/aml-progressbar.scss?mod'
import { SectionsStatus } from '@/reducers/checklist-detail'
import { IdentityCheckModel, ContactModel } from '@/types/contact-api-schema'
import { Dispatch } from 'redux'
import { checklistDetailShowModal } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import { connect } from 'react-redux'
import {
  selectCheckListDetailStatus,
  selectCheckListDetailContact,
  selectCheckListDetailIdCheck
} from '@/selectors/checklist-detail'
import { ID_STATUS } from './modal/modal'

export type AMLProgressBarProps = AMLProgressBarMappedActions & AMLProgressBarMappedProps

// TODO: will replace when get data from BE
export const calculateProgress = (status: SectionsStatus) => {
  const count = Object.keys(status).length
  const completedCount = Object.keys(status).filter(key => status[key]).length
  return { percentage: Math.floor((completedCount / count) * 100), completed: completedCount, total: count }
}

export const AMLProgressBar: React.FC<AMLProgressBarProps> = ({ contact, idCheck, status, loginMode, showModal }) => {
  const progress = React.useMemo(() => calculateProgress(status), [status])

  const { id, title, forename, surname } = contact || {}
  const name = `${title || ''} ${forename || ''} ${surname || ''}`.trim()

  return (
    <div className="mb-4">
      <FlexContainerBasic hasPadding flexColumn hasBackground>
        <div>
          <Level>
            <LevelLeft>
              <LevelItem>
                <div>
                  <H3>
                    <AcLink
                      dynamicLinkParams={{
                        appMode: loginMode,
                        entityType: EntityType.CONTACT,
                        entityCode: id
                      }}
                    >
                      {name}
                    </AcLink>
                  </H3>
                  <SubTitleH5>{idCheck && idCheck.status && `Status: ${idCheck.status.toUpperCase()}`}</SubTitleH5>
                </div>
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
          <div className={styles.progress}>
            {progress.completed}/{progress.total} <span>Completed</span>
          </div>
        </div>
      </FlexContainerBasic>
    </div>
  )
}

export interface AMLProgressBarMappedProps {
  contact: ContactModel | null
  idCheck: IdentityCheckModel | null
  status: SectionsStatus
  loginMode: LoginMode
}

export const mapStateToProps = (state: ReduxState): AMLProgressBarMappedProps => ({
  contact: selectCheckListDetailContact(state),
  idCheck: selectCheckListDetailIdCheck(state),
  status: selectCheckListDetailStatus(state),
  loginMode: state?.auth?.refreshSession?.mode || 'WEB'
})

export interface AMLProgressBarMappedActions {
  showModal: (modalType: string) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): AMLProgressBarMappedActions => ({
  showModal: (modalType: string) => dispatch(checklistDetailShowModal(modalType))
})

export default connect(mapStateToProps, mapDispatchToProps)(AMLProgressBar)
