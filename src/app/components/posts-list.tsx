import { type Posts } from '../types'
import PostCard from './post-card'

interface PostsListsProps {
  posts: Posts
}

export function PostsLists({ posts }: PostsListsProps) {
  return (
    <>
      {posts?.map((post) => {
        const { id, user, content } = post

        const {
          user_name: userName,
          name: userFullName,
          avatar_url: avatarUrl
        } = user

        return (
          <PostCard
            key={id}
            userFullName={userFullName}
            userName={userName}
            avatarUrl={avatarUrl}
            content={content}
          />
        )
      })}
    </>
  )
}
