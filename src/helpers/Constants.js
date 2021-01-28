export const Channel = { id: '85074694', name: 'Zaytri' }

export const Emote = {
  small: 1, medium: 2, large: 3,
  Twitch: {
    url: (id, size = 1) => `https://static-cdn.jtvnw.net/emoticons/v2/${id}/default/dark/${size}.0`
  },
  BTTV: {
    global: 'https://api.betterttv.net/3/cached/emotes/global',
    channel: `https://api.betterttv.net/3/cached/users/twitch/${Channel.id}`,
    url: (id, size = 1) => `https://cdn.betterttv.net/emote/${id}/${size}x`,
  }
}