import React from 'react'
import ReactToPrint from 'react-to-print'
import { connect } from 'react-redux'
import { Button } from '@reapit/elements'
import { combineAdress } from '@/utils/combine-address'
import styles from '@/styles/pages/checklist-detail.scss?mod'
import { ContactModel } from '@/types/contact-api-schema'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const Report = React.forwardRef((_, ref) => {
  return (
    <div ref={ref as any} className={styles.reportContainer}>
      <div className={styles.informationRow}>
        <span>Description</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>Passport Image Uploaded</span>
        <span>By Giacomo</span>
      </div>
      <div className={styles.informationRow}>
        <span>Document Verified by IDCheck</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>See Original Ticked</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>Utility bill uploaded</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>Address check</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>Council Tax Bill Scanned</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>Date Selected</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>New Address Added</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>PEP</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>PEP Search conducted</span>
        <span>Detail</span>
      </div>
      <div className={styles.informationRow}>
        <span>PEP Search Passed Online Check</span>
        <span>Detail</span>
      </div>
    </div>
  )
})

export const handleTrigger = () => (
  <Button className="mr-2" variant="primary" type="button">
    Print Report
  </Button>
)

export const handleContent = ({ printRef }) => () => {
  return printRef.current
}

export type ReportContainerProps = {
  contact: ContactModel
}

export const ReportContainer: React.FC<ReportContainerProps> = ({ contact }) => {
  const address = combineAdress(contact.addresses)
  const printRef = React.useRef()

  return (
    <div>
      <div className="is-flex mb-5">
        <span className={styles.contentTitle}>Report:</span>
        <span>{address}</span>
      </div>
      <Report ref={printRef} />
      <div className={styles.footerContainer}>
        <ReactToPrint trigger={handleTrigger} content={handleContent({ printRef })} />
        <Button variant="primary" type="button">
          Email Report
        </Button>
      </div>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState) => {
  return {
    contact: oc(state).checklistDetail.checklistDetailData.contact({})
  }
}

export const mapDispatchToProps = () => {
  return {
    onEmailReport: () => {
      console.log('send Email')
    }
  }
}

export const ReportContainerRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportContainer)

ReportContainerRedux.displayName = 'ReportContainerRedux'

export default ReportContainerRedux
