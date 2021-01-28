import { BTTVEmotes } from './Cache'

const REGEX_BEFORE = '(?<=\\s|^)'
const REGEX_AFTER = '(?=\\s|$|[.,!])'

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const createRegex = strings => {
  const regexStrings = strings.sort().reverse().map(string => escapeRegExp(string))
  const regex = `${REGEX_BEFORE}(?:${regexStrings.join('|')})${REGEX_AFTER}`
  return new RegExp(regex, 'g')
}


const identifyBTTV = message => {
  const regex = createRegex(Object.keys(BTTVEmotes))
  let matches = {}
  let match
  while ((match = regex.exec(message)) !== null) {
    const [emote] = match
    const { index: start } = match
    const end = regex.lastIndex - 1
    const id = BTTVEmotes[emote]
    if (!matches[id]) matches[id] = []
    matches[id].push(`${start}-${end}`)
  }

  if (Object.keys(matches).length === 0) return null

  return matches
}


const Parse = {
  message: (message, { emotes: twitchEmotes }) => {
    const bttvEmotes = identifyBTTV(message)

    if (!twitchEmotes && !bttvEmotes) return [{ type: 'text', data: message }]

    const ids = {}
    const orders = []

    if (twitchEmotes) {
      for (const [id, [firstPosition, ...positions]] of Object.entries(twitchEmotes)) {
        const type = 'twitchEmote'
        const [start, end] = firstPosition.split('-').map(p => parseInt(p, 10))
        const emoteString = message.substring(start, end + 1)

        ids[emoteString] = id
        orders.push([start, type, emoteString])
        for (const position of positions) {
          const order = parseInt(position.split('-')[0])
          orders.push([order, type, emoteString])
        }
      }
    }

    if (bttvEmotes) {
      for (const [id, [firstPosition, ...positions]] of Object.entries(bttvEmotes)) {
        const type = 'bttvEmote'
        const [start, end] = firstPosition.split('-').map(p => parseInt(p, 10))
        const emoteString = message.substring(start, end + 1)

        ids[emoteString] = id
        orders.push([start, type, emoteString])
        for (const position of positions) {
          const order = parseInt(position.split('-')[0])
          orders.push([order, type, emoteString])
        }
      }
    }

    orders.sort((a, b) => a[0] - b[0])

    const regex = createRegex(Object.keys(ids))

    const strings = message.split(regex).map(data => ({ type: 'text', data }))
    const last = strings.pop()

    const parsed = strings.reduce((acc, string, index) => {
      const [, type, emoteString] = orders[index]
      return [...acc, string, { type, data: ids[emoteString] }]
    }, [])

    parsed.push(last)
    return parsed
  }
}

export default Parse