import { UpdateNegotiatorModel } from '@reapit/foundations-ts-definitions'

export type GetNegotiatorByIdArgs = {
  id: string
}

// export interface GetNegotiatorsArgs {
//   PageSize?: number
//   PageNumber?: number
//   SortBy?: string
//   Id?: string[]
//   OfficeId?: string[]
//   Name?: string
// }

// export interface CreateNegotiatorArgs {
//   /**
//    * The name of the negotiator
//    */
//   name?: string
//   /**
//    * The job title of the negotiator
//    */
//   jobTitle?: string
//   /**
//    * A flag determining whether or not the negotiator is active
//    */
//   active?: boolean
//   /**
//    * The unique identifier of the office that the negotiator is attached to
//    */
//   officeId?: string
//   /**
//    * The work phone number of the negotiator
//    */
//   workPhone?: string
//   /**
//    * The mobile phone number of the negotiator
//    */
//   mobilePhone?: string
//   /**
//    * The email address of the negotiator
//    */
//   email?: string
//   /**
//    * App specific metadata to set against the negotiator
//    */
//   metadata?: {
//     [name: string]: any
//   }
// }

export interface UpdateNegotiatorArgs {
  id: string
  model: UpdateNegotiatorModel
}
