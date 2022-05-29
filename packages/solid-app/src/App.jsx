import logo from './logo.svg';
import styles from './App.module.css';
import SiteTable from './components/SiteTable';
import { createResource } from "solid-js"
import { fetchSites } from './features/sites';
function App() {
  const [sites] = createResource(fetchSites)

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <h1>Version Checker App</h1>
      </header>
      <SiteTable sites={sites} />
    </div>
  );
}

export default App;
