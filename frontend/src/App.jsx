import { useEffect, useState } from 'react'
import logo from './logo.svg'
import { SiteTable } from './components/organisms/SiteTable'
import './App.css'

function App() {
  const [sites, setSites] = useState([])

  const fetchSites = async() => {
    const endpoint = 'http://localhost:5000/api/v1/sites'
    const sites = await fetch(endpoint).then(res => res.json())
    setSites(sites)
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
        <SiteTable className="max-w-8xl mx-auto px-5 py-2 divide-y-2 rounded-md overflow-hidden bg-gray-700" sites={sites} />
      </main>
    </div>
  )
}

export default App
