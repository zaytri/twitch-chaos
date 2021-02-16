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

  const mask = pathname.split('/').pop() === 'mask'
  const appClasses = ['app']
  if (mask) appClasses.push('app-mask')

  return (
      <div className={appClasses.join(' ')}>
        <Switch>
          <Route path={['/cam/:position', '/cam']}>
            <Webcam mask={mask} />
          </Route>
          <Route path='/chat'>
            <Messages />
          </Route>
          <Route path='/'>
            <div className='home'>
              <div className='links'>
                <Link className='link' to='/'>Home</Link>
              </div>
              <div className='links'>
                <Link className='link' to='/chat'>Chat</Link>
              </div>
              <p className='category'>Webcam</p>
              <div className='links'>
                <Link className='link' to='/cam/topleft'>🡬</Link>
                <Link className='link' to='/cam/top'>🡩</Link>
                <Link className='link' to='/cam/topright'>🡭</Link>
              </div>
              <div className='links'>
                <Link className='link' to='/cam/left'>🡨</Link>
                <Link className='link' to='/cam'>⭘</Link>
                <Link className='link' to='/cam/right'>🡪</Link>
              </div>
              <div className='links'>
                <Link className='link' to='/cam/bottomleft'>🡯</Link>
                <Link className='link' to='/cam/bottom'>🡫</Link>
                <Link className='link' to='/cam/bottomright'>🡮</Link>
              </div>
              <p className='category'>Webcam Mask</p>
              <div className='links'>
                <Link className='link' to='/cam/topleft/mask'>🡬</Link>
                <Link className='link' to='/cam/top/mask'>🡩</Link>
                <Link className='link' to='/cam/topright/mask'>🡭</Link>
              </div>
              <div className='links'>
                <Link className='link' to='/cam/left/mask'>🡨</Link>
                <Link className='link' to='/cam/mask'>⭘</Link>
                <Link className='link' to='/cam/right/mask'>🡪</Link>
              </div>
              <div className='links'>
                <Link className='link' to='/cam/bottomleft/mask'>🡯</Link>
                <Link className='link' to='/cam/bottom/mask'>🡫</Link>
                <Link className='link' to='/cam/bottomright/mask'>🡮</Link>
              </div>
            </div>
          </Route>
        </Switch>
      </div>
  )
}

export default React.memo(App)