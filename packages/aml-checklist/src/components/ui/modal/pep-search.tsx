import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { FaRegTimesCircle } from 'react-icons/fa'
import { Input, Button, H4, FlexContainerBasic, Formik, Form, ButtonGroup } from '@reapit/elements-legacy'
import { ReduxState } from '@/types/core'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import {
  checklistDetailShowModal,
  checklistDetailSearchPep,
  checklistDetailHideModal,
} from '@/actions/checklist-detail'
import { STEPS } from './modal'
import { getPepSearchStatus } from '@/utils/pep-search'
import { ContactModel } from '@reapit/foundations-ts-definitions'
import { Loader } from '@reapit/elements'

export const renderLoading = () => {
  return (
    <div className={styles.pepSearchLoading}>
      <Loader label="Loading" />
    </div>
  )
}

export const renderNoResult = (param: string, time: string) => {
  return (
    <FlexContainerBasic className={styles.noResultContainer}>
      <FaRegTimesCircle />
      <div>
        <H4 className={styles.noResultTitle}>No Result Found for &lsquo;{param}&rsquo;.</H4>
        <p>
          Search conducted for &lsquo;{param}&rsquo; on {time}
        </p>
      </div>
    </FlexContainerBasic>
  )
}

// eslint-disable-next-line
export const renderForm =
  ({ onPrevHandler, onNextHandler, isSubmitting, pepSearchStatus, contact }) =>
  () => {
    const { param, result, time } = (pepSearchStatus && contact.id && pepSearchStatus[contact.id]) ?? {}
    return (
      <Form>
        <div className={styles.pepSearchInputContainer}>
          <Input type="text" name="name" id="name" labelText="Enter a name" />
          <Button type="submit" variant="primary" className="mt-2">
            Search
          </Button>
        </div>
        {isSubmitting ? renderLoading() : null}
        {result && result.length === 0 && !isSubmitting ? renderNoResult(param, time) : null}
        <ButtonGroup hasSpacing isCentered>
          <Button
            disabled={isSubmitting}
            type="button"
            variant="primary"
            className="mr-2"
            dataTest="prev-btn"
            onClick={onPrevHandler}
          >
            Previous
          </Button>
          <Button disabled={isSubmitting} type="button" variant="primary" dataTest="next-btn" onClick={onNextHandler}>
            Finish
          </Button>
        </ButtonGroup>
      </Form>
    )
  }

export type PepSearchProps = StateProps & DispatchProps

export const PepSearch: React.FC<PepSearchProps> = ({
  contact,
  handleSubmit,
  onPrevHandler,
  onNextHandler,
  isSubmitting,
}) => {
  const pepSearchStatus = getPepSearchStatus()
  return (
    <div>
      <Formik initialValues={{ name: `${contact.forename} ${contact.surname}` }} onSubmit={handleSubmit}>
        {renderForm({
          onPrevHandler,
          onNextHandler,
          isSubmitting,
          pepSearchStatus,
          contact,
        })}
      </Formik>
    </div>
  )
}

export type StateProps = {
  isSubmitting: boolean
  contact: ContactModel
}

export const mapStateToProps = (state: ReduxState) => {
  return {
    contact: state?.checklistDetail?.checklistDetailData?.contact || {},
    isSubmitting: state?.checklistDetail?.isSubmitting || false,
  }
}

export type DispatchProps = {
  handleSubmit: (values: any) => void
  onNextHandler: () => void
  onPrevHandler: () => void
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleSubmit: (values) => {
      dispatch(checklistDetailSearchPep(values.name))
    },
    onPrevHandler: () => dispatch(checklistDetailShowModal(STEPS.DECLARATION_RISK_MANAGEMENT)),
    onNextHandler: () => dispatch(checklistDetailHideModal()),
  }
}

const PepSearchWithRedux = connect(mapStateToProps, mapDispatchToProps)(PepSearch)

PepSearchWithRedux.displayName = 'PepSearchWithRedux'

export default PepSearchWithRedux
