export const statusOptions = [
  {
    label: 'Not Requested',
    description: 'Payment has not yet been requested from customer',
    value: 'awaitingAuthorisation',
  },
  {
    label: 'Awaiting Payment',
    description: 'Payment has been requested but not yet actioned by the customer',
    value: 'awaitingPosting',
  },
  {
    label: 'Paid',
    description: 'Customer has made the payment and the transaction was successful',
    value: 'posted',
  },
  {
    label: 'Failed',
    description: 'Customer attepted to make the payment however, the transaction failed',
    value: 'rejected',
  },
]

export const typeOptions = [
  {
    label: 'Payment Request',
    description: 'Request for a customer to make a payment',
    value: 'paymentRequest',
  },
]
