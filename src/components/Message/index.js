import React from 'react'
import './Message.css'
import { Emote } from 'helpers/Constants'
import tinycolor from 'tinycolor2'

const MAX_EMOTE_SIZE = 112 * 2 / 3

const renderText = (text, key) => <span key={key}>{text}</span>
const renderEmote = (id, generateUrl, emoteLevel, key) => (
  <img
    key={key}
    className={`emote emote${emoteLevel}`}
    src={generateUrl(id, Emote.large)}
    alt='emote'
    />
)

const renderMessageText = (message, emoteLevel) => message.map(({ type, data }, index) => {
  switch(type) {
    case 'text': return emoteLevel > 1 ? null : renderText(data, index)
    case 'bttvEmote': return renderEmote(data, Emote.BTTV.url, emoteLevel, index)
    case 'twitchEmote': return renderEmote(data, Emote.Twitch.url, emoteLevel, index)
    default: return null
  }
})

const emoteWidth = emoteLevel => {
  switch(emoteLevel) {
    case 2: return 56 + 4
    case 3: return MAX_EMOTE_SIZE
    default: return 28
  }
}

const calcWidth = (message, emoteLevel = 1) => {
  const estimate = message.reduce((acc, { type, data }, index) => {
    switch(type) {
      case 'text': return emoteLevel > 1 ? acc : acc + (data.length * 7)
      case 'bttvEmote':
      case 'twitchEmote': return acc + emoteWidth(emoteLevel)
      default: return acc
    }
  }, 0)
  if (estimate < MAX_EMOTE_SIZE) return MAX_EMOTE_SIZE
  return Math.min(estimate, 300)
}

const calcEmoteLevel = message => {
  let emotesFound = 0
  for (const { type, data } of message) {
    switch(type) {
      case 'text': if (data.trim() !== '') return 1
        break
      case 'bttvEmote':
      case 'twitchEmote': emotesFound++
        break
      default: return 1
    }
  }
  if (emotesFound > 1) return 2
  else return 3
}

const lightenEnough = tinycolorObj => {
  const brightness = (tinycolorObj.getBrightness() / 255) * 100
  return tinycolorObj.brighten(50 - brightness + 15)
}

function Message(props) {
  const {
    name,
    // badges,
    type,
    message,
    position,
    color,
  } = props
  const [left, top] = position

  const colorObj = tinycolor(color)
  const isDarkColor = colorObj.isDark()

  const messageTextStyles = ['message-text']
  const emoteLevel = calcEmoteLevel(message)
  const minWidth = calcWidth(message, emoteLevel)

  const messageTitleStyles = ['message-title']
  if (isDarkColor) messageTitleStyles.push('message-title-dark')

  let actionStyle = null
  switch(type) {
    case 'highlight': messageTextStyles.push('gradient')
      break
    case 'action': messageTextStyles.push('action-message')
      actionStyle = {
        color: isDarkColor ? lightenEnough(colorObj).toString() : color
      }
      break
    default: // nothing
  }


  return(
    <div className='message-wrapper' style={{
      left, top, '--messageColor': color, '--messageMinWidth': `${minWidth}px`
      }}>
      <div className='message-title-wrapper'>
        <div className={messageTitleStyles.join(' ')}>{name}</div>
      </div>
      <div className='message-text-wrapper'>
        <div className={messageTextStyles.join(' ')} style={actionStyle}>
          {renderMessageText(message, emoteLevel)}
          <div className='message-footer' />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Message)