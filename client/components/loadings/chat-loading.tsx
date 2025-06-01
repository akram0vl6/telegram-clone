import React from 'react'
import MessageLoading from './message-loading'

const ChatLoading = () => {
  return (
    <div>
      <MessageLoading isReciving={true} />
      <MessageLoading isReciving={true} />
      <MessageLoading isReciving={true} />
      <MessageLoading />
      <MessageLoading />
      <MessageLoading isReciving={true} />
      <MessageLoading />
      <MessageLoading />
    </div>
  )
}

export default ChatLoading