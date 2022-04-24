import { useEffect, useState } from 'react'
import logo from './logo.svg'
import { SiteTable } from './components/organisms/SiteTable'
import './App.css'
import { SocketListener } from './components/organisms/SocketListener'
import config from './config'


function App() {
  const [sites, setSites] = useState([])

  const fetchSites = async() => {
    const sites = await fetch(`${config.apiV1}/sites`).then(res => res.json())
    setSites(sites)
  }

  const onCheck = async() => {
    const sites = await fetch(`${ENDPOINT}/sites/check`, {
      method: 'POST'
    }).then(res => res.json())
    setSites(sites)
  }

  const handleSaved = (data) => {
    setSites([...sites, data])
  }

  useEffect(() => {
    fetchSites()
  }, [])
  

  return (
    <div className="App bg-gray-800 h-screen text-white">
      <header className="mx-auto text-center">
        <img src={logo} className="App-logo mx-auto" alt="logo" />
        <h1 className='text-4xl text-white font-bold'> Version Checker App</h1>
      </header>
      <main className='mx-auto max-w-6xl py-5'>
        <SiteTable className="max-w-8xl mx-auto px-5 py-2 divide-y-2 rounded-md overflow-hidden bg-gray-700" sites={sites} onSaved={handleSaved} onCheck={onCheck} />
      </main>
      <SocketListener />
    </div>
  )
}

export default App
