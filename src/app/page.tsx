import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { AuthButtonServer } from './components/auth-button-server'
import { redirect } from 'next/navigation'
import { PostsLists } from './components/posts-list'
import { type Posts } from './components/posts-list'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (session === null) {
    redirect('/login')
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('*, user:users(*)')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section className="max-w-[800px] mx-auto border-l border-r border-white/20 min-h-screen">
        <AuthButtonServer />
        <PostsLists posts={posts as Posts} />
      </section>
    </main>
  )
}
