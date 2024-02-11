import { type Database } from './supabase'

type UserEntity = Database['public']['Tables']['users']['Row']

type PostEntity = Database['public']['Tables']['posts']['Row']

export type Post = PostEntity & {
  user: UserEntity
}

export type Posts = Post[]
