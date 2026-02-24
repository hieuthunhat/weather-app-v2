import './App.css'
import AppRoutes from './AppRoutes.jsx'
import AppLayout from './layouts/AppLayout'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from './store/store.js'
import {SettingProvider} from "./contexts/SettingContext.jsx";
import Header from "./components/Header/Header.jsx";

function App() {

    return (
        <Provider store={store}>
            <SettingProvider>
                <BrowserRouter>
                    <AppLayout>
                        <Header />
                        <AppRoutes/>
                    </AppLayout>
                </BrowserRouter>
            </SettingProvider>
        </Provider>

    )
}

export default App
