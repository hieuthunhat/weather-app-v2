import './App.css'
import AppRoutes from './AppRoutes.jsx'
import {SettingProvider} from './contexts/SettingContext'
import AppLayout from './layouts/AppLayout'
import {Provider} from "react-redux";
import store from './store/store.js'

function App() {

    return (
        <Provider store={store}>
            <AppLayout>
                <AppRoutes/>
            </AppLayout>
        </Provider>

    )
}

export default App
