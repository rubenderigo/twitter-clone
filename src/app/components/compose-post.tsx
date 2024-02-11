import { Avatar } from '@nextui-org/react'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export function ComposePost({ userAvatarUrl }: { userAvatarUrl: string }) {
  const addPost = async (formData: FormData) => {
    'use server'

    const content = formData.get('content')

    if (content === null) return

    const supabase = createServerActionClient({ cookies })
    const {
      data: { user }
    } = await supabase.auth.getUser()
    if (user === null) return

    await supabase.from('posts').insert({ content, user_id: user.id })
    revalidatePath('/')
  }

  return (
    <form
      action={addPost}
      className="flex flex-row p-3 border-b border-white/20 gap-2"
    >
      <Avatar radius="full" size="md" src={userAvatarUrl} />
      <div className="flex flex-1 flex-col gap-y-4">
        <textarea
          name="content"
          rows={4}
          className="w-full text-xl bg-black placeholder-gray-500 p-2"
          placeholder="¡¿Qué está pasando?!"
        />
        <button
          type="submit"
          className="bg-sky-500 text-sm font-bold rounded-full px-5 py-2 self-end"
        >
          Postear
        </button>
      </div>
    </form>
  )
}
