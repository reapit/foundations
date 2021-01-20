import React, { useEffect, useState } from 'react'
import { Redirect, useParams, useLocation } from 'react-router'
import useSWR from 'swr'
import { Section, H3, Helper, Loader, H5, H6, Grid, GridItem } from '@reapit/elements'
import { PaymentModel } from '@reapit/foundations-ts-definitions'
import { URLS } from '../../constants/api'
import Routes from '../../constants/routes'
import { MerchantKey, opayoSessionMerchantKeyService } from '../../opayo-api/merchant-key'
import PaymentCustomerSection from '../ui/payments/payment-customer-section'
// import PropertySection from '../ui/payments/property-section'
import { localFetcher } from '../../utils/fetcher'
import PaymentForm from '../ui/payments/payment-form'

export interface PaymentSessionModel extends PaymentModel {
  clientCode: string
}

const PaymentSessionPage: React.FC = () => {
  const { paymentId } = useParams<{ paymentId: string }>()
  const location = useLocation()
  const { search } = location
  const queryParams = new URLSearchParams(search)
  const session = queryParams.get('session') || ''
  console.log(session)

  const { data: paymentData, error } = useSWR<{ payment: PaymentSessionModel }>(
    [`${URLS.PAYMENTS}/${paymentId}`, session],
    localFetcher,
  )
  const data = paymentData?.payment

  const [loading, setLoading] = useState(false)
  const [merchantKey, setMerchantKey] = useState<MerchantKey>()

  useEffect(() => {
    if (data) {
      const fetchmerchantKey = async () => {
        const fetchedKey = await opayoSessionMerchantKeyService(data.clientCode || 'SBOX')
        if (fetchedKey) {
          setMerchantKey(fetchedKey)
        }
        setLoading(false)
      }

      fetchmerchantKey()

      setLoading(true)
    }
  }, [setMerchantKey, data])

  if (error) return <Redirect to={Routes.LOGIN} />

  if (!data) return <Loader />
  const { customer, amount, description, externalReference } = data || {}
  return (
    <>
      <H3 isHeadingSection>Card Payment</H3>
      <H5 isHeadingSection>Payment For {paymentId}</H5>
      {!merchantKey && !loading && (
        <Helper variant="info">
          Welome to Reapit Payments portal. It seems you dont currently have an account registered with Opayo. Please
          talk to your administrator to set this up for you.
        </Helper>
      )}
      <Section>
        <Grid>
          <PaymentCustomerSection customer={customer} />
          {/* <PropertySection propertyId={propertyId} /> */}
          <GridItem>
            <H5>GBP: {amount}</H5>
            <H6>Payment description: {description}</H6>
            <H6>Payment ref: {externalReference}</H6>
          </GridItem>
        </Grid>
        <H6>Payment amount: {amount} GBP</H6>
      </Section>
      {merchantKey ? (
        <PaymentForm data={data} merchantKey={merchantKey} paymentId={paymentId} session={session} />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PaymentSessionPage
