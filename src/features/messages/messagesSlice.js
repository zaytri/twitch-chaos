import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage(state, action) {
      const { id, name, message, badges, color, type, position } = action.payload
      state.push({ id, name, message, badges, color, type, position })
    },
    removeMessage(state) {
      state.shift()
    }
  }
})

export const { addMessage, removeMessage } = messagesSlice.actions

export const addTemporaryMessage = payload => dispatch => {
  dispatch(addMessage(payload))
  setTimeout(() => {
    dispatch(removeMessage())
  }, 15*1000)
}

export const selectMessages = state => state.messages

export default messagesSlice.reducer