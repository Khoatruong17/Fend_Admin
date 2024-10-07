import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';


function App() {
  useEffect(()=>{
    const fetchHelloWorld = async ()=>{
      const res = await axios.get("localhost:8080/v1/api/")
      console.log(">>>Check res: ",res)
    }
    fetchHelloWorld()
  },[]);
  return (
    <>
      Hello World
    </>
  )
}

export default App
