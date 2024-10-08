import React, { useState, useEffect } from 'react'

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const fontSize = Math.min(windowWidth * 0.5 / 8, 120) // Limit max font size to 120px

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center w-full px-4">
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-2">{formatDate(currentDateTime)}</p>
        <p 
          className="font-bold text-white font-mono tracking-wider"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: '1.2',
          }}
        >
          {formatTime(currentDateTime)}
        </p>
      </div>
    </div>
  )
}

export default App