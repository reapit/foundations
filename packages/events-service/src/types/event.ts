// TODO: replace with the actual event type which will hopefully be in
// the foundations ts library

export interface Event {
  isTestEvent?: boolean
  id: string
  published: string
  summary: string
  type: string
  actor: object
  object: {
    id?: string
    type?: string
    name?: string
    email?: string
    mobilePhone?: string
    address?: {
      buildingName?: string
      buildingNumber?: string
      line1?: string
      line2?: string
      line3?: string
      line4?: string
      postcode?: string
      countryId?: string
      geolocation?: {
        latitude?: number
        longitude?: number
      }
    }
  }
  customerId?: string
}
