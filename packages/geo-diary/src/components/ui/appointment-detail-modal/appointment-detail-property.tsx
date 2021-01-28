import React from 'react'
import useSWR from 'swr'
import {
  PropertyModel,
  VendorModel,
  LandlordContactModel,
  VendorContactModel,
} from '@reapit/foundations-ts-definitions'
import { URLS } from '../../../constants/api'
import { FaMale } from 'react-icons/fa'
import { Loader, Grid, GridItem, H6, AcLink, EntityType } from '@reapit/elements'
import { renderCommunicationDetail, LoginMode } from './appointment-detail-modal'

export const AppointmentDetailProperty: React.FC<{
  propertyId: string
  loginMode: LoginMode
  isMobileView: boolean
}> = ({ propertyId, loginMode, isMobileView }) => {
  if (!propertyId) {
    return null
  }
  const { data } = useSWR<PropertyModel | undefined>(`${URLS.PROPERTIES}/${propertyId}`)
  if (!data) return <Loader />
  const { selling, letting } = data
  const vendorId = selling?.vendorId || ''
  const landlordId = letting?.landlordId || ''
  return (
    <>
      {vendorId && <VendorSection vendorId={vendorId} loginMode={loginMode} isMobileView={isMobileView} />}
      {landlordId && <LandlordSection landlordId={landlordId} loginMode={loginMode} isMobileView={isMobileView} />}
    </>
  )
}
export default AppointmentDetailProperty

export const VendorSection: React.FC<{ vendorId: string; loginMode: LoginMode; isMobileView: boolean }> = ({
  vendorId,
  loginMode,
  isMobileView,
}) => {
  if (!vendorId) {
    return null
  }
  const { data } = useSWR<VendorModel | undefined>(`${URLS.VENDORS}/${vendorId}`)
  if (!data) return <Loader />
  const vendorContacts = data.related || []
  return vendorContacts.length > 0 ? (
    <Grid className="is-mobile">
      <GridItem className="is-one-third-desktop is-5-mobile horizontal">
        <Grid className="is-vcentered is-mobile">
          <GridItem className="is-narrow px-0">
            <FaMale />
          </GridItem>
          <GridItem>
            <H6>Vendors:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      {vendorContacts.map((contact: VendorContactModel) => {
        return (
          <GridItem className="text-ellipsis" key={contact.id}>
            <div className="mb-2">
              <AcLink
                dynamicLinkParams={{
                  appMode: loginMode,
                  entityType: EntityType.CONTACT,
                  entityCode: contact.id,
                }}
              >
                {contact.name}
              </AcLink>
            </div>
            {renderCommunicationDetail(contact, isMobileView)}
          </GridItem>
        )
      })}
    </Grid>
  ) : null
}

export const LandlordSection: React.FC<{ landlordId: string; loginMode: LoginMode; isMobileView: boolean }> = ({
  landlordId,
  loginMode,
  isMobileView,
}) => {
  if (!landlordId) {
    return null
  }
  const { data } = useSWR<VendorModel | undefined>(`${URLS.VENDORS}/${landlordId}`)
  if (!data) return <Loader />
  const landlordContacts = data.related || []
  return landlordContacts.length > 0 ? (
    <Grid className="is-mobile">
      <GridItem className="is-one-third-desktop is-5-mobile horizontal">
        <Grid className="is-vcentered is-mobile">
          <GridItem className="is-narrow px-0">
            <FaMale />
          </GridItem>
          <GridItem>
            <H6>Vendors:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      {landlordContacts.map((contact: LandlordContactModel) => {
        return (
          <GridItem className="text-ellipsis" key={contact.id}>
            <div className="mb-2">
              <AcLink
                dynamicLinkParams={{
                  appMode: loginMode,
                  entityType: EntityType.CONTACT,
                  entityCode: contact.id,
                }}
              >
                {contact.name}
              </AcLink>
            </div>
            {renderCommunicationDetail(contact, isMobileView)}
          </GridItem>
        )
      })}
    </Grid>
  ) : null
}
