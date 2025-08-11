import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-full  '>   
        
        <div className='animate-spin border-4 rounded w-[50px] h-[50px] scale-150 border-t-transparent rounded-full border-red-300 '></div>
      
    </div>
  )
}

export default Loading
