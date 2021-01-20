import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useSWR from 'swr'
import { Section, H3, Helper, Loader, H5, H6, Grid, GridItem } from '@reapit/elements'
import { PaymentSessionModel } from './payment-session'
import { URLS } from '../../constants/api'
import { MerchantKey, opayoMerchantKeyService } from '../../opayo-api/merchant-key'
import PaymentCustomerSection from '../ui/payments/payment-customer-section'
import PropertySection from '../ui/payments/property-section'
import PaymentForm from '../ui/payments/payment-form'

const PaymentPage: React.FC = () => {
  const { paymentId } = useParams<{ paymentId: string }>()

  const { data } = useSWR<PaymentSessionModel>(`${URLS.PAYMENTS}/${paymentId}`)

  const [loading, setLoading] = useState(false)
  const [merchantKey, setMerchantKey] = useState<MerchantKey>()

  useEffect(() => {
    const fetchmerchantKey = async () => {
      const fetchedKey = await opayoMerchantKeyService()
      if (fetchedKey) {
        setMerchantKey(fetchedKey)
      }
      setLoading(false)
    }

    fetchmerchantKey()

    setLoading(true)
  }, [setMerchantKey])

  if (loading) {
    return <Loader />
  }

  const { customer, amount, description, externalReference, propertyId } = data || {}
  return (
    <>
      <H3 isHeadingSection>Card Payment</H3>
      <H5 isHeadingSection>Payment For {paymentId}</H5>
      {!merchantKey && (
        <Helper variant="info">
          Welome to Reapit Payments portal. It seems you dont currently have an account registered with Opayo. Please
          talk to your administrator to set this up for you.
        </Helper>
      )}
      <Section>
        <Grid>
          <PaymentCustomerSection customer={customer} />
          <PropertySection propertyId={propertyId} />
          <GridItem>
            <H5>GBP: {amount}</H5>
            <H6>Payment description: {description}</H6>
            <H6>Payment ref: {externalReference}</H6>
          </GridItem>
        </Grid>
        <H6>Payment amount: {amount} GBP</H6>
      </Section>
      {merchantKey && data ? <PaymentForm data={data} merchantKey={merchantKey} /> : <Loader />}
    </>
  )
}

export default PaymentPage
