import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_VENDOR_BY_ID } from '../../../graphql/queries/get-vendor-by-id.graphql'
import { FaMale } from 'react-icons/fa'
import { Grid, GridItem, H6, AcLink, EntityType } from '@reapit/elements'
import { renderCommunicationDetail, LoginMode } from './appointment-detail-modal'
import { Loader } from '@reapit/elements/v3'

export type VendorRelateModel = {
  id: string
  name: string
  type: string
  homePhone: string
  workPhone: string
  mobilePhone: string
  email: string
}

export type VendorQueryData = {
  GetVendorById: {
    id: string
    related: VendorRelateModel[]
  }
}

export type VendorQueryVariables = {
  id: string
}

export const AppointmentDetailVendor: React.FC<{
  vendorId: string
  loginMode: LoginMode
  isMobileView: boolean
}> = ({ vendorId, loginMode, isMobileView }) => {
  if (!vendorId) {
    return null
  }

  const { data, loading } = useQuery<VendorQueryData, VendorQueryVariables>(GET_VENDOR_BY_ID, {
    variables: {
      id: vendorId,
    },
  })

  const listRelated = data?.GetVendorById?.related || []

  if (loading) return <Loader label="Loading" />
  return listRelated.length > 0 ? (
    <Grid className="is-mobile">
      <GridItem className="is-one-third-desktop is-5-mobile horizontal">
        <Grid className="is-mobile">
          <GridItem className="is-narrow px-0">
            <FaMale />
          </GridItem>
          <GridItem>
            <H6>Vendors:</H6>
          </GridItem>
        </Grid>
      </GridItem>
      {listRelated.map((vendorRelate: VendorRelateModel) => {
        return (
          <GridItem className="text-ellipsis" key={vendorRelate.id}>
            <div className="mb-2">
              <AcLink
                dynamicLinkParams={{
                  appMode: loginMode,
                  entityType: EntityType.CONTACT,
                  entityCode: vendorRelate.id,
                }}
              >
                {vendorRelate.name}
              </AcLink>
            </div>
            {renderCommunicationDetail(vendorRelate, isMobileView)}
          </GridItem>
        )
      })}
    </Grid>
  ) : null
}

export default AppointmentDetailVendor
