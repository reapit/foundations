import React from 'react'
import ReactToPrint from 'react-to-print'
import { connect } from 'react-redux'
import { Button, Table } from '@reapit/elements'
import styles from '@/styles/ui/report.scss?mod'
import { ContactModel, ContactIdentityCheckModel, ListItemModel } from '@reapit/foundations-ts-definitions'
import { ReduxState } from '@/types/core'
import { SectionsStatus } from '@/reducers/checklist-detail'
import dayjs from 'dayjs'
// import { getPepSearchStatus } from '@/utils/pep-search'
import { FaCheck, FaTimes } from 'react-icons/fa'
import {
  selectCheckListDetailContact,
  selectCheckListDetailIdCheck,
  selectCheckListDetailStatus,
  selectIdentityTypes
} from '@/selectors/checklist-detail'

export const handleTrigger = () => (
  <Button className="mr-2" variant="primary" type="button">
    Print Report
  </Button>
)

export const handleContent = ({ printRef }) => () => {
  return printRef.current
}

export const mappedIdTypes = (idTypes: ListItemModel[]) => {
  return idTypes.reduce((cur, obj) => {
    if (obj && obj.id) {
      cur[obj.id] = obj.value
    }
    return cur
  }, {})
}

export type ReportContainerProps = {
  contact: ContactModel | null
  idCheck: ContactIdentityCheckModel | null
  status: SectionsStatus
  identityTypes: ListItemModel[]
}

export const ReportContainer: React.FC<ReportContainerProps> = ({ contact, idCheck, status, identityTypes }) => {
  const printRef = React.useRef<HTMLDivElement>(null)

  const { identityCheck, title, forename, surname, dateOfBirth, communications } = contact || {}
  const name = `${title || ''} ${forename || ''} ${surname || ''}`.trim()

  const data = React.useMemo(() => {
    const idTypes = mappedIdTypes(identityTypes)

    return [
      {
        section: 'Personal Detail',
        description: () => {
          return (
            <div>
              {name && <p>Name: {name}</p>}
              {dateOfBirth && <p>Date of Birth: {dayjs(dateOfBirth).format('DD/MM/YYYY')}</p>}
              {communications &&
                communications.map(item => (
                  <p>
                    {item.label}: {item.detail}
                  </p>
                ))}
            </div>
          )
        },
        status: status.profile
      },
      {
        section: 'Primary ID',
        description: () => {
          const { typeId, details, expiry } = idCheck?.documents?.[0] || {}
          return (
            <div>
              {typeId && <p>Type: {idTypes[typeId] || typeId}</p>}
              {details && <p>Reference: {details}</p>}
              {expiry && <p>Expiry Date: {dayjs(expiry).format('DD/MM/YYYY')}</p>}
            </div>
          )
        },
        status: status.primaryId
      },
      {
        section: 'Secondary ID',
        description: () => {
          const { typeId, details, expiry } = idCheck?.documents?.[1] || {}
          return (
            <div>
              {typeId && <p>Type: {idTypes[typeId] || typeId}</p>}
              {details && <p>Reference: {details}</p>}
              {expiry && <p>Expiry Date: {dayjs(expiry).format('DD/MM/YYYY')}</p>}
            </div>
          )
        },
        status: status.secondaryId
      },
      {
        section: 'Address History',
        description: () => {
          const addresses = contact?.addresses || []
          const metaAddress = contact?.metadata?.addresses || []
          const mAddress = addresses.map((item, index) => ({ ...item, ...metaAddress[index] }))
          return (
            mAddress &&
            mAddress.map(item => {
              const { buildingName, buildingNumber, line1, line2, line3, postcode, year, month, documentType } = item
              return (
                <div>
                  <p>
                    {buildingNumber} {buildingName} {line1} {line2}
                  </p>
                  <p>
                    {line3} {postcode}
                  </p>
                  {year && <p>No. Years: {year}</p>}
                  {month && <p>No. Months: {month}</p>}
                  {documentType && <p>Doc: {documentType}</p>}
                </div>
              )
            })
          )
        },
        status: status.addresses
      },
      {
        section: 'Declaration and Risk Assessment',
        description: () => {
          const reason = contact?.metadata?.declarationRisk?.reason
          const type = contact?.metadata?.declarationRisk?.type
          return (
            <div>
              {type && <p>Type: {type}</p>}
              {reason && <p>Reason: {reason}</p>}
            </div>
          )
        },
        status: status.declarationRisk
      }
      // {
      //   section: 'PEP Search',
      //   description: () => {
      //     const pepSearchStatus = getPepSearchStatus()
      //     const { param, time } = pepSearchStatus && id && pepSearchStatus[id]
      //     return <div>{param && time && `Search conducted for "${param}" on ${time}`}</div>
      //   },
      //   status: status.pepSearch
      // },
      // {
      //   section: 'Experian',
      //   description: () => <div></div>,
      //   status: status.experian
      // }
    ]
  }, [contact, idCheck])

  const columns = [
    {
      Header: 'Section',
      accessor: 'section'
    },
    {
      Header: 'Description',
      id: 'description',
      accessor: 'description',
      Cell: ({ row }) => row.original.description()
    },
    {
      Header: 'Status',
      id: 'status',
      accessor: 'status',
      Cell: ({ row }) => (
        <div className={styles.statusColumn}>
          {row.original.status ? (
            <FaCheck className={styles.checkCompleted} />
          ) : (
            <FaTimes className={styles.checkIncomplete} />
          )}
          <span>{row.original.status ? 'Completed' : 'Incomplete'}</span>
        </div>
      )
    }
  ]

  return (
    <>
      <div ref={printRef} className={styles.reportPrint}>
        <p className={styles.title}>{name}</p>
        <p className={styles.status}>Status: {identityCheck}</p>
        <div className={styles.reportContainer}>
          <Table data={data} columns={columns} loading={false} bordered striped />
        </div>
      </div>
      <div className={styles.footerContainer}>
        <ReactToPrint trigger={handleTrigger} content={handleContent({ printRef })} />
        {/* <Button variant="primary" type="button">
          Email Report
        </Button> */}
      </div>
    </>
  )
}

export const mapStateToProps = (state: ReduxState) => {
  return {
    contact: selectCheckListDetailContact(state),
    idCheck: selectCheckListDetailIdCheck(state),
    status: selectCheckListDetailStatus(state),
    identityTypes: selectIdentityTypes(state)
  }
}

export const mapDispatchToProps = () => {
  return {
    onEmailReport: () => {
      console.log('send Email')
    }
  }
}

export const ReportContainerRedux = connect(mapStateToProps, mapDispatchToProps)(ReportContainer)

ReportContainerRedux.displayName = 'ReportContainerRedux'

export default ReportContainerRedux
