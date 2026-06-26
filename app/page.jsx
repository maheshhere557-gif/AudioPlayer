"use client"
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { FastForwardIcon,Play,Pause, } from 'lucide-react'

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
    <div className='flex  mt-12'>
      <div className='ml-10 w-120 border rounded-xl h-130 flex flex-col p-5 bg-gray-500/10 ' >
        <h1 className='text-xl font-bold mb-6'>Playlist</h1>
        
         <ul>
        {songs.map((song) => (  
          <div className='bg-gray-500/50 h-13 rounded-xl p-2 mt-2   hover:bg-purple-500/50'>
          <li 
            key={song.id} 
            onClick={() => setCurrentSong(song)} 
          
          >
        <div>
            <h1 className='font-bold'>{song.title} </h1>
            <h1 className='text-xs font-bold opacity-70'>{song.artist} </h1>
          </div> 
         
          </li>
          </div>
        ))}
      </ul>
    
      </div>

      <div className='ml-10'>
      {currentSong && (
        <div>
          <h3 className='font-bold text-xl'>Now Playing:</h3>
          <div className='mt-8 w-100 justify-center flex flex-col items-center border'>
            <img className='w-50 ' src={currentSong.cover_url} alt="" />
            <audio controls src={currentSong.audio_url} className='hidden' autoPlay />
            <div className='flex mt-10 justify-between w-40'>
              <FastForwardIcon  className='h-10 -scale-x-100'/>
               
              <Play className='h-10'/>
              <FastForwardIcon  className='h-10'/>

            </div>

          </div>
          
        
          
        </div>
      )}
      </div>

      
     
    </div>
  )
}