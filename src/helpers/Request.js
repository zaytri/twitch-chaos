import axios from 'axios'
import { Emote } from './Constants'

export const cacheEmotes = async () => {
  const globalEmotes = await axios.get(Emote.BTTV.global).then(res => res.data)
  const { channelEmotes, sharedEmotes } = await axios.get(Emote.BTTV.channel).then(
    ({ data: { channelEmotes, sharedEmotes } }) => ({ channelEmotes, sharedEmotes })
  )
  return [...globalEmotes, ...channelEmotes, ...sharedEmotes]
    .reduce((acc, { id, code }) => ({ [code]: id, ...acc }), {})
}