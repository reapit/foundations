import { AuthenticationError, UserInputError } from 'apollo-server-lambda'
import {
  ApplicantContactRelationshipModel,
  ApplicantModel,
  CreateApplicantModel,
  ApplicantContactRelationshipModelPagedResult,
  ApplicantModelPagedResult,
  UpdateApplicantModel,
} from '@reapit/foundations-ts-definitions'

export type GetApplicantByIdArgs = {
  id: string
  embed?: (
    | 'appointments'
    | 'areas'
    | 'department'
    | 'documents'
    | 'negotiators'
    | 'offers'
    | 'offices'
    | 'solicitor'
    | 'source'
  )[]
}

export type GetApplicantsArgs = {
  pageSize?: number
  pageNumber?: number
  sortBy?: string
  embed?: (
    | 'appointments'
    | 'areas'
    | 'department'
    | 'documents'
    | 'negotiators'
    | 'offers'
    | 'offices'
    | 'solicitor'
    | 'source'
  )[]
  id?: string[]
  age?: ('period' | 'new' | 'modern')[]
  furnishing?: ('furnished' | 'unfurnished' | 'partFurnished')[]
  locality?: ('rural' | 'village' | 'townCity')[]
  negotiatorId?: string[]
  officeId?: string[]
  parking?: ('offStreet' | 'secure' | 'underground' | 'garage' | 'doubleGarage' | 'tripleGarage')[]
  situation?: ('garden' | 'land' | 'patio' | 'roofTerrace' | 'conservatory' | 'balcony' | 'communalGardens')[]
  style?: (
    | 'terraced'
    | 'endTerrace'
    | 'detached'
    | 'semiDetached'
    | 'linkDetached'
    | 'mews'
    | 'basement'
    | 'lowerGroundFloor'
    | 'groundFloor'
    | 'firstFloor'
    | 'upperFloor'
    | 'upperFloorWithLift'
    | 'penthouse'
  )[]
  type?: (
    | 'house'
    | 'bungalow'
    | 'flatApartment'
    | 'maisonette'
    | 'land'
    | 'farm'
    | 'cottage'
    | 'studio'
    | 'townhouse'
    | 'developmentPlot'
  )[]
  address?: string
  departmentId?: string
  marketingMode?: ('selling' | 'letting' | 'sellingAndLetting')[]
  name?: string
  priceFrom?: string
  priceTo?: string
  rentFrom?: string
  rentTo?: string
  rentFrequency?: ('weekly' | 'monthly' | 'annually')[]
  bedroomsFrom?: number
  bedroomsTo?: number
  createdFrom?: string
  createdTo?: string
  lastCallFrom?: string
  lastCallTo?: string
  nextCallFrom?: string
  nextCallTo?: string
  metadata?: string[]
}

export type CreateApplicantArgs = CreateApplicantModel
export type UpdateApplicantArgs = { id: string; _eTag: string } & UpdateApplicantModel

// api type
export type GetApplicantByIdReturn = Promise<ApplicantModel | UserInputError>
export type GetApplicantsReturn = Promise<ApplicantModelPagedResult | UserInputError>
export type CreateApplicantReturn = Promise<ApplicantModel | UserInputError>
export type UpdateApplicantReturn = Promise<ApplicantModel | UserInputError>

// resolver type
export type QueryGetApplicantByIdReturn = AuthenticationError | GetApplicantByIdReturn
export type QueryGetApplicantsReturn = AuthenticationError | GetApplicantsReturn
export type MutationCreateApplicantReturn = AuthenticationError | CreateApplicantReturn
export type MutationUpdateApplicantReturn = AuthenticationError | UpdateApplicantReturn

export type GetApplicantRelationshipsByIdArgs = {
  id: string
  relationshipId: string
}

export type GetApplicantRelationshipsArgs = {
  id: string
  pageSize?: number
  pageNumber?: number
}

export type CreateApplicantRelationshipArgs = {
  id: string
  associatedId: string
  associatedType: string
  isMain: boolean
}

export type DeleteApplicantRelationshipArgs = {
  id: string
  relationshipId: string
}

export type GetApplicantRelationshipsByIdReturn = Promise<ApplicantContactRelationshipModel | UserInputError>
export type GetApplicantRelationshipsReturn = Promise<ApplicantContactRelationshipModelPagedResult | UserInputError>
export type CreateApplicantRelationshipReturn = Promise<ApplicantModel | UserInputError>
export type DeleteApplicantRelationshipReturn = Promise<string | UserInputError>

// resolver type
export type QueryGetApplicantRelationshipsByIdReturn = AuthenticationError | GetApplicantRelationshipsByIdReturn
export type QueryGetApplicantRelationshipsReturn = AuthenticationError | GetApplicantRelationshipsReturn
export type MutationCreateApplicantRelationshipsReturn = AuthenticationError | CreateApplicantRelationshipReturn
export type MutationDeleteApplicantRelationshipReturn = AuthenticationError | DeleteApplicantRelationshipReturn
