import React from 'react'
import './App.css'
import Messages from 'features/messages/Messages'
import Webcam from 'components/Webcam'
import {
  Route,
  Switch,
  Link,
  useLocation,
} from 'react-router-dom'

function App() {
  const { pathname } = useLocation()
  const home = pathname === '/'

  const mask = pathname.split('/').pop() === 'mask'
  const appClasses = ['app']
  if (mask) appClasses.push('app-mask')

  return (
      <div className={appClasses.join(' ')}>
        <Switch>
          <Route path='/cam/:position'>
            <Webcam mask={mask} />
          </Route>
          <Route path='/chat'>
            <Messages />
          </Route>
          <Route path='/'>
            <div className='links'>
              <Link className='link' to='/'>Home</Link>
              <Link className='link' to='/chat'>Chat</Link>
              <Link className='link' to='/cam/left'>Webcam Left</Link>
              <Link className='link' to='/cam/right'>Webcam Right</Link>
              <Link className='link' to='/cam/left/mask'>Webcam Left Mask</Link>
              <Link className='link' to='/cam/right/mask'>Webcam Right Mask</Link>
            </div>
          </Route>
        </Switch>
      </div>
  )
}

export default React.memo(App)