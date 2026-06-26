"use client"
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

export default function MusicPlayer() {
  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null)

  useEffect(() => {
    async function getSongs() {
      const { data } = await supabase.from("songs").select("*")
      setSongs(data || [])
    }
    getSongs()
  }, [])

  return (
    <div>
      
      {currentSong && (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
          <h3>Now Playing: {currentSong.title}</h3>
          <audio controls src={currentSong.audio_url} />
        </div>
      )}

     
      <ul>
        {songs.map((song) => (
          <li 
            key={song.id} 
            onClick={() => setCurrentSong(song)} 
            style={{ cursor: 'pointer', margin: '10px 0' }}
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
    </div>
  )
}