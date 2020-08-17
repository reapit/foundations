import { CreateWorksOrderArgs } from '../works-orders'

export const createWorksOrderArgs: CreateWorksOrderArgs = {
  companyId: 'OXF18000001',
  propertyId: 'OXF190001',
  tenancyId: 'OXF190022',
  negotiatorId: 'JAS',
  typeId: 'ES',
  status: 'complete',
  description: 'Light fitting in living room not working.',
  reporter: 'landlord',
  booked: '2019-05-10',
  required: '2019-08-12',
  completed: '2019-10-01',
  items: [
    {
      notes: 'Please book the electrical certificate for either Thursday or Friday.',
      chargeTo: 'landlord',
      estimate: 120,
      estimateType: 'written',
      netAmount: 100,
      vatAmount: 20,
    },
  ],
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
}
