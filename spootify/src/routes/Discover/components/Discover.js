import React, { useState, useEffect, useReducer } from 'react'
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock'
import '../styles/_discover.scss'
import { api } from '../../../services'
import { reducer, initialState } from './reducer'

export default function Discover() {
  const [newReleases, setNewReleases] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [categories, setCategories] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    Promise.all([
      api.get('/browse/categories'),
      api.get('/browse/featured-playlists'),
      api.get('/browse/new-releases'),
    ]).then(([{ categories }, { playlists }, { albums }]) => {
      setCategories(categories.items)
      setPlaylists(playlists.items)
      setNewReleases(albums.items)
    })
  }, [])

  const handleClick = (origin, type, payload) => {
    dispatch({ type, payload })
    switch (origin) {
      case 'newReleases':
        setNewReleases(newReleases.filter((i) => i !== payload))
        break
      case 'playlists':
        setPlaylists(playlists.filter((i) => i !== payload))
        break
      default:
        console.log('it is ok to be here')
    }
  }

  return (
    <div className="discover">
      <DiscoverBlock
        text="TO LISTEN"
        id="tolisten"
        data={state.list}
        onClick={handleClick.bind(this, null, 'remove')}
      />
      <DiscoverBlock
        text="RELEASED THIS WEEK"
        id="released"
        data={newReleases}
        onClick={handleClick.bind(this, 'newReleases', 'add')}
      />
      <DiscoverBlock
        text="FEATURED PLAYLISTS"
        id="featured"
        data={playlists}
        onClick={handleClick.bind(this, 'playlists', 'add')}
      />
      <DiscoverBlock
        text="BROWSE"
        id="browse"
        data={categories}
        imagesKey="icons"
      />
    </div>
  )
}
