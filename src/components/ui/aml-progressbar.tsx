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
  EntityType,
  AcButton,
  SubTitleH5,
  AppParams,
  DynamicLinkParams,
  FlexContainerBasic
} from '@reapit/elements'
import styles from '@/styles/ui/aml-progressbar.scss?mod'
import { SectionsStatus, defaultStatus } from '@/reducers/checklist-detail'
import { IdentityCheckModel, ContactModel } from '@/types/contact-api-schema'
import { Dispatch } from 'redux'
import { checkListDetailIdentityCheckUpdateData } from '@/actions/checklist-detail'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'
import { connect } from 'react-redux'
import Routes from '@/constants/routes'

export type AMLProgressBarProps = AMLProgressBarMappedActions & AMLProgressBarMappedProps

// TODO: will replace when get data from BE
export const calculateProgress = (status: SectionsStatus) => {
  const count = Object.keys(status).length
  const completedCount = Object.keys(status).filter(key => status[key]).length
  return { percentage: Math.floor((completedCount / count) * 100), completed: completedCount, total: count }
}

export const AMLProgressBar: React.FC<AMLProgressBarProps> = ({
  contact,
  idCheck,
  status,
  loginMode,
  updateIdentityCheckStatus
}) => {
  const progress = React.useMemo(() => calculateProgress(status), [status])
  const [visible, setVisible] = React.useState(false)

  const { title = '', forename = '', surname = '' } = contact

  return (
    <FlexContainerBasic hasPadding flexColumn>
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
                      entityCode: contact.id
                    }}
                  >
                    {`${title} ${forename} ${surname}`}
                  </AcLink>
                </H3>
                <SubTitleH5>{idCheck && idCheck.status && `Status: ${idCheck.status.toUpperCase()}`}</SubTitleH5>
              </div>
            </LevelItem>
          </LevelLeft>
          <LevelRight>
            <LevelItem>
              <Button disabled={!idCheck} type="button" variant="primary" onClick={() => setVisible(true)}>
                Update Status
              </Button>
            </LevelItem>
          </LevelRight>
        </Level>
        <ProgressBar percentage={progress.percentage} />
        <div className={styles.progress}>
          {progress.completed}/{progress.total} <span>Completed</span>
        </div>
        <Modal
          title="Update Status"
          visible={visible}
          afterClose={() => setVisible(false)}
          footerItems={
            <>
              <AcButton
                dynamicLinkParams={{
                  entityType: EntityType.CONTACT,
                  entityCode: contact.id,
                  appMode: loginMode
                }}
                buttonProps={{
                  type: 'button',
                  variant: 'primary',
                  onClick: () =>
                    updateIdentityCheckStatus(
                      { status: 'pass' },
                      {
                        entityType: EntityType.CONTACT,
                        entityCode: contact.id,
                        appMode: loginMode,
                        webRoute: `${Routes.CHECKLIST_DETAIL_WITHOUT_ID}/${contact.id}`
                      }
                    )
                }}
              >
                ID Check Successful
              </AcButton>
              <AcButton
                dynamicLinkParams={{
                  entityType: EntityType.APPS,
                  appMode: loginMode,
                  queryParams: {
                    // TODO - this is the LTL dev app id - should be dynamic
                    id: '3ec48bb7-f152-4d0d-8b6a-b5d0c8fff010',
                    appPram: 'cntCode' as AppParams,
                    closeApp: true
                  },
                  // TODO - as above, needs to not be hardcoded
                  webRoute: `https://dev.lifetime-legal-app.reapit.com?cntCode=${contact.id}`
                }}
                buttonProps={{
                  type: 'button',
                  variant: 'primary'
                }}
              >
                Refer to Lifetime Legal
              </AcButton>
            </>
          }
        >
          <p>
            You have completed {Object.keys(status).filter(key => status[key]).length} out of{' '}
            {Object.keys(status).length} sections for contact {`${title} ${forename} ${surname}`}. Please now select one
            of the following options in order to continue
          </p>
        </Modal>
      </div>
    </FlexContainerBasic>
  )
}

export interface AMLProgressBarMappedProps {
  contact: ContactModel
  idCheck: IdentityCheckModel | null
  status: SectionsStatus
  loginMode: LoginMode
}

export const mapStateToProps = (state: ReduxState): AMLProgressBarMappedProps => ({
  contact: oc(state).checklistDetail.checklistDetailData.contact({}),
  idCheck: oc(state).checklistDetail.checklistDetailData.idCheck(null),
  status: oc(state).checklistDetail.status(defaultStatus),
  loginMode: oc(state).auth.refreshSession.mode('WEB')
})

export interface AMLProgressBarMappedActions {
  updateIdentityCheckStatus: (idCheck: IdentityCheckModel, dynamicLinkParams: DynamicLinkParams) => void
}

export const mapDispatchToProps = (dispatch: Dispatch): AMLProgressBarMappedActions => ({
  updateIdentityCheckStatus: (idCheck: IdentityCheckModel, dynamicLinkParams: DynamicLinkParams) =>
    dispatch(checkListDetailIdentityCheckUpdateData({ idCheck, dynamicLinkParams }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AMLProgressBar)
