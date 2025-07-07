export type Installation = {
  id: number
  account: {
    id: number
    login: string
    avatar_url: string
    html_url: string
  }
  app_id: number
  access_tokens_url: string
}

export type Repository = {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  visibility: string
}
