import React from 'react'
import './Webcam.css'
import { useParams } from 'react-router-dom'

function Webcam(props) {
  const { mask = false } = props
  const { position = 'left' } = useParams()

  const frameWrapperClasses = ['webcam-frame-wrapper']

  switch (position) {
    case 'right': frameWrapperClasses.push('wf-right')
      break
    case 'left':
    default: frameWrapperClasses.push('wf-left')
  }

  const titleClasses = ['webcam-title-wrapper']
  const wrapperClasses = ['webcam-wrapper']
  const borderClasses = ['webcam-border']
  if (mask) {
    titleClasses.push('webcam-title-mask')
    wrapperClasses.push('webcam-wrapper-mask')
    borderClasses.push('webcam-border-mask')
  }

  return (
    <div className={frameWrapperClasses.join(' ')}>
      <div className={titleClasses.join(' ')}>
        <div className='webcam-title'>🍉 Zaytri-Cam 🍉</div>
      </div>
      <div className={wrapperClasses.join(' ')}>
        <div className={borderClasses.join(' ')}>
          <div className='webcam-content'>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Webcam)