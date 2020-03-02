import {UpdateAppointmentArgs} from '../appointments'
export const updateAppointmentArgs:UpdateAppointmentArgs = {
  _eTag: "test",
  "start": "2018-08-14T12:30:02.0000000Z",
  "end": "2018-08-14T13:30:02.0000000Z",
  "followUpOn": "2018-10-05",
  "typeId": "VW",
  "description": "Meet landlord at the property to get the key.",
  "propertyId": "OXF190022",
  "organiserId": "JAS",
  "cancelled": false,
  "id": "test",
  "negotiatorIds": [
    "JAS"
  ],
  "officeIds": [
    "OXF",
    "SOL"
  ],
  "attendee": {
    "id": "OXF20001",
    "type": "applicant",
    "confirmed": false
  },
  "accompanied": true,
  "negotiatorConfirmed": true,
  "attendeeConfirmed": true,
  "propertyConfirmed": true,
  "followUp": {
    "responseId": "OXF190022",
    "notes": "Meet at the property."
  },
  "recurrence": {
    "type": "weekly",
    "interval": 2,
    "until": "2019-12-25T13:30:02.0000000Z"
  },
  "metadata": {
    "CustomField1": "CustomValue1",
    "CustomField2": true
  }
}

