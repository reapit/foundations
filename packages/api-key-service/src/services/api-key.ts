import { ApiKeyModel } from "@/models";
import { db } from '@/core'

export const createApiKey = (apiKey: Partial<ApiKeyModel>): Promise<ApiKeyModel> => {
  return db.put(Object.assign(new ApiKeyModel(), { apiKey }))
}

export const updateApiKey = (apiKey: ApiKeyModel, dto: Partial<ApiKeyModel>): Promise<ApiKeyModel> => {
  return db.put(Object.assign(new ApiKeyModel(), {
    ...apiKey,
    ...dto,
  }))
}

export const getApiKey = (apiKey: string): Promise<ApiKeyModel | undefined> => {
  return db.get(Object.assign(new ApiKeyModel(), { apiKey }))
}
