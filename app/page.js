'use client'
import Image from "next/image"
import image1 from "../public/coverexample.webp"
import {Play,Pause,Rewind,FastForward} from "lucide-react"
import { useRef, useState } from "react";
export default function Home() {
 const playlist=[{src:"/audio1.mp3"},
  {src:"/audio2.mp3"},
 ]
  const [playing,setIsplaying]=useState(false)
  const audioref=useRef(null)
  const[currentIndex,setCurrentIndex]=useState(0)
  const currentsong=playlist[currentIndex]
  const togglePLay=()=>{
    if(!playing){
      audioref.current.play()
    }else
      {
      audioref.current.pause()
    }
    setIsplaying(!playing)
  }

  const ToggleNext=()=>{
    setCurrentIndex((next)=>(next+1)%playlist.length)
    setIsplaying(true)
    setTimeout(()=>{
      if(audioref.current)audioref.current.play();
    },10)
  }
  const Toggleprev=()=>{
    setCurrentIndex((next)=>(next-1)%playlist.length)
    setIsplaying(true)
    setTimeout(()=>{
      if(audioref.current)audioref.current.play();
    },10)
  }
 
  return (
    <div className="lg:h-screen w-screen flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="" >
       <audio ref={audioref} key={currentsong.src} src={currentsong.src}/>
        <div className="w-50 flex flex-col items-center justify-center h-70 bg-white rounded">
          <div className="p-2 mb-5">
            <Image className="rounded" src={image1} alt="pic" placeholder="blur"></Image>
          </div>
          <div className="flex w-40 justify-between text-black">
            <button onClick={Toggleprev}><Rewind className="scale-120"/></button>
            <button onClick={togglePLay} >
              {playing ?(<Pause className="scale-120"/>):
           (<Play className="scale-120"/>)}
            
          
          </button>
        
           <button onClick={ToggleNext}><FastForward className="scale-120"/></button>
          </div>
        </div>
        
      </main>
    </div>
  );
}
