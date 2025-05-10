"use client"

import React, { useEffect, useState } from 'react'

export default function FlagCounter() {
  const [loaded, setLoaded] = useState(false)
  
  useEffect(() => {
    setLoaded(true)
  }, [])
  
  if (!loaded) return null
  
  return (
    <div className="flex items-center justify-center mt-2">
      <a href="https://flagcounter.com/detail/KenWu" target="_blank" rel="noopener noreferrer">
        <img 
          src="https://s11.flagcounter.com/mini/KenWu/bg_FFFFFF/txt_000000/border_CCCCCC/flags_0/" 
          alt="Flag Counter" 
          className="h-5 opacity-70 hover:opacity-100 transition-opacity"
        />
      </a>
    </div>
  )
} 