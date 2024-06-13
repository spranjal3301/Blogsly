import React from 'react'

function Container({children,className='',}) {
  return (
    <div className={`w-full max-w-7xl min-h-screen mx-auto px-4 flex justify-center items-center flex-wrap ${className}`}>
      {children}
    </div>
  )
}

export default Container