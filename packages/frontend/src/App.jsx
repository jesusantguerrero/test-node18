import logo from './logo.svg'
import { SiteTable } from './components/SiteTable'
import './App.css'
import { SocketListener } from './components/SocketListener'
import { useFetchSitesQuery, useUpdateSiteMutation, useDeleteSiteMutation, executeCheck } from './features/sites/sitesSlice'
import { useCallback } from 'react'
import { useDispatch  } from 'react-redux'

function App() {
  const dispatch = useDispatch();
  const { data = [], refetch } = useFetchSitesQuery();
  const [ updateSite, { isLoading: isUpdating } ] = useUpdateSiteMutation();
  // const [ runCheck, { isLoading: isChecking } ] = useRunCheckMutation();
  const [ deleteSite] = useDeleteSiteMutation();

  const handleSaved = async (data) => {
    await updateSite(data.id, data)
    refetch()
  }

  const handleRunCheck = useCallback(() => {
    dispatch(executeCheck())
  }, [dispatch])
  
  return (
    <div className="h-screen text-white bg-gray-800 App">
      <header className="mx-auto text-center">
        <img src={logo} className="mx-auto App-logo" alt="logo" />
        <h1 className='text-4xl font-bold text-white'> Version Checker App</h1>
      </header>
      <main className='max-w-6xl py-5 mx-auto'>
        <SiteTable 
          className="px-5 py-2 mx-auto overflow-hidden bg-gray-700 divide-y-2 rounded-md max-w-8xl" 
          sites={data} 
          onSaved={handleSaved} 
          onCheck={() => handleRunCheck()}
          onDeleteItem={deleteSite}
          isUpdating={isUpdating} 
        />
      </main>
      <SocketListener />
    </div>
  )
}

export default App
