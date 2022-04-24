import { useEffect } from 'react'
import  Socket from "socket.io-client"
const ENDPOINT = 'http://localhost:5000/api/v1'


export function SocketListener() {

  const addListeners = () => {
    const socket = Socket('ws://localhost:5000');
    socket.on('check-completed', () => {
      console.log('completed')
      fetchSites()
    })
    socket.emit('connection', 'hello world' )

    return () => {
      socket.disconnect()
    }
  }

  
  useEffect(() => {
    return addListeners()
  }, [])
}