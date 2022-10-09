import { useEffect } from 'react'
import  Socket from "socket.io-client"
import config from '../config';


export function SocketListener() {

  const addListeners = () => {
    const socket = Socket(config.socketEndpoint);
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