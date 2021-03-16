// TODO: replace with the actual event type which will hopefully be in
// the foundations ts library

export interface Event {
  isTestEvent?: boolean
  id: string
  type: string
  published: string
  customerId: string
  object: {
    mobilePhone: string
  }
}
