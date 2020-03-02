import {CreateAppointmentArgs} from '../appointments'

export const createAppointmentArgs:CreateAppointmentArgs =  {
  "start": "2018-08-14T12:30:02.0000000Z",
  "end": "2018-08-14T13:30:02.0000000Z",
  "followUpOn": "2018-10-05",
  "typeId": "VW",
  "description": "Meet landlord at the property to get the key.",
  "organiserId": "JAS",
  "negotiatorIds": [
    "JAS"
  ],
  "officeIds": [
    "OXF",
    "SOL"
  ],
  "attendee": {
    "id": "OXF20001",
    "type": "applicant"
  },
  "propertyId": "OXF190022",
  "accompanied": true,
  "negotiatorConfirmed": true,
  "attendeeConfirmed": true,
  "propertyConfirmed": true,
  "recurrence": {
    "interval": 2,
    "type": "weekly",
    "until": "2019-12-25T13:30:02.0000000Z"
  },
  "metadata": {
    "CustomField1": "CustomValue1",
    "CustomField2": true
  }
}
