export const statusOptions = [
  {
    label: 'Not Requested',
    description: 'Payment has not yet been requested from customer',
    value: 'awaitingAuthorisation',
    intent: 'default',
  },
  {
    label: 'Awaiting Payment',
    description: 'Payment has been requested but not yet actioned by the customer',
    value: 'awaitingPosting',
    intent: 'pending',
  },
  {
    label: 'Paid',
    description: 'Customer has made the payment and the transaction was successful',
    value: 'posted',
    intent: 'success',
  },
  {
    label: 'Failed',
    description: 'Customer attepted to make the payment however, the transaction failed',
    value: 'rejected',
    intent: 'danger',
  },
]
