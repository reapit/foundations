// TODO: replace with the actual event type which will hopefully be in
// the foundations ts library

export interface Event {
  id: string
  eventType: string
  createdAt: string
  clientCode: string
  contact: {
    telephoneNumber: string
  }
}
