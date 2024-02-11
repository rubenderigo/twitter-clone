'use client'

import { Avatar } from '@nextui-org/react'
import { ComposePostButton } from './compose-post-button'
import { addPost } from '../actions'
import { useRef } from 'react'

export function ComposePost({ userAvatarUrl }: { userAvatarUrl: string }) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addPost(formData)
        formRef.current?.reset()
      }}
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
        <ComposePostButton />
      </div>
    </form>
  )
}
