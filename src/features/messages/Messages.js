import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTemporaryMessage, selectMessages } from './messagesSlice'
import Message from 'components/Message'
import tmi from 'tmi.js'
import Parse from 'helpers/Parse'
import { Channel } from 'helpers/Constants'

const MESSAGE_EVENT = 'message'
const DEFAULT_COLORS = [
  '#ff4a80',
  '#ff7070',
  '#fa8e4b',
  '#fee440',
  '#5fff77',
  '#00f5d4',
  '#00bbf9',
  '#4371fb',
  '#9b5de5',
  '#f670dd'
]
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const generateColor = name => {
  const value = name ? name.split('').reduce((sum, letter) => sum + letter.charCodeAt(0), 0) : 0
  return DEFAULT_COLORS[value % DEFAULT_COLORS.length]
}

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: [Channel.name]
})
client.connect()

function Messages() {
  const messages = useSelector(selectMessages)
  const dispatch = useDispatch()
  const renderMessages = () => messages.map(message => (
    <Message
      key={message.id}
      name={message.name}
      message={message.message}
      badges={message.badges}
      color={message.color}
      type={message.type}
      position={message.position}
    />
  ))

  const onMessage = (channel, tags, message) => {
    const {
      id, emotes, badges, color,
      'display-name': name,
      'message-type': type,
      'msg-id': type2,
    } = tags

    if (type === 'whisper') return

    const parsed = Parse.message(message, { emotes })
    // view max - message max - message drop shadows - padding
    const left = random(20, 1280 - 300 - 30 - 20)
    const top = random(20, 720 - 300 - 30 - 20)

    dispatch(addTemporaryMessage({
      id, name, badges,
      type: (type2 === 'highlighted-message') ? 'highlight' : type,
      message: parsed,
      position: [left, top],
      color: color || generateColor(name)
    }))
  }

  useEffect(() => {
    client.addListener(MESSAGE_EVENT, onMessage)

    return () => client.removeListener(MESSAGE_EVENT, onMessage)
  })

  return <div>{renderMessages()}</div>
}

export default React.memo(Messages)