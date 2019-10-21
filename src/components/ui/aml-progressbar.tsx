import React from 'react'
import {
  ProgressBar,
  H3,
  LevelRight,
  LevelItem,
  LevelLeft,
  Level,
  Button,
  Modal,
  LoginMode,
  AcLink,
  EntityType
} from '@reapit/elements'
import styles from '@/styles/ui/aml-progressbar.scss?mod'
import { SectionsStatus, defaultStatus } from '@/reducers/checklist-detail'
import { IdentityCheckModel, ContactModel } from '@/types/contact-api-schema'
import { Dispatch } from 'redux'
import { checkListDetailIdentityCheckUpdateData } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
import { connect } from 'react-redux'

export type AMLProgressBarProps = AMLProgressBarMappedActions & AMLProgressBarMappedProps

// TODO: will replace when get data from BE
export const calculateProgress = (status: SectionsStatus) => {
  const count = Object.keys(status).length
  const completedCount = Object.keys(status).filter(key => status[key]).length
  return { percentage: Math.floor((completedCount / count) * 100), completed: completedCount, total: count }
}

export const AMLProgressBar: React.FC<AMLProgressBarProps> = ({
  contact,
  status,
  loginMode,
  updateIdentityCheckStatus
}) => {
  const progress = React.useMemo(() => calculateProgress(status), [status])
  const [visible, setVisible] = React.useState(false)

  const { title = '', forename = '', surname = '' } = contact

  return (
    <>
      <Level>
        <LevelLeft>
          <LevelItem>
            <H3>
              <AcLink
                dynamicLinkParams={{
                  appMode: loginMode,
                  entityType: EntityType.CONTACT,
                  entityCode: contact.id
                }}
              >
                {title}
              </AcLink>
            </H3>
          </LevelItem>
        </LevelLeft>
        {progress.percentage === 100 && (
          <LevelRight>
            <LevelItem>
              <Button type="button" variant="primary" onClick={() => setVisible(true)}>
                Update Status
              </Button>
            </LevelItem>
          </LevelRight>
        )}
      </Level>

      <div className="mb-1">
        <ProgressBar percentage={progress.percentage} />
      </div>
      <div className={styles.progress}>
        {progress.completed}/{progress.total} <span>Completed</span>
      </div>
      <Modal title="Update Status" visible={visible} afterClose={() => setVisible(false)}>
        <div>
          <p className="mb-5">
            You have completed 7 out of 7 sections for contact {`${title} ${forename} ${surname}`}. Please now select
            one of the following options in order to continue
          </p>
          <Button type="button" variant="primary" onClick={() => updateIdentityCheckStatus({ status: 'pass' })}>
            ID Check Successful
          </Button>
          <Button type="button" variant="primary">
            Refer to Lifetime Legal
          </Button>
        </div>
      </Modal>
    </>
  )
}

export interface AMLProgressBarMappedProps {
  contact: ContactModel
  status: SectionsStatus
  loginMode: LoginMode
}

export const mapStateToProps = (state: ReduxState): AMLProgressBarMappedProps => ({
  contact: oc(state).checklistDetail.checklistDetailData.contact({}),
  status: oc(state).checklistDetail.status(defaultStatus),
  loginMode: oc(state).auth.refreshSession.mode('WEB')
})

export interface AMLProgressBarMappedActions {
  updateIdentityCheckStatus: (status: IdentityCheckModel) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): AMLProgressBarMappedActions => ({
  updateIdentityCheckStatus: ({ status }: IdentityCheckModel) =>
    dispatch(checkListDetailIdentityCheckUpdateData({ status }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AMLProgressBar)
