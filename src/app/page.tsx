import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'
import { redirect } from 'next/navigation'
import { PostsLists } from './components/posts-list'
import { type Database, type Posts } from './types'
import { ComposePost } from './components/compose-post'

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(*)')
    .order('created_at', { ascending: false })

  return (
    <main className="flex min-h-screen justify-between">
      <section className="max-w-[600px] w-full mx-auto border-l border-r border-white/20 min-h-screen">
        <ComposePost userAvatarUrl={session.user?.user_metadata?.avatar_url} />
        <PostsLists posts={posts as Posts} />
      </section>
      <section className="mt-2">
        <AuthButtonServer />
      </section>
    </main>
  )
}
