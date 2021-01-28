import { cacheEmotes } from './Request'

cacheEmotes().then(emotes => localStorage.setItem('BTTVEmotes', JSON.stringify(emotes)))

export const BTTVEmotes = JSON.parse(localStorage.getItem('BTTVEmotes'))