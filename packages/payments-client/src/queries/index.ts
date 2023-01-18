// import { useMutation } from '@tanstack/react-query'

// export const usePaymentReceipt = () => {
//   const { mutateAsync } = useMutation([url], {
//     mutationFn: async (body: PaymentEmailReceipt, params: UpdateStatusParams) => {
//       const { paymentId } = params

//       const headers = await genPlatformHeaders()

//       const response = await fetcher({
//         api: window.reapit.config.paymentsApiUrl,
//         url: `${URLS.PAYMENT_RECEIPT}/${paymentId}`,
//         method: 'POST',
//         headers,
//         body,
//       })

//       return response
//     },
//   })
// }
