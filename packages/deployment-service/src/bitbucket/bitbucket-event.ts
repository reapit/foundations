export type BitBucketEvent = {
  event: string
  data: {
    push: {
      changes: {
        commits: {
          hash: string
          author: {
            user: {
              display_name: string
            }
          }
          message: string
        }[]
        new: {
          name: string //branch name
        }
      }[]
    }
    repository: {
      full_name: string
      is_private: boolean
    }
  }
}
