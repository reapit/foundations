import { AppointmentModel } from '@/types/platform'

export const appointmentDataStub: AppointmentModel = {
  id: 'BED1600597',
  description: 'hello world',

  created: '2019-05-12T17:58:40',
  modified: '2016-12-18T16:03:45',
  start: '2016-12-18T16:30:00',
  end: '2016-12-18T17:30:00',
  typeId: 'IA',
  recurring: false,
  cancelled: false,
  property: {
    arrangements: 'Switch lights on in living room',
    address: {
      buildingName: '',
      buildingNumber: '65',
      line1: 'Lindsey Close',
      line2: 'Great Denham',
      line3: 'Bedford',
      line4: 'Bedfordshire',
      postcode: 'MK40 4GT',
      country: '',
      geolocation: {
        latitude: 52.1284,
        longitude: -0.507145
      }
    }
  },
  attendees: [
    {
      id: 'JJS',
      type: 'negotiator',
      name: 'Chase MacLean',
      confirmed: true,
      communicationDetails: [
        {
          label: 'E-Mail',
          detail: 'chase.maclean@reapitestates.net'
        }
      ]
    },
    {
      id: 'cbryan@reapit.com',
      type: 'negotiator',
      name: 'nghia',
      confirmed: true,
      communicationDetails: [
        {
          label: 'E-Mail',
          detail: 'chase.maclean@reapitestates.net'
        }
      ]
    },
    {
      id: 'JJS',
      type: 'seller',
      name: 'Chase MacLean',
      confirmed: true,
      communicationDetails: [
        {
          label: 'E-Mail',
          detail: 'chase.maclean@reapitestates.net'
        }
      ]
    }
  ]
}
