import React from 'react'
import '../styles/_discover-item.scss'

export default function DiscoverItem({ images, name, onClick }) {
  return (
    <div
      className="discover-item animate__animated animate__fadeIn"
      onClick={onClick}
    >
      <div
        className="discover-item__art"
        style={{ backgroundImage: `url(${images[0].url})` }}
      />
      <p className="discover-item__title">{name}</p>
    </div>
  )
}
