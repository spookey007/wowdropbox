import React from 'react'
import { Spinner } from '../Spinner/Spinner'

function LoaderCases() {
  return (
    <div className='loader-overlay'>
       <div className='loader-spinner'>
          <Spinner/>
       </div>
    </div>
  )
}

export default LoaderCases