import React, { useEffect } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import Player from '../components/Player'

function CoreLayout({ children, history }) {
  const check = function () {
    console.log('checking player')
  }
  useEffect(() => {
    const timer = setInterval(check, 1000)
    return function () {
      clearInterval(timer)
    }
  }, [])
  return (
    <div className="main">
      <SideBar />
      <div className="main__content">
        <Header history={history} />
        <div className="main__content__child">{children}</div>
      </div>
      <Player />
    </div>
  )
}

export default CoreLayout
