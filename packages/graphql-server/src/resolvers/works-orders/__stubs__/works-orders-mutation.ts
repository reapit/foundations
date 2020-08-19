import { CreateWorksOrderArgs, UpdateWorksOrderArgs, CreateWorksOrderItemArgs } from '../works-orders'

export const createWorksOrderItemArgsStub: CreateWorksOrderItemArgs = {
  id: 'RPT20000022',
  notes: 'Please book the electrical certificate for either Thursday or Friday.',
  chargeTo: 'landlord',
  estimate: 120,
  estimateType: 'written',
  netAmount: 100,
  vatAmount: 20,
}

export const updateWorkOrderArgsStub: UpdateWorksOrderArgs = {
  _eTag: '"B219B9AD4E8EE3088561590FA3A6898E"',
  id: 'RPT20000022',
  companyId: 'OXF18000001',
  propertyId: 'OXF190001',
  tenancyId: 'OXF190022',
  negotiatorId: 'JAS',
  typeId: 'ES',
  status: 'complete',
  description: 'Demo.2',
  reporter: 'landlord',
  booked: '2019-05-10',
  required: '2019-08-12',
  completed: '2019-10-01',
  metadata: {
    CustomField1: 'CustomVa2lue1',
    CustomField2: true,
  },
}

export const createWorksOrderArgsStub: CreateWorksOrderArgs = {
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
