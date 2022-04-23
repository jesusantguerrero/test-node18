import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { SiteItem } from './components/organisms/SiteItem'

function App() {
  const [sites, setSites] = useState([])

  const fetchSites = async() => {
    const endpoint = 'http://localhost:5000/api/v1/sites'
    const sites = await fetch(endpoint).then(res => res.json())
    console.log(sites)
    setSites(sites)
  }

  useEffect(() => {
    fetchSites()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <div>
          { sites.map(site => <SiteItem site={site} />)}
        </div>
      </header>
    </div>
  )
}

export default App
