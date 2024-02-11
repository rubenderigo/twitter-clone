import PostCard from './post-card'

interface User {
  user_name: string
  name: string
  avatar_url: string
}

interface Post {
  id: string
  user: User
  content: string
}

export type Posts = Post[]

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
