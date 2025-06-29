"use client"

import React, { useEffect, useState } from 'react'
import Avatar from './Avatar'
import { handleSubmit } from '@/lib/fetchers'
import { useRouter } from 'next/navigation'
import { io } from "socket.io-client"
import { useCookies } from 'react-cookie'

function Form() {
  const [avatarId, setAvatarId] = useState((Math.random() * 20).toFixed())
  const router = useRouter()
  const socket = io("http://localhost:4000")
  const [cookie] = useCookies(["user"])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (cookie.user) {
      router.push("/verify")
    }
  }, [cookie.user])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Сохраняем в localStorage
    localStorage.setItem("name", name)
    localStorage.setItem("email", email)
    localStorage.setItem("avatarId", avatarId)

    // Передаём данные дальше
    handleSubmit(e, router, avatarId, socket)
  }

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
      <Avatar avatarId={avatarId} setAvatarId={setAvatarId}/>
      <div className='flex flex-col xl:flex-row gap-5'>
        <div className='form-control w-full'>
          <label className='label'><span className='label-text text-lg'>What is your name?</span></label>
          <input
            type="text"
            placeholder='Username'
            className='input input-bordered w-full'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-control w-full'>
          <label className='label'><span className='label-text text-lg'>Put your email.</span></label>
          <input
            type="email"
            placeholder='Email'
            className='input input-bordered w-full'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <button className='btn'>Login</button>
    </form>
  )
}

export default Form
