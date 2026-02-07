// import './App.css'
import Approutes from './Approutes'
import { SettingProvider } from './contexts/SettingContext'
import AppLayout from './layouts/AppLayout'

function App() {

  return (
    <SettingProvider>
      <Approutes />
    </SettingProvider>

  )
}

export default App
