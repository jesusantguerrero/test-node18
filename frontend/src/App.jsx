import { useEffect, useState } from 'react'
import logo from './logo.svg'
import { SiteTable } from './components/organisms/SiteTable'
import './App.css'
import { SocketListener } from './components/organisms/SocketListener'
import config from './config'
import { Counter } from './components/organisms/Counter'


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
    <div className="h-screen text-white bg-gray-800 App">
      <header className="mx-auto text-center">
        <img src={logo} className="mx-auto App-logo" alt="logo" />
        <h1 className='text-4xl font-bold text-white'> Version Checker App</h1>
      </header>
      <main className='max-w-6xl py-5 mx-auto'>
        <SiteTable className="px-5 py-2 mx-auto overflow-hidden bg-gray-700 divide-y-2 rounded-md max-w-8xl" sites={sites} onSaved={handleSaved} onCheck={onCheck} />
      </main>
      <SocketListener />
      <Counter />
    </div>
  )
}

export default App
