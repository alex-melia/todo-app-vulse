export type Item = {
  id: string
  description: String
  isComplete: boolean
}

export type List = {
  id: string
  name: String
  items?: Item[]
  user_id?: string
}

export type User = {
  username: String
  password: String
}
