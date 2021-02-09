export interface CreateRequestModel {
  organisationId: string
  developerId?: string
  requesterEmail: string
  requesterName: string
  requestMessage: string
  datasetId: string
  customerId: string
  devMode: boolean
}
