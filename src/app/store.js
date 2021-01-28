import { configureStore } from '@reduxjs/toolkit'
import messagesReducer from 'features/messages/messagesSlice'

export default configureStore({
  reducer: {
    messages: messagesReducer
  }
})