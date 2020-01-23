import { ExtendedAppointmentModel } from '@/types/core'

export const appoinmentsStub: ExtendedAppointmentModel[] = [
  {
    id: '2019-05-09T09:18:06',
    created: '2019-05-08T17:07:39',
    modified: '2019-05-09T09:18:06',
    start: '2019-05-11T17:30:00',
    end: '2019-05-11T18:00:00',
    typeId: 'VW',
    recurring: false,
    cancelled: true,
    property: {
      address: {}
    }
  },
  {
    id: '2019-05-09T09:17:06',
    created: '2019-05-08T17:07:39',
    modified: '2019-05-09T09:17:06',
    start: '2019-04-11T16:30:00',
    end: '2019-05-11T18:00:00',
    typeId: 'VW',
    recurring: false,
    cancelled: true,
    property: {
      address: {
        buildingName: '',
        buildingNumber: '56',
        line1: 'High Street',
        line2: 'The Stables',
        line3: 'Old Haversham',
        line4: 'Milton Keynes',
        postcode: 'MK19 7DZ',
        country: 'GB',
        geolocation: {
          latitude: 52.079532,
          longitude: -0.790871
        }
      }
    }
  },
  {
    id: '2019-05-09T09:17:06',
    created: '2019-05-08T17:07:39',
    modified: '2019-05-09T09:17:06',
    start: '2019-05-11T16:30:00',
    end: '2019-05-11T18:00:00',
    typeId: 'VW',
    recurring: false,
    cancelled: true,
    property: {
      address: {
        buildingName: '',
        buildingNumber: '56',
        line1: 'High Street',
        line2: 'The Stables',
        line3: 'Old Haversham',
        line4: 'Milton Keynes',
        postcode: 'MK19 7DZ',
        country: 'GB',
        geolocation: {
          latitude: 52.079532,
          longitude: -0.790871
        }
      }
    }
  }
]
