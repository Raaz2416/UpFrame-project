import { useState } from 'react'
import Home from './components/Home'

import './App.css'

function App() {
  
  

  return (
    <div className='flex flex-col items-center justify-center w-full h-full min-h-screen bg-gray-100 py-8 px-4'>

      <div className='text-center mb-8 align-center'>
        <div className='18vh'>
        <h1 className='text-5xl font-bold text-gray-800 mb-2 h-{5vh}'> UpFrame - AI Image Enhancer</h1>
       </div>
        <p className='text-lg text-gray-500'> Upload your Image and see the magic of AI</p>
      </div>

      <Home/>

      <div className='text-lg text-gray-500 mt-5'>
        Your own AI Image Enhancer
      </div>

    </div>
  )
}

export default App
